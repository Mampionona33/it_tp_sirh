import { createSlice } from '@reduxjs/toolkit'
import { fetcheEmpoyeur } from './employeurAction' // Correction : Renommer la fonction

const initialState = {
  employeur: [],
  loading: 'idle',
  error: null,
}

const employeurSlice = createSlice({
  name: 'employeur',
  initialState,
  reducers: {
    resetEmployeur: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetcheEmpoyeur.fulfilled, (state, action) => {
        state.employeur = action.payload
        state.loading = 'idle'
      })
      .addCase(fetcheEmpoyeur.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetcheEmpoyeur.rejected, (state, action) => {
        console.log(action)
        state.loading = 'idle'
        state.error = action.error
      })
  },
})
export const { resetEmployeur } = employeurSlice.actions
export default employeurSlice.reducer
