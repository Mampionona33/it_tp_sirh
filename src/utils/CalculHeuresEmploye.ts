import { IHeuresEmploye } from '@src/interfaces/interfaceHeuresEmploye'
import { addDays, format, isMonday, isSaturday, isSunday, parse, startOfWeek } from 'date-fns'
import { fr } from 'date-fns/locale'

class CalculHeuresEmploye {
  private heuresMonsuelEmploye: IHeuresEmploye[]
  private totalHnormale: number
  private totalHtravailEffectif: number
  private tableauTotalHsParSemaine: { jour: string; semaine: string; totalHsParSemaine: number }[]
  private taleauHs130ParSemaine: { jour: string; semaine: string; totalHs130ParSemaine: number }[]
  constructor() {
    this.heuresMonsuelEmploye = []
    this.totalHnormale = 0
    this.totalHtravailEffectif = 0
    this.tableauTotalHsParSemaine = []
    this.taleauHs130ParSemaine = []
  }

  setHeuresMonsuelEmploye(heuresMonsuelEmploye: IHeuresEmploye[]): void {
    this.heuresMonsuelEmploye = heuresMonsuelEmploye
  }

  getHeuresMonsuelEmploye(): IHeuresEmploye[] {
    return this.heuresMonsuelEmploye
  }

  getTotalHnormale(): number {
    this.totalHnormale = 0 // Réinitialiser la somme à zéro avant le calcul
    if (this.heuresMonsuelEmploye && this.heuresMonsuelEmploye.length > 0) {
      for (const item of this.heuresMonsuelEmploye) {
        this.totalHnormale += item.heure_normale
      }
    }
    return this.totalHnormale
  }

  getTotalHTravailEffectif(): number {
    this.totalHtravailEffectif = 0
    if (this.heuresMonsuelEmploye && this.heuresMonsuelEmploye.length > 0) {
      for (const item of this.heuresMonsuelEmploye) {
        this.totalHtravailEffectif += item.heure_de_travail
      }
    }
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

  private calculateHsParSemaine() {
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
    return this.taleauHs130ParSemaine.length === 0
  }

  private calculateHs130ParSemaine() {
    this.sorteHeuresMonsuelEmploye()
    this.isTableauHsParSemaineVide() && this.calculateHsParSemaine()

    if (this.taleauHs130ParSemaine) {
      // Ajout de cette vérification
      this.tableauTotalHsParSemaine.forEach((item, index) => {
        console.log(item)

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

        this.taleauHs130ParSemaine.push(newItem)
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
    return this.taleauHs130ParSemaine
  }
}

const calculHeuresEmploye = new CalculHeuresEmploye()

export default calculHeuresEmploye
