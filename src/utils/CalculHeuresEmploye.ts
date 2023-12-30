import { IHeuresEmploye } from '@src/interfaces/interfaceHeuresEmploye'
import { format, isMonday, isSaturday, isSunday, parse } from 'date-fns'
import { fr } from 'date-fns/locale'

class CalculHeuresEmploye {
  private heuresMonsuelEmploye: IHeuresEmploye[]
  private totalHnormale: number
  private totalHtravailEffectif: number
  private tableauTotalHsParSemaine: { jour: string; semaine: string; totalHsParSemaine: number }[]
  private tableauHs130ParSemaine: { jour: string; semaine: string; totalHs130ParSemaine: number }[]
  private tableauHs150ParSemaine: { jour: string; semaine: string; totalHs150ParSemaine: number }[]
  private est_cadre: boolean
  private travail_de_nuit: boolean
  private totalTravailleDeNuit30: number
  private totalTravailDeNuit50: number
  private totalHsDuMois: number
  private totalHdim: number
  private totalHs130: number
  private totalHs150: number
  private totalHFerie: number
  constructor() {
    this.heuresMonsuelEmploye = []
    this.totalHnormale = 0
    this.totalHtravailEffectif = 0
    this.tableauTotalHsParSemaine = []
    this.tableauHs130ParSemaine = []
    this.tableauHs150ParSemaine = []
    this.est_cadre = false
    this.travail_de_nuit = false
    this.totalTravailleDeNuit30 = 0
    this.totalTravailDeNuit50 = 0
    this.totalHdim = 0
    this.totalHsDuMois = 0
    this.totalHFerie = 0
    this.totalHs130 = 0
    this.totalHs150 = 0
  }

  setEstCadre(est_cadre: boolean): void {
    this.est_cadre = est_cadre
  }
  getEstCadre(): boolean {
    return this.est_cadre
  }

  setHeuresMonsuelEmploye(heuresMonsuelEmploye: IHeuresEmploye[]): void {
    this.heuresMonsuelEmploye = heuresMonsuelEmploye
  }

  getHeuresMonsuelEmploye(): IHeuresEmploye[] {
    return this.heuresMonsuelEmploye
  }

  private calculateTotalHnormale(): void {
    this.totalHnormale = 0
    if (this.heuresMonsuelEmploye && this.heuresMonsuelEmploye.length > 0) {
      for (const item of this.heuresMonsuelEmploye) {
        if (item.hs_jours_feries === 0) {
          this.totalHnormale += item.heure_normale
        }
      }
    }
  }
  getTotalHnormale(): number {
    this.calculateTotalHnormale()
    return this.totalHnormale
  }

  private calculateTotalHtravailEffectif(): void {
    this.totalHtravailEffectif = 0
    if (this.heuresMonsuelEmploye && this.heuresMonsuelEmploye.length > 0) {
      for (const item of this.heuresMonsuelEmploye) {
        if (item.hs_jours_feries === 0) {
          this.totalHtravailEffectif += item.heure_de_travail
        }
      }
    }
  }
  getTotalHTravailEffectif(): number {
    this.calculateTotalHtravailEffectif()
    return this.totalHtravailEffectif
  }

  private sorteHeuresMonsuelEmploye(): void {
    this.heuresMonsuelEmploye.sort((a, b) => {
      if (a.date < b.date) {
        return -1
      }
      if (a.date > b.date) {
        return 1
      }
      return 0
    })
  }

  private calculateHsParSemaine(): void {
    this.sorteHeuresMonsuelEmploye()
    let currentWeekStartDate = null
    let hsParSemaine: number = 0

    this.heuresMonsuelEmploye.forEach((item, index) => {
      const currentDate: Date = parse(item.date, 'dd/MM/yyyy', new Date())
      const jour = format(currentDate, 'EEEE', { locale: fr })
      const isLastDayOfMonth = index === this.heuresMonsuelEmploye.length - 1

      if (isMonday(currentDate) || index === 0) {
        currentWeekStartDate = currentDate
        hsParSemaine = 0
      }

      if (currentWeekStartDate) {
        hsParSemaine += item.heure_de_travail - item.heure_normale

        if (isSaturday(currentDate) || isLastDayOfMonth) {
          this.tableauTotalHsParSemaine.push({
            jour,
            semaine: format(currentWeekStartDate, 'dd/MM/yyyy'),
            totalHsParSemaine: hsParSemaine,
          })
        }
      }
    })
  }

  private isTableauHsParSemaineVide(): boolean {
    return this.tableauTotalHsParSemaine.length === 0
  }

  private isTableauHs130ParSemaineVide(): boolean {
    return this.tableauHs130ParSemaine.length === 0
  }

  private calculateHs130ParSemaine(): void {
    this.sorteHeuresMonsuelEmploye()
    this.isTableauHsParSemaineVide() && this.calculateHsParSemaine()

    if (this.tableauHs130ParSemaine) {
      // Ajout de cette vérification
      this.tableauTotalHsParSemaine.forEach((item, index) => {
        const newItem = {
          jour: item.jour,
          semaine: item.semaine,
          totalHs130ParSemaine: 0,
        }

        if (item.totalHsParSemaine >= 8) {
          newItem.totalHs130ParSemaine = 8
        } else {
          newItem.totalHs130ParSemaine = item.totalHsParSemaine
        }

        this.tableauHs130ParSemaine.push(newItem)
      })
    }
  }

  public getTaleauHsParSemaine(): { semaine: string; totalHsParSemaine: number }[] {
    this.isTableauHsParSemaineVide() && this.calculateHsParSemaine()
    return this.tableauTotalHsParSemaine
  }

  public getTableauHs130ParSemaine(): {
    jour: string
    semaine: string
    totalHs130ParSemaine: number
  }[] {
    this.isTableauHsParSemaineVide() && this.calculateHsParSemaine()
    this.isTableauHs130ParSemaineVide() && this.calculateHs130ParSemaine()
    return this.tableauHs130ParSemaine
  }

  private calculateTableauHs150(): void {
    this.isTableauHsParSemaineVide() && this.calculateHsParSemaine()
    if (this.tableauHs150ParSemaine) {
      this.tableauTotalHsParSemaine.forEach((item, index) => {
        const newItem = {
          jour: item.jour,
          semaine: item.semaine,
          totalHs150ParSemaine: 0,
        }
        if (item.totalHsParSemaine > 8) {
          newItem.totalHs150ParSemaine = item.totalHsParSemaine - 8
        } else {
          newItem.totalHs150ParSemaine = 0
        }
        this.tableauHs150ParSemaine.push(newItem)
      })
    }
  }

  private isTableauHs150ParSemaineVide(): boolean {
    return this.tableauHs150ParSemaine.length === 0
  }

  public getTableauHs150ParSemaine(): {
    jour: string
    semaine: string
    totalHs150ParSemaine: number
  }[] {
    this.isTableauHsParSemaineVide() && this.calculateHsParSemaine()
    this.isTableauHs150ParSemaineVide() && this.calculateTableauHs150()
    return this.tableauHs150ParSemaine
  }

  setTravailDeNuit(travailDeNuit: boolean): void {
    this.travail_de_nuit = travailDeNuit
  }
  getTravailDeNuit(): boolean {
    return this.travail_de_nuit
  }

  private calculTotalTravailleDeNuit30(): void {
    let totalTravailleDeNuit30 = 0
    this.heuresMonsuelEmploye.forEach((item) => {
      if (item.heure_de_travail > 0 && this.travail_de_nuit) {
        totalTravailleDeNuit30 += item.hs_de_nuit
      }
    })
    this.totalTravailleDeNuit30 = totalTravailleDeNuit30
  }

  getTotalTravailDeNuit30(): number {
    this.calculTotalTravailleDeNuit30()
    return this.totalTravailleDeNuit30
  }

  private calculateTotalHsDeNuit50(): void {
    let totalHsDeNuit50 = 0
    this.heuresMonsuelEmploye.forEach((item) => {
      if (item.heure_de_travail > 0 && !this.travail_de_nuit) {
        totalHsDeNuit50 += item.hs_de_nuit
      }
    })
    this.totalTravailDeNuit50 = totalHsDeNuit50
  }

  getTotalTravailDeNuit50(): number {
    this.calculateTotalHsDeNuit50()
    return this.totalTravailDeNuit50
  }

  private calculateTotalHdim(): void {
    let totalHdim = 0
    this.heuresMonsuelEmploye.forEach((item) => {
      const currentDate: Date = parse(item.date, 'dd/MM/yyyy', new Date())
      if (item.hs_de_dimanche > 0) {
        totalHdim += item.hs_de_dimanche
      } else if (isSunday(currentDate)) {
        totalHdim += item.heure_normale
        totalHdim += item.heure_de_travail
      }
    })

    this.totalHdim = totalHdim
  }
  getTotalHdim(): number {
    this.calculateTotalHdim()
    return this.totalHdim
  }

  private calculateTotalHs(): void {
    this.isTableauHsParSemaineVide() && this.calculateHsParSemaine()
    this.tableauTotalHsParSemaine.forEach((element) => {
      this.totalHsDuMois += element.totalHsParSemaine
    })
  }
  getTotalHsDuMois(): number {
    this.calculateTotalHs()
    return this.totalHsDuMois
  }

  private calculateTotalHs130(): void {
    this.isTableauHsParSemaineVide() && this.calculateHsParSemaine()
    this.isTableauHs130ParSemaineVide() && this.calculateHs130ParSemaine()
    this.tableauHs130ParSemaine.forEach((element) => {
      this.totalHs130 += element.totalHs130ParSemaine
    })
  }
  getTotalHs130(): number {
    this.calculateTotalHs130()
    return this.totalHs130
  }

  private calculateTotalHs150(): void {
    this.isTableauHsParSemaineVide() && this.calculateHsParSemaine()
    this.isTableauHs150ParSemaineVide() && this.calculateTableauHs150()
    this.tableauHs150ParSemaine.forEach((element) => {
      this.totalHs150 += element.totalHs150ParSemaine
    })
  }
  public getTotalHs150(): number {
    this.calculateTotalHs150()
    return this.totalHs150
  }

  private claculateTotalHFerie(): void {
    let totalHFerie = 0
    this.heuresMonsuelEmploye.forEach((item) => {
      if (item.hs_jours_feries > 0) {
        totalHFerie += item.hs_jours_feries
      }
    })
    this.totalHFerie = totalHFerie
  }
  public getTotalHFerie(): number {
    this.claculateTotalHFerie()
    return this.totalHFerie
  }
}

const calculHeuresEmploye = new CalculHeuresEmploye()

export default calculHeuresEmploye
