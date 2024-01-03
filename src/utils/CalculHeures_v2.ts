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
    return totalHnormale
  }

  getTotalHnormale(): number {
    return this.calculateTotalHnormale()
  }
  setTotalHnormale(totalHnormale: number): void {
    this.totalHnormale = totalHnormale
  }

  private calculateTotalHTravailEffectif(): number {
    this.totalHTrailEffectif = 0
    if (this.heuresEmploye && this.heuresEmploye.length > 0) {
      for (const item of this.heuresEmploye) {
        if (item.hs_jours_feries === 0) {
          this.totalHTrailEffectif += item.heure_de_travail
        }
      }
    }
    return this.totalHTrailEffectif
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
    return tableauHsHebdo
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

    return tableauHs130Hebdo
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
    return tableauHs150Hebdo
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

    return totalHs130
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
    return totalHs150
  }
  setTotalHs150Monsuel(totalHs150Monsuel: number): void {
    this.totalHs150Monsuel = totalHs150Monsuel
  }
  getTotalHs150Monsuel(): number {
    return this.calculateTotalHs150Monsuel()
  }
}

export default CalculHeures_v2
