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
  constructor(salaireDeBase: number) {
    this.salaireBase = salaireDeBase || 0
    this.tauxHoraire = this.salaireBase / 173.33
    this.valHsni130 = 0
  }

  setTauxHoraire(tauxHoraire: number): void {
    this.tauxHoraire = tauxHoraire
  }
  getTauxHoraire(): number {
    return this.tauxHoraire
  }

  /**
   * Calculates the value of Hsni130 based on the given parameters.
   *
   * @param {number} hsni130 - The value of Hsni130.
   * @param {boolean} est_cadre - Indicates whether the person is a cadre.
   * @return {number} The calculated value of Hsni130.
   */
  public calculateValHsni130(hsni130: number, est_cadre: boolean): number {
    this.valHsni130 = 0
    if (!est_cadre && hsni130 > 0) {
      this.valHsni130 = this.roundToTwoDecimal((this.tauxHoraire * hsni130 * 130) / 100)
    }
    return this.valHsni130
  }

  //   UTILITYES
  private roundToTwoDecimal(val) {
    return Math.round(val * 100) / 100
  }
}

export default CalculPaie_v2
