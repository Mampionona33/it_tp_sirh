import { IHeuresEmploye } from '@src/interfaces/interfaceHeuresEmploye'

class CalculPaie_v2 {
  private salaireBase: number
  private plafondSME: number
  private est_cadre: boolean
  private tauxHoraire: number

  constructor() {
    this.salaireBase = 0
    this.tauxHoraire = 173.33
    this.est_cadre = false
    this.plafondSME = 1910400
  }

  setPlafondSME(plafondSME: number): void {
    this.plafondSME = plafondSME
  }
  getPlafondSME(): number {
    return this.plafondSME
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
    valHsni130 = this.roundToTwoDecimal((tauxHoraire * hsni130 * 130) / 100)

    return this.est_cadre ? 0 : valHsni130
  }

  public calculateValHsni150(hsni150: number): number {
    let valHsni150 = 0
    let tauxHoraire = this.calculateTauxHoraire()
    valHsni150 = this.roundToTwoDecimal((tauxHoraire * hsni150 * 150) / 100)

    return this.est_cadre ? 0 : valHsni150
  }

  public calculateValHsi130(hsi130: number): number {
    let valHsi130 = 0
    let tauxHoraire = this.calculateTauxHoraire()
    valHsi130 = this.roundToTwoDecimal((tauxHoraire * hsi130 * 130) / 100)
    return this.est_cadre ? 0 : valHsi130
  }

  //   UTILITYES
  private roundToTwoDecimal(val) {
    return Math.round(val * 100) / 100
  }
}

export default CalculPaie_v2
