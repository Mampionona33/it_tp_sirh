const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  employeur: {},
  salarie: {},
  dateDeVirement: null,
  salaireDeBase: null,
  hs30: null,
  hs50: null,
  salaireBrute: null,
  salaireNet: null,
  salaireNetAPayer: null,
  irsa: null,
  plafondSME: null,
  ajoutSalaire: [],
  retenuSalaire: [],
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
