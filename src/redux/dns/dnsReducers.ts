import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchDnsData } from './dnsActions'
import { BaseReduxState } from '@src/interfaces/interfaceDeBaseReduxState'

export interface IDnsState extends BaseReduxState {
  periodSelectionne: string
  anneeSelectionne: number
  dnsData: any
}

const initialState: IDnsState = {
  periodSelectionne: 't1',
  anneeSelectionne: new Date().getFullYear(),
  dnsData: null,
  loading: 'idle',
}

const dnsSlice = createSlice({
  name: 'dns',
  initialState,
  reducers: {
    setDns: (state, action: PayloadAction<IDnsState>) => {
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
      .addCase(fetchDnsData.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchDnsData.rejected, (state) => {
        state.loading = 'failed'
      })
  },
})

export const { setDns, resetDns } = dnsSlice.actions

export default dnsSlice.reducer
