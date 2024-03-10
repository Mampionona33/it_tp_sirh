import axios from 'axios'

class ParametreService {
  REACT_APP_API_BASE_URL: string
  REACT_APP_API_BASE_URL_DEV: string
  matricule: string | null
  dateDebut: string | null
  dateFin: string | null
  resp: any

  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL_DEV || 'http://localhost:8000'
    this.REACT_APP_API_BASE_URL_DEV = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.matricule = null
    this.dateDebut = null
    this.dateFin = null
    this.resp = null
  }

  async getAll() {
    try {
      const instance = axios.create({
        baseURL: this.REACT_APP_API_BASE_URL,
      })

      this.resp = await instance.get('/parametres')

      return this.resp.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async update(parametre: any) {
    try {
      const instance = axios.create({
        baseURL: this.REACT_APP_API_BASE_URL,
      })

      this.resp = await instance.put('/parametres', parametre)

      return this.resp.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const parametreService = new ParametreService()

export default parametreService
