import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchHistoriquesPaie } from './historiqueDePaieAction'
import { AxiosError } from 'axios'
import { IHistoriquePaieProps } from '@src/interfaces/interfaceHistoriquePaie'

const initialState: IHistoriquePaieProps = {
  historiques: [],
  anneeSectionne: new Date().toString(),
  loading: 'idle',
  error: null,
}

const historiqueDePaieSlice = createSlice({
  name: 'historique',
  initialState,
  reducers: {
    resetHistoriqueDePaie: () => initialState,
    setHistoriqueDePaie: (state, action: PayloadAction<IHistoriquePaieProps>) => {
      return { ...state, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchHistoriquesPaie.fulfilled,
        (state, action: PayloadAction<IHistoriquePaieProps>) => {
          state.historiques = action.payload.historiques
          state.loading = 'succeeded'
          state.error = null
        },
      )
      .addCase(fetchHistoriquesPaie.pending, (state) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(fetchHistoriquesPaie.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error as AxiosError
      })
  },
})

export const { resetHistoriqueDePaie, setHistoriqueDePaie } = historiqueDePaieSlice.actions

export default historiqueDePaieSlice.reducer
