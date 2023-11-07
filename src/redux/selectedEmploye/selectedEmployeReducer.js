const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  employe: {
    id: null,
    matricule: null,
    cin: null,
    name: {
      nom: null,
      prenom: null,
    },
    poste: null,
    telephone: null,
    manager: null,
    email: null,
    dateEmbauche: null,
    sexe: null,
    salaireBase: null,
    cat: null,
  },
}

const selectedEmployeSlice = createSlice({
  name: 'selectedEmploye',
  initialState,
  reducers: {
    setSelectedEmploye: (state, action) => {
      state.employe = action.payload
    },
  },
})

export const { setSelectedEmploye } = selectedEmployeSlice.actions

export default selectedEmployeSlice.reducer
