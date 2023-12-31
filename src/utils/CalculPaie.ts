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
  private valHs50: number
  private baseCnaps: number
  private cnaps: number
  private salaireNetAPayer: number
  private salaireNet: number
  private valHsni150: number
  private valHFerie: number
  private valHs30: number
  constructor() {
    this.valHsni130 = 0
    this.plafondSME = 1910400
    this.tauxHoraire = 0
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
  getSalaireBrut(): number {
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
    this.valHsni130 = this.roundToTwoDecimal((this.tauxHoraire * this.hsni130 * 130) / 100)
  }
  getValHsni130(): number {
    this.calculateValHsni130()
    return this.valHsni130
  }

  setValHsi150(valHsi150: number): void {
    this.valHsi150 = valHsi150
  }
  getValHsi150(): number {
    return this.valHsi150
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
