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
  salaireBrut: 0,
}

const selectedEmployeSlice = createSlice({
  name: 'selectedEmploye',
  initialState,
  reducers: {
    setSelectedEmploye: (state, action) => {
      state.employe = action.payload
    },
    setSelectedEmployeSalaireBrut: (state, action) => {
      state.salaireBrut = action.payload
    },
  },
})

export const { setSelectedEmploye, setSelectedEmployeSalaireBrut } = selectedEmployeSlice.actions

export default selectedEmployeSlice.reducer
