import { createAsyncThunk } from '@reduxjs/toolkit'
import InstaceDnsService from 'src/services/DnsService'

export const fetchDnsData = createAsyncThunk('dns/fetch', async ({ periode, annee }, thunkAPI) => {
  try {
    const res = await InstaceDnsService.fetch(periode, annee)
    // console.log(res)
    return res
  } catch (error) {
    throw error
  }
})
