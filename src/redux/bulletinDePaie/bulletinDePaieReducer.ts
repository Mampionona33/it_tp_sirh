import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import { EnumBoolean, EnumGenre } from '@src/interfaces/interfaceEmploye'

const initialState: IBulletinDePaieProps = {
  validation: {
    status: EnumBoolean.NON,
    date: null,
    day: null,
  },
  employeur: {
    nom: ' LA LIGNE SCANDINAVE',
    adresse: ' 2 RUE LIEUTNANT BERARD',
    CP_et_Ville: ' 501 - TOAMASINA',
    nif: ' 3000000581',
    stat: ' 50121 11 2003 0 00475',
    rcs: ' 2002B00608',
  },
  salarie: {
    id: null,
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    date_delivrance_cin: '',
    adresse: '',
    nom_pere: '',
    nom_mere: '',
    telephone: '',
    email: '',
    num_cin: '',
    genre: EnumGenre.MASCULIN,
    titre_poste: '',
    matricule: '',
    categorie: '',
    date_embauche: '',
    departement: '',
    lieu_travail: '',
    est_cadre: EnumBoolean.NON,
    travail_de_nuit: EnumBoolean.NON,
    salaire_de_base: 0,
    rib: '',
    mode_payement_salaire: '',
    num_cnaps: '',
    num_osie: '',
    actif: EnumBoolean.OUI,
    indemnites: {
      transport: 0,
      autres: 0,
    },
    avance: 0,
  },
  dateDeVirement: null,
  salaireDeBase: 0,
  valReductionChargeEnfants: 0,
  montanReductionChargeParEnfant: 2000,
  totalHn: 0,
  totalHs: 0,
  totalHs130: 0,
  totalHs150: 0,
  hsni130: 0,
  hsni150: 0,
  hsi130: 0,
  hsi150: 0,
  totalHs30: 0,
  totalHs50: 0,
  totalHDim: 0,
  totalHFerie: 0,
  valHsni130: 0,
  valHsni150: 0,
  valHsi130: 0,
  valHsi150: 0,
  valHs30: 0,
  valHs50: 0,
  valHdim: 0,
  valHFerie: 0,
  totalPrimeEtAvantage: 0,
  totalDeduction: 0,
  tauxCnaps: 0.01,
  tauxOsie: 0.01,
  baseCnaps: 0,
  avance: {
    quinzaine: 0,
    speciale: 0,
  },
  reduChargeFamil: 0,
  baseIrsa: 0,
  baseIrsaArrondi: 0,
  salaireBrut: 0,
  salaireNet: 0,
  osie: 0,
  salaireNetAPayer: 0,
  valMinIrsaParTranche: 3000,
  plafondSME: 1910400,
  irsaAPayer: 0,
  cnaps: 0,
  rappel: 0,
  indemnites: {
    transport: 0,
    autresIndemnite: 0,
  },
  totalIndemnite: 0,
  primeEtGratification: {
    assiduite: 0,
    excellence: 0,
  },
  totalPrimeEtGratification: 0,
  deductions: {
    absence: 0,
    retard: 0,
  },
  avantages: {
    domestique: 0,
    logement: 0,
    vehicule: 0,
    autresAvantages: 0,
  },
  totalAvantages: 0,
}

const bulletinDePaieSlice = createSlice({
  name: 'bulletinDePaie',
  initialState,
  reducers: {
    setBulletinDePaie: (state, action: PayloadAction<IBulletinDePaieProps>) => {
      return { ...state, ...action.payload }
    },
    resetBulletinDePaie: (state) => {
      return initialState
    },
  },
})

export const { setBulletinDePaie, resetBulletinDePaie } = bulletinDePaieSlice.actions

export default bulletinDePaieSlice.reducer
