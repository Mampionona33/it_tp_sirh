import { createSlice } from '@reduxjs/toolkit'
import { EnumGenre, IEmploye, IEnfantEmploye } from '@src/interfaces/interfaceEmploye'
import { format } from 'date-fns'

export const initialState: IEmploye = {
  id: null,
  nom: '',
  prenom: '',
  date_naissance: '',
  lieu_naissance: '',
  adresse: '',
  tel: '',
  email: '',
  num_cin: '',
  genre: EnumGenre.MASCULIN,
  contact_urgence: [],
  enfant: [],
  titre_poste: '',
  matricule: '',
  categorie: '',
  date_embauche: format(new Date(), 'yyyy-MM-dd'),
  lieu_travail: '',
  salaire_de_base: 0,
  travail_de_nuit: 0,
  mode_payement_salaire: '',
  actif: 1,
  departement: '',
  num_cnaps: '',
  num_osie: '',
  est_cadre: 0,
  rib: '',
  prime_et_avantage_permanent: null,
  depart: null,
}

const formEmployeSlice = createSlice({
  name: 'formEmploye',
  initialState,
  reducers: {
    resetFormEmploye: () => initialState,
    setFormEmploye: (state, action) => {
      return { ...state, ...action.payload }
    },
    formEmployeAjoutEnfant: (state, action) => {
      state.enfant.push(action.payload)
    },
    formEmployeSupprimerEnfant: (state, action) => {
      state.enfant = state.enfant.filter((enfant: IEnfantEmploye) => enfant.id !== action.payload)
    },
  },
})

export const {
  resetFormEmploye,
  setFormEmploye,
  formEmployeAjoutEnfant,
  formEmployeSupprimerEnfant,
} = formEmployeSlice.actions
export default formEmployeSlice.reducer
