import { createSlice } from '@reduxjs/toolkit'
import { fetchHeureEmploye } from './employeHoursActions'

const initialState = {
  employeHours: [],
  loading: 'idle',
  totalHNormal: null,
  totalHsJour: null,
  totalHs130: null,
  totalHs150: null,
  totalHs30: null,
  totalHs50: null,
  totalHdim: null,
  totalHferier: null,
  hsni130: null,
  hsni150: null,
  error: null,
}

const employeeHoursSlice = createSlice({
  name: 'employeeTotalHours',
  initialState,
  reducers: {
    resetEmployHours: (state) => initialState,
    setEmployHours: (state, action) => {
      state.employeHours = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeureEmploye.fulfilled, (state, action) => {
        state.employeHours = action.payload
        state.loading = 'succeeded'
        state.error = null
      })
      .addCase(fetchHeureEmploye.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error
      })
      .addCase(fetchHeureEmploye.pending, (state) => {
        state.loading = 'loading'
        state.error = null
      })
  },
})

export const { setEmployHours, resetEmployHours } = employeeHoursSlice.actions

export default employeeHoursSlice.reducer
