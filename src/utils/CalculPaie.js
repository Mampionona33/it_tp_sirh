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

  constructor(salaireBase) {
    this.salaireBase = salaireBase
    this.isCadre = false
  }

  // Setter
  setTauxHoraire(tauxHoraire) {
    this.tauxHoraire = this.salaireBase / tauxHoraire
  }
  setPlafondSME(plafondSME) {
    this.plafondSME = plafondSME
  }
  setCnpas(tauxCnaps) {
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
  getHsni130Value() {
    return this.isCadre ? 0 : (this.tauxHoraire * this.hsni130 * 130) / 100
  }

  getHsni150Value() {
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

  getSalaireBrut() {
    return this.isCadre
      ? this.salaireBase
      : this.getHsni130Value() +
          this.getHsni150Value() +
          this.getHn30() +
          this.getHn50() +
          this.getHDim() +
          this.getHsi130() +
          this.getHsi150() +
          this.salaireBase
  }

  getCnaps() {
    return this.getSalaireBrut() >= this.plafondSME
      ? this.plafondSME * this.tauxCnaps
      : this.getSalaireBrut() * this.tauxCnaps
  }

  getOmsi() {
    return this.getSalaireBrut() * this.tauxOmsi
  }
}
