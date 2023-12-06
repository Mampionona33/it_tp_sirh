import { createSlice } from '@reduxjs/toolkit'
import { fetcheEmpoyeur } from './employeurAction'

const initialState = {
  employeur: [],
  loading: 'idle',
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
      })
      .addCase(fetcheEmpoyeur.pending, (state, action) => {
        state.loading = 'loading'
      })
      .addCase(fetcheEmpoyeur.rejected, (state, action) => {
        state.loading = 'idle'
      })
  },
})

export default employeurSlice.reducer
