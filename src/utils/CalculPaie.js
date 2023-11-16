export default class CalculPai {
  totalHn30 = 0
  isResponsable = false
  totalHs130 = 0
  totalHs150 = 0
  tauxHoraire = 0
  totalHdim = 0
  hsni130 = 0
  hn30 = 0
  hsni150 = 0
  hsi130 = 0
  hsi150 = 0
  irsa = 0
  omsi = 0
  salaireBase = 0
  constructor(salaireBase) {
    this.salaireBase = salaireBase
  }

  // Setter
  setTauxHoraire(tauxHoraire) {
    this.tauxHoraire = this.salaireBase / tauxHoraire
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

  // getter
  getHsni130Value() {
    console.log(`taux horaire: ${this.tauxHoraire}, hsni130:${this.hsni130}`)
    return (this.tauxHoraire * this.hsni130 * 130) / 100
  }
  getHsni150Value() {
    console.log(`taux horaire: ${this.tauxHoraire}, hsni150:${this.hsni150}`)
    return (this.tauxHoraire * this.hsni150 * 150) / 100
  }
  getHsi130() {
    return (this.tauxHoraire * (this.totalHs130 - this.hsni130) * 130) / 100
  }

  getHsi150() {
    console.log(
      `taux horaire: ${this.tauxHoraire}, hsni150:${this.hsni150},totalHs150:${this.totalHs150}`,
    )
    return (this.tauxHoraire * (this.totalHs150 - this.hsni150) * 150) / 100
  }

  getHn30() {
    return (this.tauxHoraire * this.totalHn30 * 30) / 100
  }
  getHn50() {
    return (this.tauxHoraire * this.totalHn50 * 50) / 100
  }

  getHDim() {
    return (this.tauxHoraire * this.totalHdim * 100) / 100
  }

  getSalaireBrut() {
    
  }
}
