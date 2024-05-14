import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchDnsData } from './dnsActions'
import { BaseReduxState } from '@src/interfaces/interfaceDeBaseReduxState'
import { AxiosError } from 'axios'
import { IDnsGeneratorDataProps } from '@src/interfaces/interfaceDnsGenerator'

export interface IDnsState extends BaseReduxState {
  periodSelectionne: string
  anneeSelectionne: number
  dnsData: IDnsGeneratorDataProps | null
}

const initialState: IDnsState = {
  periodSelectionne: 't1',
  anneeSelectionne: new Date().getFullYear(),
  dnsData: null,
  error: null,
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
        console.log(Object.values(action.payload!.data.travailleur))
        state.dnsData = {
          ...action.payload!.data,
          travailleur: Object.values(action.payload!.data.travailleur) as IDnsGeneratorDataProps[],
        }
        state.loading = 'succeeded'
        state.error = null
      })
      .addCase(fetchDnsData.pending, (state) => {
        state.loading = 'loading'
        state.error = null
      })
      .addCase(fetchDnsData.rejected, (state, action) => {
        console.log(action)
        state.loading = 'failed'
        state.error = action.error as AxiosError
      })
  },
})

export const { setDns, resetDns } = dnsSlice.actions

export default dnsSlice.reducer
