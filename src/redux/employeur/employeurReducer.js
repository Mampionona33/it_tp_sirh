import { createSlice } from '@reduxjs/toolkit'
import { fetchEmployeur } from './employeurAction' // Correction : Renommer la fonction

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
      .addCase(fetchEmployeur.fulfilled, (state, action) => {
        state.employeur = action.payload
        state.loading = 'idle'
        state.error = null
      })
      .addCase(fetchEmployeur.pending, (state) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(fetchEmployeur.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
  },
})

export default employeurSlice.reducer
