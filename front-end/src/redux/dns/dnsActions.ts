import { createAsyncThunk } from '@reduxjs/toolkit'
import InstaceDnsService, { IDnsFetchAllProps } from 'src/services/DnsService'

export const fetchDnsData = createAsyncThunk(
  'dns/fetch',
  async (props: IDnsFetchAllProps, thunkAPI) => {
    const { annee, periode } = props
    try {
      const res = await InstaceDnsService.fetch({ annee, periode })
      // console.log(res)
      return res
    } catch (error) {
      throw error
    }
  },
)
