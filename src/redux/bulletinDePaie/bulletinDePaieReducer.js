const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  employeur: {
    nom: 'LA LIGNE SCANDINAVE',
    adresse: '2 RUE LIEUTNANT BERARD',
    CP_et_Ville: '2 RUE LIEUTNANT BERARD',
    nif: '3000000581',
    stat: '50121 11 2003 0 00475',
    rcs: '2002B00608',
  },
  salarie: {},
  dateDeVirement: 0,
  salaireDeBase: 0,
  totalHn: 0,
  totalHs: 0,
  totalHs130: 0,
  totalHs150: 0,
  hsni130: 0,
  hsni150: 0,
  totalHs30: 0,
  totalHs50: 0,
  totalHDim: 0,
  totalHFerier: 0,
  valeurHsni130: 0,
  valeurHsni150: 0,
  valeurHs30: 0,
  valeurHs50: 0,
  totalPrimeEtAvantage: 0,
  totalDeduction: 0,
  tauxCnaps: 0,
  baseCnaps: 0,
  avance: 0,
  reduChargeFamil: 0,
  baseIrsa: 0,
  irsaArrondi: 0,
  salaireBrut: 0,
  salaireNet: 0,
  omsi: 0,
  salaireNetAPayer: 0,
  plafondSME: 0,
  irsaAPayer: 0,
  cnaps: 0,
  ajoutSalaire: [],
  retenuSalaire: [],
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
