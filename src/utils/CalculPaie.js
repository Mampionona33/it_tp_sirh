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
  irsaAPayer = 0
  tauxOmsi = 0.01
  salaireBase = 0
  primeEtAvantage = 0
  totalAjoutSalaire = 0
  totalRetenuSalarie = 0
  baseCnaps = 0
  avance = 0
  totalHs = 0

  constructor() {
    this.isCadre = false
  }

  setSalaireDeBase(salaireBase) {
    this.salaireBase = salaireBase
  }

  // Setter
  setIrsa(irsaAPayer) {
    this.irsaAPayer = irsaAPayer
  }

  setTotalHs(totalHs) {
    this.totalHs = totalHs
  }

  setAvance(avance) {
    this.avance = avance
  }

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
    if (this.totalHs >= 20) {
      return this.isCadre ? 0 : (this.tauxHoraire * this.hsni130 * 130) / 100
    } else {
      return this.isCadre ? 0 : (this.tauxHoraire * this.totalHs130 * 130) / 100
    }
  }

  getHsni150() {
    return this.isCadre ? 0 : (this.tauxHoraire * this.hsni150 * 150) / 100
  }

  getHsi130() {
    if (this.totalHs >= 20) {
      return this.isCadre ? 0 : (this.tauxHoraire * (this.totalHs130 - this.hsni130) * 130) / 100
    } else {
      return 0
    }
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
  getTauxOmsi() {
    return this.tauxOmsi
  }

  getPrimeEtAvantage() {
    return this.primeEtAvantage
  }

  getTauxCnaps() {
    return this.tauxCnaps
  }

  getPlafondSME() {
    return this.plafondSME
  }

  getCnaps() {
    return this.getSalaireBrut() >= this.getPlafondSME()
      ? this.getPlafondSME() * this.tauxCnaps
      : this.getSalaireBrut() * this.tauxCnaps
  }

  getSalaireDeBase() {
    return this.salaireBase
  }

  getAvance() {
    return this.avance
  }

  getSalaireBrut() {
    return this.isCadre
      ? this.getSalaireDeBase() + this.getTotalAjoutSalaire() - this.getTotalRetenuSalarie()
      : this.getHsni130() +
          this.getTotalAjoutSalaire() +
          this.getHsni150() +
          this.getHn30() +
          this.getHn50() +
          this.getHDim() +
          this.getHsi130() +
          this.getHsi150() +
          this.getSalaireDeBase() +
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
    const cnaps = this.getCnaps()
    const omsi = this.getOmsi()
    const hsni130 = this.getHsni130()
    const hsni150 = this.getHsni150()

    this.irsa = this.getSalaireBrut() - cnaps - omsi - hsni130 - hsni150

    return this.irsa
  }

  getBaseIrsaArrondi() {
    const baseIrsa = this.getBaseIrsa()
    const result = Math.floor(baseIrsa / 100) * 100
    return result
  }

  // Calcul Irsa a payer
  // ---------------------------------------------

  isTranche0() {
    return this.getBaseIrsaArrondi() <= 350000
  }
  isTranche1() {
    return this.getBaseIrsaArrondi() >= 350001 && this.getBaseIrsaArrondi() <= 400000
  }
  isTranche2() {
    return this.getBaseIrsaArrondi() >= 400001 && this.getBaseIrsaArrondi() <= 500000
  }
  isTranche3() {
    return this.getBaseIrsaArrondi() >= 500001 && this.getBaseIrsaArrondi() <= 600000
  }

  calculIrsaTranche() {
    if (this.isTranche0()) {
      this.irsaAPayer = 0
    } else if (this.isTranche1()) {
      this.irsaAPayer = (this.getBaseIrsaArrondi() - 350000) * 0.05
    } else if (this.isTranche2()) {
      this.irsaAPayer = 50000 * 0.05 + (this.getBaseIrsaArrondi() - 400000) * 0.1
    } else if (this.isTranche3()) {
      this.irsaAPayer = 50000 * 0.05 + 100000 * 0.1 + (this.getBaseIrsaArrondi() - 500000) * 0.15
    } else {
      this.irsaAPayer =
        50000 * 0.05 + 100000 * 0.1 + 100000 * 0.15 + (this.getBaseIrsaArrondi() - 600000) * 0.2
    }

    if (this.irsaAPayer < 2000) {
      this.irsaAPayer = 2000
    }
  }

  getIrsaAPayer() {
    this.calculIrsaTranche()
    return this.irsaAPayer
  }
  // -----------------------------------

  getSalaireNet() {
    return this.getBaseIrsaArrondi() - this.getIrsaAPayer()
  }

  calculSalaireNetAPayer() {
    return this.getSalaireNet() - this.avance
  }

  getSalaireNetAPayer() {
    return this.calculSalaireNetAPayer()
  }
}
