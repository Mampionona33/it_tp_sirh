import { createAsyncThunk } from '@reduxjs/toolkit'
import historiquePaieService from '@src/services/HistoriquePaieSerivce'
import { AxiosResponse } from 'axios'

export interface IFetchHistoriqueBltnP {
  id: number | string
}

export const fetchHistoriquesPaie = createAsyncThunk(
  'historiques/fetch',
  async (params: IFetchHistoriqueBltnP, thunkAPI) => {
    const { id } = params
    try {
      const res: AxiosResponse = await historiquePaieService.getOne(id)
      return res
    } catch (error) {
      throw error
    }
  },
)
