import { EnumBoolean, IEmploye } from './interfaceEmploye'

export interface IBulletinDePaieProps {
  validation: IValidationProps
  employeur: {
    nom: string
    adresse: string
    CP_et_Ville: string
    nif: string
    stat: string
    rcs: string
  }
  salarie?: IEmploye
  montantAllocationParEnfant?: number
  dateDeVirement: string | number
  salaireDeBase: number
  totalHn: number
  valAllocationEnfantsEmploye?: number
  totalHs: number
  totalHs130: number
  totalHs150: number
  hsni130: number
  hsni150: number
  hsi130: number
  hsi150: number
  totalHs30: number
  totalHs50: number
  totalHDim: number
  totalHFerie: number
  valHsni130: number
  valHsni150: number
  valHsi130: number
  valHsi150: number
  valHs30: number
  valHs50: number
  valHdim: number
  valHFerie: number
  totalPrimeEtAvantage: number
  totalDeduction: number
  tauxCnaps: number
  tauxOsie: number
  baseCnaps: number
  reduChargeFamil: number
  baseIrsa: number
  baseIrsaArrondi: number
  salaireBrut: number
  salaireNet: number
  osie: number
  salaireNetAPayer: number
  plafondSME: number
  irsaAPayer: number
  cnaps: number
  indemnites: IIndemniteProps
  totalIndemnite?: number
  avance?: number
  rappel?: number
  primeEtGratification?: IPrimeEtGratification
  totalPrimeEtGratification?: number
  deductions?: IDeductionProps
  avantages?: IAvantageProps
  totalAvantages?: number
  // ajoutSalaire?: []
  // retenuSalaire?: []
  // retenuSalaireBrut?: []
  // cotisations?: []
  totalHTravailEffectif?: number
  tableauHsHebdo?: []
  tableauHs130Hebdo?: []
  tableauHs150Hebdo?: []
}

export interface IIndemniteProps {
  transport?: number
  autresIndemnite?: number
}

export interface IPrimeEtGratification {
  assiduite?: number
  excellence?: number
}

export interface IAvantageProps {
  vehicule?: number
  logement?: number
  domestique?: number
  autresAvantages?: number
}

export interface IValidationProps {
  status: EnumBoolean
  date?: string
}

export interface IDeductionProps {
  absence?: number
  retard?: number
}
