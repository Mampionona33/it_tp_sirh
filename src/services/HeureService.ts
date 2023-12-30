import { DDMMYYYYFormat } from '@src/types/DateType'
import axios from 'axios'

class HeureService {
  REACT_APP_API_BASE_URL: string
  matricule: string | null
  dateDebut: string | null
  dateFin: string | null
  resp: any

  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.matricule = null
    this.dateDebut = null
    this.dateFin = null
    this.resp = null
  }

  async getAll(matricule: string, dateDebut: DDMMYYYYFormat, dateFin: DDMMYYYYFormat) {
    this.matricule = matricule
    this.dateDebut = dateDebut
    this.dateFin = dateFin

    try {
      const instance = axios.create({
        baseURL: this.REACT_APP_API_BASE_URL,
      })

      this.resp = await instance.post('/heuressupplementaires', {
        matricule: matricule,
        dateDebut: dateDebut,
        dateFin: dateFin,
      })

      return this.resp.data
    } catch (error) {
      console.error(error)
      throw error // Re-throw the error so that the calling code can handle it
    }
  }
}

const heureService = new HeureService()

export default heureService
