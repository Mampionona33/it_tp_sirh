export default class CalculateurPaie {
  constructor(salaireBase) {
    this.plafondSME = 1910400
    this.isCadre = false
    this.salaireBase = salaireBase
    this.tauxHoraire = this.salaireBase / 173.33
    this.valHsni130 = 0
    this.hsni130 = 0
    this.valHsni150 = 0
    this.hsni150 = 0
    this.hsi130 = 0
    this.valHsi130 = 0
    this.valHsi150 = 0
    this.hsi150 = 0
  }

  //   SETTERS
  setHsi150(hsi150) {
    this.hsi150 = hsi150
  }
  setHsi130(hsi130) {
    this.hsi130 = hsi130
  }
  setHsni150(hsni150) {
    this.hsni150 = hsni150
  }
  setTauxHoraire(tauxHoraire) {
    this.tauxHoraire = tauxHoraire
  }
  setIsCadre(isCadre) {
    this.isCadre = isCadre
  }
  setPlafondSME(plafondSME) {
    this.plafondSME = plafondSME
  }
  setSalaireBase(salaireBase) {
    this.salaireBase = salaireBase
  }
  setValHsni130(valHsni130) {
    this.valHsni130 = valHsni130
  }
  setHsni130(hsni130) {
    this.hsni130 = hsni130
  }
  setValHsi150(valHsi150) {
    this.valHsi150 = valHsi150
  }

  //   UTILITYES
  roundToTwoDecimal(val) {
    return Math.round(val * 100) / 100
  }

  //   CALCULATORS
  calculValHsni130() {
    this.valHsni130 = this.isCadre
      ? 0
      : this.roundToTwoDecimal((this.tauxHoraire * this.hsni130 * 130) / 100)
  }

  calculValHsni150() {
    this.valHsni150 = this.isCadre
      ? 0
      : this.roundToTwoDecimal((this.tauxHoraire * this.hsni150 * 150) / 100)
  }
  calculValHsi130() {
    this.valHsi130 = this.isCadre
      ? 0
      : this.roundToTwoDecimal((this.tauxHoraire * this.hsi130 * 130) / 100)
  }
  calculValHsi150() {
    this.valHsi150 = this.isCadre
      ? 0
      : this.roundToTwoDecimal((this.tauxHoraire * this.hsi150 * 150) / 100)
  }

  //   GETTERS
  getHsi150() {
    return this.hsi150
  }
  getHsi130() {
    return this.hsi130
  }
  getHsni150() {
    return this.hsni150
  }
  getTauxHoraire() {
    return this.tauxHoraire
  }
  getSalaireBase() {
    return this.salaireBase
  }
  getHsni130() {
    return this.hsni130
  }

  getValHsni130() {
    this.calculValHsni130()
    return this.valHsni130
  }
  getValHsni150() {
    this.calculValHsni150()
    return this.valHsni150
  }
  getValHsi130() {
    this.calculValHsi130()
    return this.valHsi130
  }
  getValHsi150() {
    this.calculValHsi150()
    return this.valHsi150
  }
}
