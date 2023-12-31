import { createSlice } from '@reduxjs/toolkit'
import { fetchAllCotisations } from '../cotisations/cotisationsActions'
import { ICategorieEmployeState } from '@src/interfaces/intefaceCategorieEmploye'

const initialState: ICategorieEmployeState = {
  loading: 'idle',
  data: [],
}

const categorieEmployeSlice = createSlice({
  name: 'CategorieEmploye',
  initialState,
  reducers: {
    resetCategorieEmployeState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCotisations.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.loading = 'succeeded'
      })
      .addCase(fetchAllCotisations.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchAllCotisations.rejected, (state) => {
        state.loading = 'failed'
      })
  },
})

export const { resetCategorieEmployeState } = categorieEmployeSlice.actions

export default categorieEmployeSlice.reducer
