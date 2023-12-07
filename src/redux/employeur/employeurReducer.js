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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetcheEmpoyeur.fulfilled, (state, action) => {
        state.employeur = action.payload
        state.loading = 'idle'
        state.error = null
      })
      .addCase(fetcheEmpoyeur.pending, (state) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(fetcheEmpoyeur.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
  },
})

export default employeurSlice.reducer
