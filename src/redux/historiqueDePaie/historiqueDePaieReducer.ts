import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchHistoriquesPaie } from './historiqueDePaieAction'

const initialState = {
  historiques: [],
  annee: new Date().getFullYear(),
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
      .addCase(fetchHistoriquesPaie.fulfilled, (state, action: PayloadAction<any>) => {
        state.historiques = action.payload
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

export default historiqueDePaieSlice.reducer
