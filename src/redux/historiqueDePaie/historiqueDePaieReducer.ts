import { createSlice } from '@reduxjs/toolkit'
import { fetchHistoriquesPaie } from './historiqueDePaieAction'

const initialState = {
  historiques: [],
  loading: 'idle',
}

const historiqueDePaieSlice = createSlice({
  name: 'historique',
  initialState,
  reducers: {
    resetHistoriqueDePaie: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoriquesPaie.fulfilled, (state, action) => {
        state.historiques = action.payload.data
        state.loading = 'succeeded'
      })
      .addCase(fetchHistoriquesPaie.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchHistoriquesPaie.rejected, (state) => {
        state.loading = 'failed'
      })
  },
})
