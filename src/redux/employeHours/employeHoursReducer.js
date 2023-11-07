const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  totalHNormal: 0,
  totalHsJour: 0,
  totalHs130: 0,
  totalHs150: 0,
  totalHs30: 0,
  totalHs50: 0,
  totalHdim: 0,
  totalHferier: 0,
  hsni130: 0,
  hsni150: 0,
}

const employeeHoursSlice = createSlice({
  name: 'employeeTotalHours',
  initialState,
  reducers: {
    setTotalHNormal: (state, action) => {
      state.totalHNormal = action.payload
    },
    setTotalHsJour: (state, action) => {
      state.totalHsJour = action.payload
    },
    setTotalHs130: (state, action) => {
      state.totalHs130 = action.payload
    },
    setTotalHs150: (state, action) => {
      state.totalHs150 = action.payload
    },
    setTotalHs30: (state, action) => {
      state.totalHs30 = action.payload
    },
    setTotalHs50: (state, action) => {
      state.totalHs50 = action.payload
    },
    setTotalHdim: (state, action) => {
      state.totalHdim = action.payload
    },
    setTotalHferier: (state, action) => {
      state.totalHferier = action.payload
    },
    setTotalHsni130: (state, action) => {
      state.hsni130 = action.payload
    },
    setTotalHsni150: (state, action) => {
      state.hsni150 = action.payload
    },
  },
})

export const {
  setTotalHNormal,
  setTotalHsJour,
  setTotalHs130,
  setTotalHs150,
  setTotalHs30,
  setTotalHs50,
  setTotalHdim,
  setTotalHferier,
  setTotalHsni130,
  setTotalHsni150,
} = employeeHoursSlice.actions

export default employeeHoursSlice.reducer
