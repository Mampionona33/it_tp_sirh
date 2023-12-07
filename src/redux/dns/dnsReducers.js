import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  periodSelectionne: 't1',
  anneeSelectionne: new Date().getFullYear(),
  mois1: null,
  mois2: null,
  mois3: null,
}

const dnsSlice = createSlice({
  name: 'dns',
  initialState,
  reducers: {
    setDns: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetDns: (state) => initialState,
  },
  extraReducers: (builder) => {},
})

export const { setDns, resetDns } = dnsSlice.actions

export default dnsSlice.reducer
