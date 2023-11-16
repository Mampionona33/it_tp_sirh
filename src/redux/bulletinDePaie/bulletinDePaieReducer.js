const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  employeur: {},
  salarie: {},
  dateDeVirement: null,
  salaireDeBase: null,
  hs30: null,
  hs50: null,
  hsni130: null,
  hsni150: null,
  tauxCnaps: null,
  baseCnaps: null,
  baseIrsa: null,
  salaireBrute: null,
  salaireNet: null,
  omsi: null,
  salaireNetAPayer: null,
  plafondSME: null,
  irsa: null,
  cnaps: null,
  plafondSME: null,
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
  },
})

export const { setBulletinDePaie } = bulletinDePaieSlice.actions

export default bulletinDePaieSlice.reducer
