import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchHistoriquesPaie } from './historiqueDePaieAction'

const initialState = {
  historiques: [],
  anneeSectionne: new Date().toString(),
  loading: 'idle',
}

const historiqueDePaieSlice = createSlice({
  name: 'historique',
  initialState,
  reducers: {
    resetHistoriqueDePaie: (state) => initialState,
    setHistoriqueDePaie: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload }
    },
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

export const { resetHistoriqueDePaie, setHistoriqueDePaie } = historiqueDePaieSlice.actions

export default historiqueDePaieSlice.reducer
