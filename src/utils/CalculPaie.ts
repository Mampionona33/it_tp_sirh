class CalculPaie {
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
  private totalHFerie: number
  private valHsi130: number
  private valHsni130: number
  private valHsi150: number
  private valHdim: number
  private avantageNature: number
  private valHs50: number
  private baseCnaps: number
  private cnaps: number
  private salaireNetAPayer: number
  private salaireNet: number
  private valHsni150: number
  private valHFerie: number
  private valHs30: number
  constructor() {
    this.plafondSME = 1910400
    this.tauxHoraire = 0
    this.valHsni130 = 0
    this.valHsni150 = 0
    this.valHsi130 = 0
    this.valHsi150 = 0
    this.valHs30 = 0
    this.valHs50 = 0
    this.valHdim = 0
    this.valHFerie = 0
    this.salaireBrut = 0
    this.avantageNature = 0
    this.salaireBase = 0
    this.totalDeduction = 0
    this.totalPrimeEtAvantage = 0
  }

  setAvantageNature(avantageNature: number): void {
    this.avantageNature = avantageNature
  }
  getAvantageNature(): number {
    return this.avantageNature
  }

  public setTotalHs50(totalHs50: number): void {
    this.totalHs50 = totalHs50
  }
  public getTotalHs50(): number {
    return this.totalHs50
  }

  setTotalHs30(totalHs30: number): void {
    this.totalHs30 = totalHs30
  }
  getTotalHs30(): number {
    return this.totalHs30
  }

  setTotalHFerie(totalHFerie: number): void {
    this.totalHFerie = totalHFerie
  }
  getTotalHFerie(): number {
    return this.totalHFerie
  }

  setAvance(avanace: number): void {
    this.avance = avanace
  }
  getAvance(): number {
    return this.avance
  }

  setIrsaAPayer(irsaAPayer: number): void {
    this.irsaAPayer = irsaAPayer
  }
  getIrsaAPayer(): number {
    return this.irsaAPayer
  }

  setBaseIrsaArrondi(baseIrsaArrondi: number): void {
    this.baseIrsaArrondi = baseIrsaArrondi
  }
  getBaseIrsaArrondi(): number {
    return this.baseIrsaArrondi
  }

  setBaseIrsa(baseIrsa: number): void {
    this.baseIrsa = baseIrsa
  }
  getBaseIrsa(): number {
    return this.baseIrsa
  }

  setTauxCnaps(tauxCnaps: number): void {
    this.tauxCnaps = tauxCnaps
  }
  getTauxCnaps(): number {
    return this.tauxCnaps
  }

  setTauxOsie(tauxOsie: number): void {
    this.tauxOsie = tauxOsie
  }
  getTauxOsie(): number {
    return this.tauxOsie
  }

  setSalaireBrut(salaireBrut: number): void {
    this.salaireBrut = salaireBrut
  }
  private calculateSalaireBrut(): void {
    if (this.salaireBase) {
      this.salaireBrut = this.est_cadre
        ? this.roundToTwoDecimal(this.salaireBase + this.valHdim + this.valHFerie)
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
  }
  getSalaireBrut(): number {
    this.calculateSalaireBrut()
    return this.salaireBrut
  }

  setTotalDeduction(totalDeduction: number): void {
    this.totalDeduction = totalDeduction
  }
  getTotalDeduction(): number {
    return this.totalDeduction
  }

  setTotalPrimeEtAvantage(totalPrimeEtAvantage: number): void {
    this.totalPrimeEtAvantage = totalPrimeEtAvantage
  }
  getTotalPrimeEtAvantage(): number {
    return this.totalPrimeEtAvantage
  }

  setTotalHDim(totalHDim: number): void {
    this.totalHDim = totalHDim
  }
  getTotalHDim(): number {
    return this.totalHDim
  }

  setHsi150(hsi150: number): void {
    this.hsi150 = hsi150
  }
  getHsi150(): number {
    return this.hsi150
  }

  setHsi130(hsi130: number): void {
    this.hsi130 = hsi130
  }
  getHsi130(): number {
    return this.hsi130
  }

  setHsni150(hsni150: number): void {
    this.hsni150 = hsni150
  }
  getHsni150(): number {
    return this.hsni150
  }

  setTauxHoraire(tauxHoraire: number): void {
    this.tauxHoraire = tauxHoraire
  }
  getTauxHoraire(): number {
    return this.tauxHoraire
  }

  setEstCadre(est_cadre: boolean): void {
    this.est_cadre = est_cadre
  }
  getEstCadre(): boolean {
    return this.est_cadre
  }

  setPlafondSME(plafondSME: number): void {
    this.plafondSME = plafondSME
  }
  getPlafondSME(): number {
    return this.plafondSME
  }

  setSalaireBase(salaireBase: number): void {
    this.salaireBase = salaireBase
    this.tauxHoraire = this.salaireBase / 173.33
  }
  getSalaireBase(): number {
    return this.salaireBase
  }

  setValHsni130(valHsni130: number): void {
    this.valHsni130 = valHsni130
  }
  private calculateValHsni130(): void {
    if (this.hsni130 > 0) {
      this.valHsni130 = this.roundToTwoDecimal((this.tauxHoraire * this.hsni130 * 130) / 100)
    }
  }
  getValHsni130(): number {
    this.calculateValHsni130()
    return this.valHsni130
  }

  private calculateValHsni150(): void {
    if (this.hsni150 > 0) {
      this.valHsni150 = this.roundToTwoDecimal((this.tauxHoraire * this.hsni150 * 150) / 100)
    }
  }
  public getValHsni150(): number {
    this.calculateValHsni150()
    return this.valHsni150
  }

  private calculateValHsi130(): void {
    if (this.hsi130 > 0) {
      this.valHsi130 = this.roundToTwoDecimal((this.tauxHoraire * this.hsi130 * 130) / 100)
    }
  }
  public getValHsi130(): number {
    this.calculateValHsi130()
    return this.valHsi130
  }

  setValHsi150(valHsi150: number): void {
    this.valHsi150 = valHsi150
  }
  private calculateValHsi150(): void {
    if (this.hsi150 > 0) {
      this.valHsi150 = this.roundToTwoDecimal((this.tauxHoraire * this.hsi150 * 150) / 100)
    }
  }
  getValHsi150(): number {
    this.calculateValHsi150()
    return this.valHsi150
  }

  private calculateValHs30(): void {
    if (this.totalHs30) {
      this.valHs30 = this.roundToTwoDecimal((this.tauxHoraire * this.totalHs30 * 30) / 100)
    }
  }
  public getValHs30(): number {
    this.calculateValHs30()
    return this.valHs30
  }

  private calculValHs50(): void {
    if (this.totalHs50) {
      this.valHs50 = this.roundToTwoDecimal((this.tauxHoraire * this.totalHs50 * 50) / 100)
    }
  }
  public getValHs50(): number {
    this.calculValHs50()
    return this.valHs50
  }

  private calculValHdim(): void {
    if (this.totalHDim) {
      this.valHdim = this.roundToTwoDecimal((this.tauxHoraire * this.totalHDim * 40) / 100)
    }
  }
  public getValHdim(): number {
    this.calculValHdim()
    return this.valHdim
  }

  private calculValHFerie(): void {
    if (this.totalHFerie) {
      this.valHFerie = this.roundToTwoDecimal((this.tauxHoraire * this.totalHFerie * 100) / 100)
    }
  }
  public getValHFerie(): number {
    this.calculValHFerie()
    return this.valHFerie
  }

  setHsni130(hsni130: number): void {
    this.hsni130 = hsni130
  }
  getHsni130(): number {
    return this.hsni130
  }

  //   UTILITYES
  private roundToTwoDecimal(val) {
    return Math.round(val * 100) / 100
  }
  private arrondirNombreDecimales(nombre, decimales) {
    const facteur = Math.pow(10, decimales)
    return Math.round(nombre * facteur) / facteur
  }
  private calculTauxHoraire(): void {
    this.tauxHoraire = this.salaireBrut / 173.33
  }

  //   CALCULATORS
}

const calculPaie = new CalculPaie()

export default calculPaie
