import { createAsyncThunk } from '@reduxjs/toolkit'
import historiquePaieService from '@src/services/HistoriquePaieSerivce'
import { AxiosResponse } from 'axios'

export interface IFetchHistoriqueBltnP {
  id: number | string
  annee?: number
}

export const fetchHistoriquesPaie = createAsyncThunk(
  'historiques/fetch',
  async (params: IFetchHistoriqueBltnP, thunkAPI) => {
    const { id, annee = new Date().getFullYear() } = params
    try {
      const response: AxiosResponse = await historiquePaieService.getByUserIDAndDate({ id, annee })
      return response.data // Retournez les données directement
    } catch (error) {
      throw error
    }
  },
)
