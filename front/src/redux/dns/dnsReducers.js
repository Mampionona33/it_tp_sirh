import { createSlice } from '@reduxjs/toolkit'
import { fetchDnsData } from './dnsActions'

const initialState = {
  periodSelectionne: 't1',
  anneeSelectionne: new Date().getFullYear(),
  dnsData: null,
  loading: 'idle',
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchDnsData.fulfilled, (state, action) => {
        state.dnsData = action.payload.data
        state.loading = 'succeeded'
      })
      .addCase(fetchDnsData.pending, (state, action) => {
        state.loading = 'loading'
      })
      .addCase(fetchDnsData.rejected, (state, action) => {
        state.loading = 'reject'
      })
  },
})

export const { setDns, resetDns } = dnsSlice.actions

export default dnsSlice.reducer
