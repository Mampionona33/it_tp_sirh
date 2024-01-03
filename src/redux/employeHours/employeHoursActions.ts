import { createAsyncThunk } from '@reduxjs/toolkit'
import heureService from '@src/services/HeureService'
import { DDMMYYYYFormat } from '@src/types/DateType'

interface FetchHeureParams {
  matricule: string
  dateDebut: DDMMYYYYFormat
  dateFin: DDMMYYYYFormat
}

export const fetchHeureEmploye = createAsyncThunk(
  'heure/fetch',
  async (params: FetchHeureParams, thunkAPI) => {
    const { matricule, dateDebut, dateFin } = params

    try {
      const res = await heureService.getAll(matricule, dateDebut, dateFin)
      return res
    } catch (error) {
      throw error
    }
  },
)
