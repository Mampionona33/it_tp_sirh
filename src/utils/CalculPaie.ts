import { store } from '@src/redux/store'
import calculHeuresEmploye from './CalculHeuresEmploye'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'

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
  private osie: number
  private salaireNetAPayer: number
  private salaireNet: number
  private valHsni150: number
  private valHFerie: number
  private valHs30: number
  private totalIndemnite: number
  private rappel: number
  private totalPrimeEtGratification: number
  private totalAvantages: number
  constructor(salaireDeBase) {
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
    this.salaireBase = salaireDeBase || 0
    this.totalDeduction = 0
    this.totalPrimeEtAvantage = 0
    this.baseCnaps = 0
    this.cnaps = 0
    this.tauxCnaps = 0.01
    this.tauxOsie = 0.01
    this.osie = 0
    this.baseIrsa = 0
    this.baseIrsaArrondi = 0
    this.irsaAPayer = 0
    this.salaireNet = 0
    this.totalIndemnite = 0
    this.rappel = 0
    this.totalPrimeEtGratification = 0
    this.totalAvantages = 0
    this.avance = 0
    this.calculTauxHoraire()
  }

  setTotalAvantages(totalAvantages: number): void {
    this.totalAvantages = totalAvantages
  }
  getTotalAvantages(): number {
    return this.totalAvantages
  }

  setTotalPrimeEtGratification(totalPrimeEtGratification: number): void {
    this.totalPrimeEtGratification = totalPrimeEtGratification
  }
  getTotalPrimeEtGratification(): number {
    return this.totalPrimeEtGratification
  }

  setRappel(rappel: number): void {
    this.rappel = rappel
  }
  getRappel(): number {
    return this.rappel
  }

  setTotalIndemnite(totalIndemnite: number): void {
    this.totalIndemnite = totalIndemnite
  }
  gettotalIndemnite(): number {
    return this.totalIndemnite
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
        ? this.roundToTwoDecimal(
            this.salaireBase +
              this.valHdim +
              this.valHFerie +
              this.rappel +
              this.totalPrimeEtGratification -
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
              this.rappel +
              this.totalPrimeEtGratification -
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
    if (!this.est_cadre && this.hsni130 > 0) {
      this.valHsni130 = this.roundToTwoDecimal((this.tauxHoraire * this.hsni130 * 130) / 100)
    }
  }
  getValHsni130(): number {
    this.calculateValHsni130()
    return this.valHsni130
  }

  private calculateValHsni150(): void {
    if (!this.est_cadre && this.hsni150 > 0) {
      this.valHsni150 = this.roundToTwoDecimal((this.tauxHoraire * this.hsni150 * 150) / 100)
    }
  }
  public getValHsni150(): number {
    this.calculateValHsni150()
    return this.valHsni150
  }

  private calculateValHsi130(): void {
    if (!this.est_cadre && this.hsi130 > 0) {
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
    if (!this.est_cadre && this.hsi150 > 0) {
      this.valHsi150 = this.roundToTwoDecimal((this.tauxHoraire * this.hsi150 * 150) / 100)
    }
  }
  getValHsi150(): number {
    this.calculateValHsi150()
    return this.valHsi150
  }

  private calculateValHs30(): void {
    if (!this.est_cadre && this.totalHs30) {
      this.valHs30 = this.roundToTwoDecimal((this.tauxHoraire * this.totalHs30 * 30) / 100)
    }
  }
  public getValHs30(): number {
    this.calculateValHs30()
    return this.valHs30
  }

  private calculateValHs50(): void {
    if (!this.est_cadre && this.totalHs50) {
      this.valHs50 = this.roundToTwoDecimal((this.tauxHoraire * this.totalHs50 * 50) / 100)
    }
  }
  public getValHs50(): number {
    this.calculateValHs50()
    return this.valHs50
  }

  private calculValHdim(): void {
    if (!this.est_cadre && this.totalHDim) {
      this.valHdim = this.roundToTwoDecimal((this.tauxHoraire * this.totalHDim * 40) / 100)
    }
  }
  public getValHdim(): number {
    this.calculValHdim()
    return this.valHdim
  }

  private calculValHFerie(): void {
    if (!this.est_cadre && this.totalHFerie) {
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

  private calculBaseCnaps(): void {
    if (this.salaireBrut >= this.plafondSME) {
      this.baseCnaps = this.plafondSME
    } else {
      this.baseCnaps = this.salaireBrut
    }
  }
  getBaseCnaps(): number {
    this.salaireBrut === 0 && this.calculateSalaireBrut()
    this.baseCnaps === 0 && this.calculBaseCnaps()
    return this.baseCnaps
  }

  setCnaps(cnaps): void {
    this.cnaps = cnaps
  }
  private isSalaireBrutSupPlfondSME(): boolean {
    return this.salaireBrut >= this.plafondSME
  }

  private recalculateSalaieBrut(): void {
    this.valHsni130 === 0 && this.calculateValHsni130()
    this.valHsni150 === 0 && this.calculateValHsni150()
    this.valHsi130 === 0 && this.calculateValHsi130()
    this.valHsi150 === 0 && this.calculateValHsi150()
    this.valHs30 === 0 && this.calculateValHs30()
    this.valHs50 === 0 && this.calculateValHs50()
    this.valHFerie === 0 && this.calculValHFerie()
    this.valHdim === 0 && this.calculValHdim()
    this.salaireBrut === 0 && this.calculateSalaireBrut()
  }
  private calculateCnaps(): void {
    this.recalculateSalaieBrut()
    if (this.isSalaireBrutSupPlfondSME()) {
      this.cnaps = this.roundToTwoDecimal(this.plafondSME * this.tauxCnaps)
    } else {
      this.cnaps = this.roundToTwoDecimal(this.salaireBrut * this.tauxCnaps)
    }
  }
  getCnaps(): number {
    this.calculateCnaps()
    return this.cnaps
  }

  private calculateOsie(): void {
    this.recalculateSalaieBrut()
    this.osie = this.roundToTwoDecimal(this.salaireBrut * this.tauxOsie)
  }
  setOsie(osie): void {
    this.osie = osie
  }
  getOsie(): number {
    this.osie === 0 && this.calculateOsie()
    return this.osie
  }

  setBaseIrsa(baseIrsa: number): void {
    this.baseIrsa = baseIrsa
  }
  private calculateBaseIrsa(): void {
    this.recalculateSalaieBrut()
    this.baseIrsa = this.roundToTwoDecimal(
      this.salaireBrut - this.cnaps - this.osie - this.hsni130 - this.hsni150,
    )
  }
  getBaseIrsa(): number {
    this.calculateBaseIrsa()
    return this.baseIrsa
  }

  setBaseIrsaArrondi(baseIrsaArrondi: number): void {
    this.baseIrsaArrondi = baseIrsaArrondi
  }
  private calculateBaseIrsaArrondi(): void {
    this.recalculateSalaieBrut()
    this.calculateBaseIrsa()
    this.baseIrsaArrondi = Math.floor(this.baseIrsa / 100) * 100
  }
  getBaseIrsaArrondi(): number {
    this.calculateBaseIrsaArrondi()
    return this.baseIrsaArrondi
  }
  // Calcul Irsa a payer
  setIrsaAPayer(irsaAPayer: number): void {
    this.irsaAPayer = irsaAPayer
  }
  private isTranche_1(): boolean {
    this.calculateBaseIrsaArrondi()
    return this.baseIrsaArrondi >= 350001 && this.baseIrsaArrondi <= 400000
  }
  private isTranche_2(): boolean {
    this.calculateBaseIrsaArrondi()
    return this.baseIrsaArrondi >= 400001 && this.baseIrsaArrondi <= 500000
  }
  private isTranche_3(): boolean {
    this.calculateBaseIrsaArrondi()
    return this.baseIrsaArrondi >= 500001 && this.baseIrsaArrondi <= 600000
  }
  private calculateIrsaAPayer(): void {
    if (this.isTranche_1) {
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
  getIrsaAPayer(): number {
    this.calculateIrsaAPayer()
    return this.irsaAPayer
  }
  // Calcul Irsa a payer
  // ---------------------------------------------
  setSalaireNet(salaireNet: number): void {
    this.salaireNet = salaireNet
  }
  private calculateSalaireNet(): void {
    this.recalculateSalaieBrut()
    this.calculateIrsaAPayer()
    this.salaireNet = this.roundToTwoDecimal(this.salaireBrut - this.irsaAPayer)
  }
  getSalaireNet(): number {
    this.calculateSalaireNet()
    return this.salaireNet
  }

  setSalaireNetAPayer(salaireNetAPayer: number): void {
    this.salaireNetAPayer = salaireNetAPayer
  }
  private calculateSalaireNetAPayer(): void {
    this.recalculateSalaieBrut()
    this.calculateSalaireNet()
    this.salaireNetAPayer = this.roundToTwoDecimal(
      this.salaireNet + this.totalIndemnite + this.avance + this.totalAvantages,
    )
  }
  public getSalaireNetAPayer(): number {
    this.calculateSalaireNetAPayer()
    return this.salaireNetAPayer
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
    if (this.salaireBase > 0) {
      this.tauxHoraire = this.salaireBase / 173.33
    }
  }

  private updateReduxStore(): void {
    const bulletinDePaieData = {
      salaireBrut: this.getSalaireBrut(),
      salaireNet: this.getSalaireNet(),
      salaireNetAPayer: this.getSalaireNetAPayer(),
      baseIrsa: this.getBaseIrsa(),
      baseIrsaArrondi: this.getBaseIrsaArrondi(),
      irsaAPayer: this.getIrsaAPayer(),
      cnaps: this.getCnaps(),
      osie: this.getOsie(),
      totalHDim: this.getTotalHDim(),
      totalHFerie: this.getTotalHFerie(),
      totalHs30: this.getTotalHs30(),
      totalHs50: this.getTotalHs50(),
      hsi130: this.getHsi130(),
      hsi150: this.getHsi150(),
      hsni130: this.getHsni130(),
      hsni150: this.getHsni150(),
      valHsni130: this.getValHsni130(),
      valHsni150: this.getValHsni150(),
      valHsi130: this.getValHsi130(),
      valHsi150: this.getValHsi150(),
      valHs30: this.getValHs30(),
      valHs50: this.getValHs50(),
      valHdim: this.getValHdim(),
      valHFerie: this.getValHFerie(),
    }
    // Dispatchez ces valeurs vers le Redux store
    store.dispatch(setBulletinDePaie(bulletinDePaieData))
  }
  public calculateAndDispatchToRedux(): void {
    // Mise à jour du Redux store
    this.updateReduxStore()
  }
}

// const totalHn = calculHeuresEmploye.getTotalHnormale()
// const totalHs = calculHeuresEmploye.getTotalHsDuMois()
// const totalHs130 = calculHeuresEmploye.getTotalHs130()
// const totalHs150 = calculHeuresEmploye.getTotalHs150()
// const totalHs30 = calculHeuresEmploye.getTotalTravailDeNuit30()
// const totalHs50 = calculHeuresEmploye.getTotalTravailDeNuit50()
// const totalHDim = calculHeuresEmploye.getTotalHdim()
// const hsni130 = calculHeuresEmploye.getHsni130()
// const hsni150 = calculHeuresEmploye.getHsni150()
// const hsi130 = calculHeuresEmploye.getHsi130()
// const hsi150 = calculHeuresEmploye.getHsi150()
// const totalHFerie = calculHeuresEmploye.getTotalHFerie()

// const salaireBase = store.getState().bulletinDePaie.salaireDeBase
// const totalIndemnite = store.getState().bulletinDePaie.totalIndemnite

// const calculPaie = new CalculPaie(salaireBase)
// calculPaie.setHsni130(hsni130)
// calculPaie.setTotalIndemnite(totalIndemnite)
// calculPaie.setHsni150(hsni150)
// calculPaie.setHsi130(hsi130)
// calculPaie.setHsi150(hsi150)
// calculPaie.setTotalHs30(totalHs30)
// calculPaie.setTotalHs50(totalHs50)
// calculPaie.setTotalHDim(totalHDim)
// calculPaie.setTotalHFerie(totalHFerie)

// const cnaps = calculPaie.getCnaps()
// const osie = calculPaie.getOsie()
// const valHsni130 = calculPaie.getValHsni130()
// const valHsni150 = calculPaie.getValHsni150()
// const valHsi130 = calculPaie.getValHsi130()
// const valHsi150 = calculPaie.getValHsi150()
// const valHs30 = calculPaie.getValHs30()
// const valHs50 = calculPaie.getValHs50()
// const valHdim = calculPaie.getValHdim()
// const valHFerie = calculPaie.getValHFerie()
// const salaireBrut = calculPaie.getSalaireBrut()
// const baseIrsa = calculPaie.getBaseIrsa()
// const baseIrsaArrondi = calculPaie.getBaseIrsaArrondi()
// const irsaAPayer = calculPaie.getIrsaAPayer()
// const salaireNet = calculPaie.getSalaireNet()
// const salaireNetAPayer = calculPaie.getSalaireNetAPayer()

const appStore = store

// appStore.dispatch(
//   setBulletinDePaie({
//     salaireBrut: salaireBrut,
//     salaireNet: salaireNet,
//     salaireNetAPayer: salaireNetAPayer,
//     baseIrsa: baseIrsa,
//     baseIrsaArrondi: baseIrsaArrondi,
//     irsaAPayer: irsaAPayer,
//     cnaps: cnaps,
//     osie: osie,
//     totalHDim: totalHDim,
//     totalHFerie: totalHFerie,
//     totalHs30: totalHs30,
//     totalHs50: totalHs50,
//     hsi130: hsi130,
//     hsi150: hsi150,
//     hsni130: hsni130,
//     hsni150: hsni150,
//     valHsni130: valHsni130,
//     valHsni150: valHsni150,
//     valHsi130: valHsi130,
//     valHsi150: valHsi150,
//     valHs30: valHs30,
//     valHs50: valHs50,
//     valHdim: valHdim,
//     valHFerie: valHFerie,
//   }),
// )
export default CalculPaie
