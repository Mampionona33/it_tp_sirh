import { IHeuresEmploye } from '@src/interfaces/interfaceHeuresEmploye'
import { format, isMonday, isSaturday, isSunday, parse } from 'date-fns'
import { fr } from 'date-fns/locale'

export interface ItableauHebdo {
  jour: string
  semaineDu: string
  tolalHs: number
}
class CalculHeures_v2 {
  private heuresEmploye: IHeuresEmploye[]
  private totalHnormale: number
  private totalHTrailEffectif: number
  private totalHsHebdo: number
  private tableauHsHebdo: ItableauHebdo[]
  private tableauHs130Hebdo: ItableauHebdo[]
  private tableauHs150Hebdo: ItableauHebdo[]
  private estCadre: boolean
  private totalHs130: number
  private totalHs130Monsuel: number
  private totalHs150Monsuel: number
  private totalHsNuitHabit: number
  private totalHsNuitOccas: number
  private travailleurDeNuit: boolean
  private totalHdim: number
  private totalHFerie: number
  private totalHsni130: number
  private totalHsni150: number
  private totalHsi130: number
  private totalHsi150: number
  private totalHs30NuitHabit: number
  private totalHs50NuitOccas: number
  private totalHsMonsuel: number

  constructor() {
    this.heuresEmploye = []
    this.estCadre = false
    this.totalHnormale = 0
    this.totalHTrailEffectif = 0
    this.totalHsHebdo = 0
    this.tableauHsHebdo = []
    this.tableauHs130Hebdo = []
    this.tableauHs150Hebdo = []
    this.totalHs130 = 0
    this.totalHs130Monsuel = 0
    this.totalHs150Monsuel = 0
    this.totalHsNuitHabit = 0
    this.travailleurDeNuit = false
    this.totalHsNuitOccas = 0
    this.totalHdim = 0
    this.totalHFerie = 0
    this.totalHsni130 = 0
    this.totalHsni150 = 0
    this.totalHsi130 = 0
    this.totalHsi150 = 0
    this.totalHdim = 0
    this.totalHs30NuitHabit = 0
    this.totalHs50NuitOccas = 0
    this.totalHsMonsuel = 0
  }

  setTravailleurDeNuit(travailleurDeNuit: boolean): void {
    this.travailleurDeNuit = travailleurDeNuit
  }
  getTravailleurDeNuit(): boolean {
    return this.travailleurDeNuit
  }

  setEstCadre(est_cadre: boolean): void {
    this.estCadre = est_cadre
  }
  getEstCadre(): boolean {
    return this.estCadre
  }

  setHeuresEmploye(heuresEmploye: IHeuresEmploye[]): void {
    if (Array.isArray(heuresEmploye)) {
      this.heuresEmploye = heuresEmploye
    } else {
      throw new Error('Invalid argument. Expected an array of IHeuresEmploye.')
    }
  }
  getHeuresEmploye(): IHeuresEmploye[] {
    return this.heuresEmploye
  }

  private calculateTotalHnormale(): number {
    let totalHnormale: number = 0
    for (const item of this.heuresEmploye) {
      if (item.hs_jours_feries === 0) {
        totalHnormale += item.heure_normale
      }
    }
    return this.estCadre ? 0 : totalHnormale
  }

  getTotalHnormale(): number {
    return this.calculateTotalHnormale()
  }
  setTotalHnormale(totalHnormale: number): void {
    this.totalHnormale = totalHnormale
  }

  private calculateTotalHTravailEffectif(): number {
    let totalHTrailEffectif = 0
    if (this.heuresEmploye && this.heuresEmploye.length > 0) {
      for (const item of this.heuresEmploye) {
        if (item.hs_jours_feries === 0) {
          totalHTrailEffectif += item.heure_de_travail
        }
      }
    }
    return this.estCadre ? 0 : totalHTrailEffectif
  }
  getTotalHTravailEffectif(): number {
    return this.calculateTotalHTravailEffectif()
  }
  setTotalHTravailEffectif(totalHTravailEffectif: number): void {
    this.totalHTrailEffectif = totalHTravailEffectif
  }

  private calculateTableauHsHebdo(): ItableauHebdo[] {
    let totalHsHebdo = 0
    let currentWeekStartDate: Date | null = null
    let tableauHsHebdo: ItableauHebdo[] = []

    if (this.heuresEmploye && this.heuresEmploye.length > 0) {
      this.heuresEmploye.forEach((item, index) => {
        const currentDate: Date = parse(item.date, 'dd/MM/yyyy', new Date())
        const jour: string = format(currentDate, 'EEEE', { locale: fr })
        const isLastDayOfMonth: boolean = index === this.heuresEmploye.length - 1
        const tolalHs: number = totalHsHebdo

        if (isMonday(currentDate) || index === 0) {
          currentWeekStartDate = currentDate
          totalHsHebdo = 0
        }

        if (currentWeekStartDate) {
          totalHsHebdo += item.heure_de_travail - item.heure_normale
          if (isSaturday(currentDate) || isSunday(currentDate) || isLastDayOfMonth) {
            totalHsHebdo += item.heure_normale
          }
        }

        if (currentWeekStartDate) {
          const semaineDu: string = format(currentWeekStartDate, 'dd/MM/yyyy', { locale: fr })

          if (isSaturday(currentDate) || isLastDayOfMonth) {
            tableauHsHebdo.push({
              jour: jour,
              semaineDu: semaineDu,
              tolalHs: tolalHs,
            })
          }
        }
      })
    }
    return this.estCadre ? [] : tableauHsHebdo
  }
  /**
   * Sets the value of the "tableauHsHebdo" property.
   *
   * @param {ItableauHebdo[]} tableauHsHebdo - The array containing the values to be assigned to the property.
   * @return {void} This function does not return a value.
   */
  setTableauHsHebdo(tableauHsHebdo: ItableauHebdo[]): void {
    this.tableauHsHebdo = tableauHsHebdo
  }
  getTableauHsHebdo(): ItableauHebdo[] {
    return this.calculateTableauHsHebdo()
  }

  /**
   * Calculates the tableau Hs130Hebdo.
   *
   * @return {ItableauHebdo[]} The calculated tableau Hs130Hebdo.
   */
  private calculateTableauHs130Hebdo(): ItableauHebdo[] {
    const tableauHs130Hebdo: ItableauHebdo[] = []
    const tableauHsHebdo = this.calculateTableauHsHebdo()

    for (const item of tableauHsHebdo) {
      if (item.tolalHs >= 8) {
        const totalHs = item.tolalHs >= 8 ? 8 : item.tolalHs
        tableauHs130Hebdo.push({ ...item, tolalHs: totalHs })
      }
    }

    return this.estCadre ? [] : tableauHs130Hebdo
  }
  setTableauHs130Hebdo(tableauHs130Hebdo: ItableauHebdo[]): void {
    this.tableauHs130Hebdo = tableauHs130Hebdo
  }
  getTableauHs130Hebdo(): ItableauHebdo[] {
    return this.calculateTableauHs130Hebdo()
  }

  private calculateTableauHs150Hebdo(): ItableauHebdo[] {
    const tableauHs150Hebdo: ItableauHebdo[] = []
    const tableauHsHebdo = this.calculateTableauHsHebdo()
    for (const item of tableauHsHebdo) {
      if (item.tolalHs >= 8) {
        const totalHs = item.tolalHs >= 8 ? item.tolalHs - 8 : 0
        tableauHs150Hebdo.push({ ...item, tolalHs: totalHs })
      }
    }
    return this.estCadre ? [] : tableauHs150Hebdo
  }
  setTableauHs150Hebdo(tableauHs150Hebdo: ItableauHebdo[]): void {
    this.tableauHs150Hebdo = tableauHs150Hebdo
  }
  getTableauHs150Hebdo(): ItableauHebdo[] {
    return this.calculateTableauHs150Hebdo()
  }

  private calculateTotalHs130Monsuel(): number {
    let totalHs130 = 0
    const tableauHs130Hebdo = this.calculateTableauHs130Hebdo()

    for (const item of tableauHs130Hebdo) {
      totalHs130 += item.tolalHs
    }

    return this.estCadre ? 0 : totalHs130
  }
  setTotalHs130Monsuel(totalHs130Monsuel: number): void {
    this.totalHs130Monsuel = totalHs130Monsuel
  }
  getTotalHs130Monsuel(): number {
    return this.calculateTotalHs130Monsuel()
  }

  private calculateTotalHs150Monsuel(): number {
    let totalHs150 = 0
    const tableauHs150Hebdo = this.calculateTableauHs150Hebdo()

    for (const item of tableauHs150Hebdo) {
      totalHs150 += item.tolalHs
    }
    return this.estCadre ? 0 : totalHs150
  }
  setTotalHs150Monsuel(totalHs150Monsuel: number): void {
    this.totalHs150Monsuel = totalHs150Monsuel
  }
  getTotalHs150Monsuel(): number {
    return this.calculateTotalHs150Monsuel()
  }

  private calculateTotalHsNuitHabit(): number {
    let totalHsNuitHabit = 0
    for (const item of this.heuresEmploye) {
      if (this.travailleurDeNuit) {
        totalHsNuitHabit += item.hs_de_nuit
      }
    }
    return this.estCadre ? 0 : totalHsNuitHabit
  }
  setTotalHsNuitHabit(totalHsNuitHabit: number): void {
    this.totalHsNuitHabit = totalHsNuitHabit
  }
  getTotalHsNuitHabit(): number {
    return this.calculateTotalHsNuitHabit()
  }

  private calculateTotalHsNuitOccas(): number {
    let totalHs = 0
    for (const item of this.heuresEmploye) {
      if (!this.estCadre) {
        totalHs += item.hs_de_nuit
      }
    }
    return this.estCadre ? 0 : totalHs
  }
  setTotalHsNuitOccas(totalHsNuitOccas: number): void {
    this.totalHsNuitOccas = totalHsNuitOccas
  }
  getTotalHsNuitOccas(): number {
    return this.calculateTotalHsNuitOccas()
  }

  private calculateTotalHDimanche(): number {
    let totalHdim = 0
    for (const item of this.heuresEmploye) {
      if (item.hs_de_dimanche === 0 && isSunday(parse(item.date, 'dd/MM/yyyy', new Date()))) {
        totalHdim += item.heure_normale
        totalHdim += item.heure_de_travail
      } else {
        totalHdim += item.hs_de_dimanche
      }
    }
    return this.estCadre ? 0 : totalHdim
  }
  setTotalHDimanche(totalHdim: number): void {
    this.totalHdim = totalHdim
  }
  getTotalHdim(): number {
    return this.calculateTotalHDimanche()
  }

  private calculateTotalHFerie(): number {
    let totalHFerie = 0
    for (const item of this.heuresEmploye) {
      totalHFerie += item.hs_jours_feries
    }
    return this.estCadre ? 0 : totalHFerie
  }
  setTotalHFerie(totalHFerie: number): void {
    this.totalHFerie = totalHFerie
  }
  getTotalHFerie(): number {
    return this.calculateTotalHFerie()
  }

  private calculateTotalHsni130(): number {
    let totalHsni130 = 0
    const totalHsMensuel = this.calculateTotalHsMonsuel()
    if (totalHsMensuel >= 20) {
      totalHsni130 = totalHsMensuel - 18
      if (totalHsni130 >= 18) {
        totalHsni130 = 18
      }

      if (totalHsni130 < 0) {
        totalHsni130 = 0
      }
    } else {
      totalHsni130 = totalHsMensuel
    }

    return this.estCadre ? 0 : totalHsni130
  }
  setTotalHsni130(totalHsni130: number): void {
    this.totalHsni130 = totalHsni130
  }
  getTotalHsni130(): number {
    return this.calculateTotalHsni130()
  }

  private calculateTotalHsni150(): number {
    let totalHsni150 = 0
    const totalHsMensuel = this.calculateTotalHsMonsuel()
    const totalHsni130 = this.calculateTotalHsni130()

    if (totalHsMensuel > 18 && totalHsni130 === 18) {
      if (totalHsMensuel >= 20) {
        totalHsni150 = 20 - totalHsni130
      } else {
        totalHsni150 = totalHsMensuel - totalHsni130
      }
    }

    if (totalHsni150 < 0) {
      totalHsni150 = 0
    }

    return this.estCadre ? 0 : totalHsni150
  }

  setTotalHsni150(totalHsni150: number): void {
    this.totalHsni150 = totalHsni150
  }
  getTotalHsni150(): number {
    return this.calculateTotalHsni150()
  }

  private calculateTotalHsi130(): number {
    let totalHs130 = 0
    let totalHs130Monsuel = this.calculateTotalHs130Monsuel()
    let totalHsni130 = this.calculateTotalHsni130()

    totalHs130 = totalHs130Monsuel > 18 ? totalHs130Monsuel - totalHsni130 : 0

    return this.estCadre ? 0 : totalHs130
  }
  setTotalHsi130(totalHsi130: number): void {
    this.totalHsi130 = totalHsi130
  }
  getTotalHsi130(): number {
    return this.calculateTotalHsi130()
  }

  private calculateTotalHsi150(): number {
    let totalHs150 = 0
    let totalHs150Monsuel = this.calculateTotalHs150Monsuel()
    let totalHsni150 = this.calculateTotalHsni150()

    totalHs150 = totalHs150Monsuel > 2 ? totalHs150Monsuel - totalHsni150 : 0

    return this.estCadre ? 0 : totalHs150
  }
  setTotalHsi150(totalHsi150: number): void {
    this.totalHsi150 = totalHsi150
  }
  getTotalHsi150(): number {
    return this.calculateTotalHsi150()
  }

  private calculateTotalHs30NuitHabit(): number {
    let totalHs30 = 0
    for (const item of this.heuresEmploye) {
      if (this.travailleurDeNuit) {
        totalHs30 += item.hs_de_nuit
      }
    }
    return this.estCadre ? 0 : totalHs30
  }
  setTotalHs30NuitHabit(totalHs30: number): void {
    this.totalHs30NuitHabit = totalHs30
  }
  getTotalHs30NuitHabit(): number {
    return this.calculateTotalHs30NuitHabit()
  }

  private calculateTotalHs50NuitOccas(): number {
    let totalHs50 = 0
    for (const item of this.heuresEmploye) {
      if (!this.travailleurDeNuit) {
        totalHs50 += item.hs_de_nuit
      }
    }
    return this.estCadre ? 0 : totalHs50
  }
  setTotalHs50NuitOccas(totalHs50: number): void {
    this.totalHs50NuitOccas = totalHs50
  }
  getTotalHs50NuitHabit(): number {
    return this.calculateTotalHs50NuitOccas()
  }

  private calculateTotalHsMonsuel(): number {
    let totalHsMonsuel = 0
    for (const item of this.heuresEmploye) {
      totalHsMonsuel +=
        item.heure_de_travail > item.heure_normale ? item.heure_de_travail - item.heure_normale : 0
    }
    return this.estCadre ? 0 : totalHsMonsuel
  }
  setTotalHsMonsuel(totalHsMonsuel: number): void {
    this.totalHsMonsuel = totalHsMonsuel
  }
  getTotalHsMonsuel(): number {
    return this.calculateTotalHsMonsuel()
  }
}

export default CalculHeures_v2
