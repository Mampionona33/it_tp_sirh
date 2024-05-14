import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employee: {
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    adresse: '',
    tel: '',
    email: '',
    num_cin: '',
    genre: '',
    contact_urgence: [],
    conjoint: {},
    enfant: [],
    titre_poste: '',
    matricule: '',
    categorie: '',
    date_embauche: '',
    departement: '',
    lieu_travail: '',
    est_cadre: '',
    travail_de_nuit: '',
    salaire_de_base: '',
    rib: '',
    mode_payement_salaire: '',
    num_cnaps: '',
    num_osie: '',
    prime_et_avantage_permanent: [],
    depart: {},
    irsaValue: 0,
  },
  loading: 'idle',
}
const employeSlice = createSlice({
  name: 'employe',
  initialState,
  reducers: {
    createEmploye: (state, action) => {
      state.employee = action.payload
    },
    resetEmploye: (state) => initialState,
  },
  extraReducers: (builder) => {},
})

export const { createEmploye, resetEmploye } = employeSlice.actions
export default employeSlice.reducer
