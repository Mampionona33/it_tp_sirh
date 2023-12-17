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
    this.totalHDim = 0
    this.valHdim = 0
    this.totalPrimeEtAvantage = 0
    this.totalDeduction = 0
    this.salaireBrut = 0
    this.baseCnaps = 0
    this.tauxOmsi = 0.01
    this.tauxCnaps = 0.01
    this.cnaps = 0
    this.baseIrsa = 0
    this.baseIrsaArrondi = 0
    this.irsaAPayer = 0
    this.avance = 0
    this.salaireNet = 0
    this.salaireNetAPayer = 0
    this.totalHFerie = 0
    this.valHFerie = 0
    this.valHs30 = 0
    this.valHs50 = 0
    this.totalHs30 = 0
    this.totalHs50 = 0
  }

  //   SETTERS cl
  setTotalHs50(totalHs50) {
    this.totalHs50 = totalHs50
  }
  setTotalHs30(totalHs30) {
    this.totalHs30 = totalHs30
  }
  setTotalHFerie(totalHFerie) {
    this.totalHFerie = totalHFerie
  }
  setAvance(avance) {
    this.avance = avance
  }
  setIrsaAPayer(irsaAPayer) {
    this.irsaAPayer = irsaAPayer
  }
  setBaseIrsaArrondi(baseIrsaArrondi) {
    this.baseIrsaArrondi = baseIrsaArrondi
  }
  setBaseIrsa(baseIrsa) {
    this.baseIrsa = baseIrsa
  }
  setTauxCnaps(tauxCnaps) {
    this.tauxCnaps = tauxCnaps
  }
  setTauxOmsi(tauxOmsi) {
    this.tauxOmsi = tauxOmsi
  }
  setSalaireBrut(salaireBrut) {
    this.salaireBrut = salaireBrut
  }
  setTotalDeduction(totalDeduction) {
    this.totalDeduction = totalDeduction
  }
  setTotalPrimeEtAvantage(totalPrimeEtAvantage) {
    this.totalPrimeEtAvantage = totalPrimeEtAvantage
  }
  setTotalHDim(totalHDim) {
    this.totalHDim = totalHDim
  }
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
  arrondirNombreDecimales(nombre, decimales) {
    const facteur = Math.pow(10, decimales)
    return Math.round(nombre * facteur) / facteur
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
  calculValHdim() {
    this.valHdim = this.isCadre
      ? 0
      : this.roundToTwoDecimal((this.tauxHoraire * this.totalHDim * 40) / 100)
  }

  calculValHs30() {
    this.valHs30 = this.isCadre
      ? 0
      : this.roundToTwoDecimal((this.tauxHoraire * this.totalHs30 * 30) / 100)
  }
  calculValHs50() {
    this.valHs50 = this.isCadre
      ? 0
      : this.roundToTwoDecimal((this.tauxHoraire * this.totalHs50 * 50) / 100)
  }
  calclulValHFerie() {
    this.valHFerie = this.isCadre
      ? 0
      : this.roundToTwoDecimal((this.tauxHoraire * this.totalHFerie * 100) / 100)
  }
  calculSalaireBrut() {
    this.salaireBrut = this.isCadre
      ? this.roundToTwoDecimal(
          this.salaireBase +
            this.totalPrimeEtAvantage +
            this.valHdim +
            this.valHFerie -
            this.totalDeduction,
        )
      : this.roundToTwoDecimal(
          this.salaireBase +
            this.valHsni130 +
            this.valHsni150 +
            this.valHsi130 +
            this.valHsi150 +
            this.valHdim +
            this.valHFerie +
            this.valHs30 +
            this.valHs50 +
            this.totalPrimeEtAvantage -
            this.totalDeduction,
        )
  }
  calculBaseCnaps() {
    if (this.salaireBrut >= this.plafondSME) {
      this.baseCnaps = this.plafondSME
    } else {
      this.baseCnaps = this.salaireBrut
    }
  }
  calculOmsi() {
    this.omsi = this.roundToTwoDecimal(this.salaireBrut * this.tauxOmsi)
  }
  calculateCnaps() {
    if (this.salaireBrut >= this.plafondSME) {
      this.cnaps = this.roundToTwoDecimal(this.plafondSME * this.tauxCnaps)
    } else {
      this.cnaps = this.roundToTwoDecimal(this.salaireBrut * this.tauxCnaps)
    }
  }
  calculateBaseIrsa() {
    this.baseIrsa = this.roundToTwoDecimal(
      this.salaireBrut - this.cnaps - this.omsi - this.hsni130 - this.hsni150,
    )
  }
  calculBaseIrsaArrondi() {
    this.baseIrsaArrondi = Math.floor(this.baseIrsa / 100) * 100
  }
  calculSalaireNet() {
    this.salaireNet = Math.round(this.baseIrsaArrondi - this.irsaAPayer)
  }
  calculSalaireNetAPayer() {
    this.salaireNetAPayer = this.salaireNet - this.avance
  }

  // Calcul Irsa a payer
  // ---------------------------------------------
  isTranche_0() {
    this.calculBaseIrsaArrondi()
    return this.baseIrsaArrondi <= 350000
  }
  isTranche_1() {
    this.calculBaseIrsaArrondi()
    return this.baseIrsaArrondi >= 350001 && this.baseIrsaArrondi <= 400000
  }
  isTranche_2() {
    return this.baseIrsaArrondi >= 400001 && this.baseIrsaArrondi <= 500000
  }
  isTranche_3() {
    return this.baseIrsaArrondi >= 500001 && this.baseIrsaArrondi <= 600000
  }

  calculIrsaTranche() {
    if (this.isTranche_1()) {
      this.irsaAPayer = (this.baseIrsaArrondi - 350000) * 0.05
    } else if (this.isTranche_2()) {
      this.irsaAPayer = 50000 * 0.05 + (this.baseIrsaArrondi - 400001) * 0.1
    } else if (this.isTranche_3()) {
      this.irsaAPayer = 50000 * 0.05 + 100000 * 0.1 + (this.baseIrsaArrondi - 500001) * 0.15
    } else {
      this.irsaAPayer =
        50000 * 0.05 + 100000 * 0.1 + 100000 * 0.15 + (this.baseIrsaArrondi - 600001) * 0.2
    }

    if (this.irsaAPayer < 2000) {
      this.irsaAPayer = 2000
    }
  }

  //   GETTERS
  getTotalHs30() {
    return this.totalHs30
  }
  getTotalHFerie() {
    return this.totalHFerie
  }
  getAvance() {
    return this.avance
  }

  getTauxCnaps() {
    return this.tauxCnaps
  }
  getTauxOmsi() {
    return this.tauxOmsi
  }
  getTotalDeduction() {
    return this.totalDeduction
  }
  getTotalPrimeEtAvantage() {
    return this.totalPrimeEtAvantage
  }
  getTotalHDim() {
    return this.totalHDim
  }
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

  getValHdim() {
    this.calculValHdim()
    return this.valHdim
  }
  getSalaireBrut() {
    this.calculSalaireBrut()
    return this.salaireBrut
  }

  getBaseCnaps() {
    this.calculBaseCnaps()
    return this.baseCnaps
  }

  getOmsi() {
    this.calculOmsi()
    return this.omsi
  }

  getValCnaps() {
    this.calculateCnaps()
    return this.cnaps
  }

  getBaseIrsa() {
    this.calculateBaseIrsa()
    return this.baseIrsa
  }

  getBaseIrsaArrondi() {
    this.calculBaseIrsaArrondi()
    return this.baseIrsaArrondi
  }
  getIrsaAPayer() {
    this.calculIrsaTranche()
    return Math.round(this.irsaAPayer)
  }

  getSalaireNet() {
    this.calculSalaireNet()
    return this.salaireNet
  }
  getSalaireNetAPayer() {
    this.calculSalaireNetAPayer()
    return this.salaireNetAPayer
  }
  getPlafondSME() {
    return this.plafondSME
  }
  getValHFerie() {
    this.calclulValHFerie()
    return this.valHFerie
  }
  getValHs30() {
    this.calculValHs30()
    return this.valHs30
  }
  getTotalHs50() {
    return this.totalHs50
  }
  getValHs50() {
    this.calculValHs50()
    return this.valHs50
  }
}
