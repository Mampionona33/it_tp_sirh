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

  indemnite: [
    {
      label: "Prime d'assuicidité",
      base: 0,
    },
    {
      label: "Prime d'excellence",
      base: 0,
    },
    {
      label: 'Indemnité de transport',
      base: 0,
    },
    {
      label: 'Avantages en nature (Logement)',
      base: 0,
    },
    {
      label: 'Avantages en nature (Véhicule)',
      base: 0,
    },
    {
      label: 'Autres indemnités',
      base: 0,
    },
    {
      label: 'Autres avantages',
      base: 0,
    },
    {
      label: 'Rappel',
      base: 0,
    },
  ],
  retenue: [],
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
