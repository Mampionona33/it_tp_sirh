import { createSlice } from '@reduxjs/toolkit'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const initialState: IBulletinDePaieProps = {
  employeur: {
    nom: ' LA LIGNE SCANDINAVE',
    adresse: ' 2 RUE LIEUTNANT BERARD',
    CP_et_Ville: ' 501 - TOAMASINA',
    nif: ' 3000000581',
    stat: ' 50121 11 2003 0 00475',
    rcs: ' 2002B00608',
  },
  dateSelectionne: null,
  salarie: {},
  dateDeVirement: 0,
  salaireDeBase: 0,
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
  tauxCnaps: 0,
  baseCnaps: 0,
  avance: 0,
  reduChargeFamil: 0,
  baseIrsa: 0,
  baseIrsaArrondi: 0,
  salaireBrut: 0,
  salaireNet: 0,
  osie: 0,
  salaireNetAPayer: 0,
  plafondSME: 0,
  irsaAPayer: 0,
  cnaps: 0,
  rappel: 0,
  indemnites: {
    transport: 0,
    autres: 0,
  },
  primeEtGratification: {
    assiduite: 0,
    excellence: 0,
  },
  totalPrimeEtGratification: 0,
  deductions: {
    absence: 0,
    retard: 0,
  },
  totalIndemnits: 0,
  avantages: {
    domestique: 0,
    logement: 0,
    vehicule: 0,
    autres: 0,
  },
  totalAvantages: 0,
  ajoutSalaire: [],
  retenuSalaire: [],
  retenuSalaireBrut: [],
  cotisations: [],
}

const bulletinDePaieSlice = createSlice({
  name: 'bulletinDePaie',
  initialState,
  reducers: {
    setBulletinDePaie: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetBulletinDePaie: (state) => {
      return initialState
    },
  },
})

export const { setBulletinDePaie, resetBulletinDePaie } = bulletinDePaieSlice.actions

export default bulletinDePaieSlice.reducer
