import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedPeriod: 't1',
  selectedYear: new Date().getFullYear().toString(),
  employeur: [],
}

const dnsSlice = createSlice({
  name: 'dns',
  initialState,
  reducers: {
    setDns: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetDns: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {},
})

export const { setDns, resetDns } = dnsSlice.actions

export default dnsSlice.reducer
