const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  employeur: {},
  salarie: {},
  dateDeVirement: null,
  salaireDeBase: null,
  totalHn: null,
  totalHs: null,
  totalHs130: null,
  totalHs150: null,
  hsni130: null,
  hsni150: null,
  totalHs30: null,
  totalHs50: null,
  totalHDim: null,
  totalHFerier: null,
  valeurHsni130: null,
  valeurHsni150: null,
  valeurHs30: null,
  valeurHs50: null,
  totalPrimeEtAvantage: null,
  totalDeduction: null,
  tauxCnaps: null,
  baseCnaps: null,
  avance: null,
  reduChargeFamil: null,
  baseIrsa: null,
  irsaArrondi: null,
  salaireBrut: null,
  salaireNet: null,
  omsi: null,
  salaireNetAPayer: null,
  plafondSME: null,
  irsaAPayer: null,
  cnaps: null,
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
