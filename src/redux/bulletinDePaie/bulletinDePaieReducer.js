const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  employeur: {
    nom: null,
    adresse: null,
    cp: null,
    ville: null,
    nif: null,
    stat: null,
    rcs: null,
  },
  salarie: {
    nom: null,
    prenom: null,
    fonction: null,
    matricule: null,
    cat: null,
    mois: null,
  },
  dateDeVirement: null,
  salaireDeBase: null,
  hs30: null,
  hs50: null,
  salaireBrute: null,
  salaireNet: null,
  salaireNetAPayer: null,
  irsa: null,

  indemnite: [],
  retenue: [
    {
      label: 'cnaps',
      base: 0,
    },
    {
      label: 'organisationSanit',
      base: 0,
    },
  ],
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
