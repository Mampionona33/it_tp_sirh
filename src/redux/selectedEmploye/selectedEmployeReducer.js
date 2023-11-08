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
  hsni130Value: 0,
  hsni150Value: 0,
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
    setHsni130Value: (state, action) => {
      state.hsni130Value = action.payload
    },
    setHsni150Value: (state, action) => {
      state.hsni150Value = action.payload
    },
  },
})

export const {
  setSelectedEmploye,
  setSelectedEmployeSalaireBrut,
  setHsni130Value,
  setHsni150Value,
} = selectedEmployeSlice.actions

export default selectedEmployeSlice.reducer
