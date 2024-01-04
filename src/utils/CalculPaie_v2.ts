import { IHeuresEmploye } from '@src/interfaces/interfaceHeuresEmploye'

class CalculPaie_v2 {
  private salaireBase: number
  private plafondSME: number
  private est_cadre: boolean
  private tauxHoraire: number
  private hsni130: number
  private hsni150: number
  private hsi130: number
  private hsi150: number
  private totalHDim: number
  private totalPrimeEtAvantage: number
  private totalDeduction: number
  private salaireBrut: number
  private tauxOsie: number
  private tauxCnaps: number
  private baseIrsa: number
  private baseIrsaArrondi: number
  private irsaAPayer: number
  private avance: number
  private totalHs50: number
  private totalHs30: number
  private valHsni130: number
  constructor() {
    this.salaireBase = 0
    this.tauxHoraire = 0
    this.valHsni130 = 0
    this.est_cadre = false
  }
  setSalaireBase(salaireBase: number): void {
    this.salaireBase = salaireBase
  }
  getSalaireBase(): number {
    return this.salaireBase
  }

  private calculateTauxHoraire(): number {
    return this.tauxHoraire > 0 ? this.salaireBase / this.tauxHoraire : 0
  }
  setTauxHoraire(tauxHoraire: number): void {
    this.tauxHoraire = tauxHoraire
  }
  getTauxHoraire(): number {
    this.calculateTauxHoraire()
    return this.tauxHoraire
  }

  /**
   * Calculates the value of Hsni130 based on the given parameters.
   *
   * @param {number} hsni130 - The value of Hsni130.
   * @param {boolean} est_cadre - Indicates whether the person is a cadre.
   * @return {number} The calculated value of Hsni130.
   */
  public calculateValHsni130(hsni130: number): number {
    let valHsni130 = 0
    let tauxHoraire = this.calculateTauxHoraire()
    if (hsni130 > 0) {
      valHsni130 = this.roundToTwoDecimal((tauxHoraire * hsni130 * 130) / 100)
    }

    return this.est_cadre ? 0 : valHsni130
  }
  setValHsni130(valHsni130: number): void {
    this.valHsni130 = valHsni130
  }
  getValHsni130(): number {
    return this.valHsni130
  }

  public calculateValHsni150(hsni150: number): number {
    let valHsni150 = 0
    let tauxHoraire = this.calculateTauxHoraire()
    if (hsni150 > 0) {
      valHsni150 = this.roundToTwoDecimal((tauxHoraire * hsni150 * 150) / 100)
    }
    return valHsni150
  }

  //   UTILITYES
  private roundToTwoDecimal(val) {
    return Math.round(val * 100) / 100
  }
}

export default CalculPaie_v2
