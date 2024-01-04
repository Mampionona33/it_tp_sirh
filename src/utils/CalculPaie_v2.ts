import { IHeuresEmploye } from '@src/interfaces/interfaceHeuresEmploye'
import { es } from 'date-fns/locale'

export interface CalculateSalaireBrutParams {
  valHsni130: number
  valHsni150: number
  valHsi130: number
  valHsi150: number
  valHs30: number
  valHs50: number
  valHdim: number
  valHFerie: number
  totalPrimeEtGratification: number
  totalDeduction: number
  rappel: number
}
export interface calculateCnapsParams {
  salaireBrut: number
  plafondSME: number
  taux: number
}
export interface calculcnapsParams {
  plafondSME: number
  taux: number
}

export interface calculOsieParams {
  taux: number
}

export interface calculBaseIrsaParams {
  cnaps: number
  osie: number
  valHsni130: number
  valHsni150: number
  salaireBrute?: number
}

class CalculPaie_v2 {
  private salaireBase: number
  private plafondSME: number
  private est_cadre: boolean
  private tauxHoraire: number
  private rappel: number
  private totalPrimeEtGratification: number
  private totalDeduction: number
  private valHsni130: number
  private valHsni150: number
  private valHsi130: number
  private valHsi150: number
  private valHs30: number
  private valHs50: number
  private valHdim: number
  private valHFerie: number
  private salaireBrut: number

  constructor() {
    this.salaireBase = 0
    this.tauxHoraire = 173.33
    this.est_cadre = false
    this.plafondSME = 1910400
    this.salaireBrut = 0
  }

  setSalaireBrut(salaireBrut: number): void {
    this.salaireBrut = salaireBrut
  }
  getSalaireBrut(): number {
    return this.salaireBrut
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

  public calculateValHsi150(hsi150: number): number {
    let valHsi150 = 0
    let tauxHoraire = this.calculateTauxHoraire()

    valHsi150 = this.roundToTwoDecimal((tauxHoraire * hsi150 * 150) / 100)

    return this.est_cadre ? 0 : valHsi150
  }

  public calculateValHs30(hs30: number): number {
    let valHs30 = 0
    let tauxHoraire = this.calculateTauxHoraire()
    valHs30 = this.roundToTwoDecimal((tauxHoraire * hs30 * 30) / 100)
    return this.est_cadre ? 0 : valHs30
  }

  public calculateValHdim(totalHdim: number): number {
    let valHdim = 0
    let tauxHoraire = this.calculateTauxHoraire()

    valHdim = this.roundToTwoDecimal((tauxHoraire * totalHdim * 40) / 100)

    return this.est_cadre ? 0 : valHdim
  }

  public calculateValHs50(totalHs50: number): number {
    let valHs50 = 0
    let tauxHoraire = this.calculateTauxHoraire()
    valHs50 = this.est_cadre ? 0 : this.roundToTwoDecimal((tauxHoraire * totalHs50 * 50) / 100)

    return valHs50
  }

  public calculateValHFerie(totalHFerie: number): number {
    let valHFerie = 0
    let tauxHoraire = this.calculateTauxHoraire()

    valHFerie = this.est_cadre ? 0 : this.roundToTwoDecimal((tauxHoraire * totalHFerie * 100) / 100)
    return valHFerie
  }

  /**
   * Calculates the gross salary based on various input values.
   *
   * @param {CalculateSalaireBrutParams} params - Object containing the input values.
   * @return {number} The calculated gross salary.
   */
  public calculateSalaireBrut(params: CalculateSalaireBrutParams): number {
    let salaireBrut = 0

    if (this.est_cadre) {
      salaireBrut =
        this.salaireBase + params.rappel + params.totalPrimeEtGratification - params.totalDeduction
    } else {
      salaireBrut =
        this.salaireBase +
        params.rappel +
        params.valHsni130 +
        params.valHsni150 +
        params.valHsi130 +
        params.valHsi150 +
        params.valHs30 +
        params.valHs50 +
        params.valHdim +
        params.valHFerie +
        params.totalPrimeEtGratification -
        params.totalDeduction
    }

    return salaireBrut
  }

  public calulateCnaps(params: calculcnapsParams): number {
    let cnaps = 0
    if (this.salaireBrut >= params.plafondSME) {
      cnaps = this.roundToTwoDecimal(params.plafondSME * params.taux)
    } else {
      cnaps = this.roundToTwoDecimal(this.salaireBrut * params.taux)
    }
    return cnaps
  }

  public calculOsie(params: calculOsieParams): number {
    return this.roundToTwoDecimal(this.salaireBrut * params.taux)
  }

  public calculBaseIrsa(params: calculBaseIrsaParams): number {
    console.log(this.salaireBrut, params.cnaps, params.osie, params.valHsni130, params.valHsni150)

    let baseIrsa = 0

    if (params.salaireBrute) {
      baseIrsa = this.roundToTwoDecimal(
        params.salaireBrute - params.cnaps - params.osie - params.valHsni130 - params.valHsni150,
      )
      baseIrsa = Math.max(baseIrsa, 0)
    } else if (this.salaireBrut) {
      baseIrsa = this.roundToTwoDecimal(
        this.salaireBrut - params.cnaps - params.osie - params.valHsni130 - params.valHsni150,
      )
      baseIrsa = Math.max(baseIrsa, 0)
    }

    return baseIrsa
  }

  public calculateBaseIrsaArrondi(baseIrsa: number): number {
    return Math.floor(baseIrsa / 100) * 100
  }

  // Calcul IRSA
  private isTranche_1(baseIrsaArrondi: number): boolean {
    return baseIrsaArrondi >= 350001 && baseIrsaArrondi <= 400000
  }
  private isTranche_2(baseIrsaArrondi: number): boolean {
    return baseIrsaArrondi >= 400001 && baseIrsaArrondi <= 500000
  }
  private isTranche_3(baseIrsaArrondi: number): boolean {
    return baseIrsaArrondi >= 500001 && baseIrsaArrondi <= 600000
  }
  public calculateIrsaParTranche(baseIrsaArrondi: number): number {
    let irsaParTranche = 0
    if (this.isTranche_1(baseIrsaArrondi)) {
      irsaParTranche = (baseIrsaArrondi - 350000) * 0.05
    } else if (this.isTranche_2(baseIrsaArrondi)) {
      irsaParTranche = 50000 * 0.05 + (baseIrsaArrondi - 400001) * 0.1
    } else if (this.isTranche_3(baseIrsaArrondi)) {
      irsaParTranche = 50000 * 0.05 + 100000 * 0.1 + (baseIrsaArrondi - 500001) * 0.15
    } else {
      irsaParTranche =
        50000 * 0.05 + 100000 * 0.1 + 100000 * 0.15 + (baseIrsaArrondi - 600001) * 0.2
    }
    if (irsaParTranche < 2000) {
      irsaParTranche = 2000
    }
    return irsaParTranche
  }

  public caluclateSalaireNet(irsaAPayer: number): number {
    return this.roundToTwoDecimal(this.salaireBrut - irsaAPayer)
  }

  //   UTILITYES
  private roundToTwoDecimal(val) {
    return Math.round(val * 100) / 100
  }
}

export default CalculPaie_v2
