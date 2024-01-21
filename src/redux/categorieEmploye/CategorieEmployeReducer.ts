import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchAllCotisations } from '../cotisations/cotisationsActions'
import { ICategorieEmployeState } from '@src/interfaces/intefaceCategorieEmploye'

const initialState: ICategorieEmployeState = {
  data: [],
  loading: 'idle',
}

const categorieEmployeSlice = createSlice({
  name: 'CategorieEmploye',
  initialState,
  reducers: {
    resetCategorieEmployeState: (state) => initialState,
    setCategorieEmployeState: (state, action: PayloadAction<ICategorieEmployeState>) => {
      return { ...state, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCotisations.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.loading = 'succeeded'
      })
      .addCase(fetchAllCotisations.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchAllCotisations.rejected, (state) => {
        state.loading = 'failed'
      })
  },
})

export const { resetCategorieEmployeState, setCategorieEmployeState } =
  categorieEmployeSlice.actions

export default categorieEmployeSlice.reducer
