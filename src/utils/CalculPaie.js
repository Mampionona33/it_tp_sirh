export default class CalculPai {
  totalHn30 = 0
  isCadre
  totalHs130 = 0
  totalHs150 = 0
  tauxHoraire = 0
  totalHdim = 0
  hsni130 = 0
  hn30 = 0
  hsni150 = 0
  plafondSME = 1910400
  hsi130 = 0
  hsi150 = 0
  tauxCnaps = 0.01
  irsa = 0
  tauxOmsi = 0.01
  salaireBase = 0
  primeEtAvantage = 0
  totalAjoutSalaire = 0
  totalRetenuSalarie = 0
  baseCnaps = 0

  constructor(salaireBase) {
    this.salaireBase = salaireBase
    this.isCadre = false
  }

  // Setter
  setTotalRetenuSalarie(totalRetenuSalarie) {
    this.totalRetenuSalarie = totalRetenuSalarie
  }

  setBaseCnaps(baseCnaps) {
    this.baseCnaps = baseCnaps
  }

  setTotalAjoutSalaire(totalAjoutSalaire) {
    this.totalAjoutSalaire = totalAjoutSalaire
  }
  setTauxHoraire(tauxHoraire) {
    this.tauxHoraire = this.salaireBase / tauxHoraire
  }
  setPrimeEtAvantage() {
    return 0
  }
  setPlafondSME(plafondSME) {
    this.plafondSME = plafondSME
  }
  setTauxCnaps(tauxCnaps) {
    this.tauxCnaps = tauxCnaps
  }
  setHsni130(hsni130) {
    this.hsni130 = hsni130
  }
  setHsni150(hsni150) {
    this.hsni150 = hsni150
  }
  setHsi130(hsi130) {
    this.hsi130 = hsi130
  }
  setHsi150(hsi150) {
    this.hsi150 = hsi150
  }
  setTotalHs130(totalHs130) {
    this.totalHs130 = totalHs130
  }
  setTotalHs150(totalHs150) {
    this.totalHs150 = totalHs150
  }
  setTotalHn30(totalHn30) {
    this.totalHn30 = totalHn30
  }
  setTotalHn50(totalHn50) {
    this.totalHn50 = totalHn50
  }
  setTotalHDim(totalHdim) {
    this.totalHdim = totalHdim
  }
  setIsCadre(cadre) {
    this.isCadre = cadre
  }

  setOmsi(tauxOmsi) {
    this.tauxOmsi = tauxOmsi
  }

  // getter
  getTotalRetenuSalarie() {
    return this.totalRetenuSalarie
  }
  getTotalAjoutSalaire() {
    return this.totalAjoutSalaire
  }
  getHsni130() {
    return this.isCadre ? 0 : (this.tauxHoraire * this.hsni130 * 130) / 100
  }

  getHsni150() {
    return this.isCadre ? 0 : (this.tauxHoraire * this.hsni150 * 150) / 100
  }

  getHsi130() {
    return this.isCadre ? 0 : (this.tauxHoraire * (this.totalHs130 - this.hsni130) * 130) / 100
  }

  getHsi150() {
    return this.isCadre ? 0 : (this.tauxHoraire * (this.totalHs150 - this.hsni150) * 150) / 100
  }

  getHn30() {
    return this.isCadre ? 0 : (this.tauxHoraire * this.totalHn30 * 30) / 100
  }
  getHn50() {
    return this.isCadre ? 0 : (this.tauxHoraire * this.totalHn50 * 50) / 100
  }

  getHDim() {
    return this.isCadre ? 0 : (this.tauxHoraire * this.totalHdim * 100) / 100
  }

  getPrimeEtAvantage() {
    return this.primeEtAvantage
  }

  getTauxCnaps() {
    return this.tauxCnaps
  }

  getTauxOmsi() {
    return this.tauxOmsi
  }

  getPlafondSME() {
    return this.plafondSME
  }

  getCnaps() {
    return this.getSalaireBrut() >= this.getPlafondSME()
      ? this.getPlafondSME() * this.tauxCnaps
      : this.getSalaireBrut() * this.tauxCnaps
  }

  getSalaireBrut() {
    return this.isCadre
      ? this.salaireBase + this.getTotalAjoutSalaire() - this.getTotalRetenuSalarie()
      : this.getHsni130() +
          this.getTotalAjoutSalaire() +
          this.getHsni150() +
          this.getHn30() +
          this.getHn50() +
          this.getHDim() +
          this.getHsi130() +
          this.getHsi150() +
          this.salaireBase +
          this.getPrimeEtAvantage() -
          this.getTotalRetenuSalarie()
  }

  getBaseCnaps() {
    if (this.getSalaireBrut() >= this.getPlafondSME()) {
      this.setBaseCnaps(this.getPlafondSME())
    } else {
      this.setBaseCnaps(this.getSalaireBrut())
    }
    return this.baseCnaps
  }

  getOmsi() {
    return this.getSalaireBrut() * this.tauxOmsi
  }

  getBaseIrsa() {
    return (
      this.getSalaireBrut() -
      this.getCnaps() -
      this.getOmsi() -
      this.getHsni130() -
      this.getHsni150()
    )
  }
}
