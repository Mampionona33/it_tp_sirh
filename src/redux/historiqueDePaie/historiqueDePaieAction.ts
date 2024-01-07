import { createAsyncThunk } from '@reduxjs/toolkit'
import historiquePaieService, { IGetByUserIdAndBulletin } from '@src/services/HistoriquePaieSerivce'
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
      const response: AxiosResponse = await historiquePaieService.getAllByUserIDAndDate({
        id,
        annee,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
)

export const fetchDetailsHistoriquePaie = createAsyncThunk(
  'historiques/fetch/details',
  async (params: IGetByUserIdAndBulletin, thunkAPI) => {
    const { id, idValidation } = params
    try {
      const response: AxiosResponse = await historiquePaieService.getOnByUserIdAndBltinPaieId({
        id,
        idValidation,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
)
