import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchHistoriquesPaie } from './historiqueDePaieAction'

const initialState = {
  historiques: [],
  anneeSectionne: new Date().toString(),
  loading: 'idle',
  error: null,
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
        state.error = null
      })
      .addCase(fetchHistoriquesPaie.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchHistoriquesPaie.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error
      })
  },
})

export const { resetHistoriqueDePaie, setHistoriqueDePaie } = historiqueDePaieSlice.actions

export default historiqueDePaieSlice.reducer
