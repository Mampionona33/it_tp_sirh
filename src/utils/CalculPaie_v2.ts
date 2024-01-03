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

    if (hsni130 > 0) {
      valHsni130 = this.roundToTwoDecimal((this.tauxHoraire * hsni130 * 130) / 100)
    }

    return this.est_cadre ? valHsni130 : 0
  }

  //   UTILITYES
  private roundToTwoDecimal(val) {
    return Math.round(val * 100) / 100
  }
}

export default CalculPaie_v2
