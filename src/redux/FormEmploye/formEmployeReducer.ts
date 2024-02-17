import { createSlice } from '@reduxjs/toolkit'
import { EnumGenre, EnumBoolean, IEmploye, IEnfantEmploye } from '@src/interfaces/interfaceEmploye'
import { format } from 'date-fns'

export const initialState: IEmploye = {
  id: undefined,
  nom: '',
  prenom: '',
  date_naissance: '',
  lieu_naissance: '',
  date_delivrance_cin: '',
  nom_mere: '',
  nom_pere: '',
  adresse: '',
  telephone: '',
  email: '',
  num_cin: '',
  genre: EnumGenre.MASCULIN,
  enfant: [],
  titre_poste: '',
  matricule: '',
  categorie: undefined,
  date_embauche: format(new Date(), 'yyyy-MM-dd'),
  lieu_travail: '',
  salaire_de_base: 0,
  travail_de_nuit: EnumBoolean.NON,
  mode_paiement_salaire: undefined,
  actif: EnumBoolean.OUI,
  departement: '',
  num_cnaps: '',
  est_cadre: EnumBoolean.NON,
  rib: '',
  prime_et_avantage_permanent: undefined,
  depart: undefined,
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
      if (!state.enfant) state.enfant = []
      state.enfant.push(action.payload)
    },
    formEmployeSupprimerEnfant: (state, action) => {
      if (!state.enfant) state.enfant = []
      console.log(action.payload)
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
