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
  sommeEnLettre: null,
  salaireDeBase: null,
  hs30: null,
  hs50: null,
  salaireBrute: null,
  salaireNet: null,
  salaireNetAPayer: null,
  cotisation: {
    prime: {
      assuidite: null,
      excellence: null,
    },
    indemnite: {
      transport: null,
      autres: null,
    },
    avantages: {
      nature: {
        vehicule: null,
        logement: null,
      },
      autres: null,
    },
    rappel: null,
    aide: {
      logement: null,
    },
    aDeduire: {
      abscence: null,
      retard: null,
    },
    sociale: null,
    cnaps: null,
    irsa: null,
  },
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
