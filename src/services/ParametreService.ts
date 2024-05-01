import { IParametrePaie } from '@src/views/parametre/paies/ParametrePaie'
import axios from 'axios'

class ParametreService {
  REACT_APP_API_BASE_URL: string
  REACT_APP_API_BASE_URL_DEV: string
  matricule: string | null
  dateDebut: string | null
  dateFin: string | null
  resp: any
  login: string
  pass: string

  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.REACT_APP_API_BASE_URL_DEV =
      process.env.REACT_APP_API_BASE_URL_DEV || 'http://localhost:8000'
    this.matricule = null
    this.dateDebut = null
    this.dateFin = null
    this.resp = null
    this.login = 'lslisteemployes'
    this.pass = '20lsliste23'
  }

  async getAll() {
    try {
      const instance = axios.create({
        baseURL: this.REACT_APP_API_BASE_URL,
      })

      this.resp = await instance.get('/parametres', {
        auth: {
          username: this.login,
          password: this.pass,
        },
      })

      return this.resp.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updatePaie(parametre: IParametrePaie) {
    try {
      const instance = axios.create({
        baseURL: this.REACT_APP_API_BASE_URL,
      })

      this.resp = await instance.post('/parametres/modif', parametre, {
        auth: {
          username: this.login,
          password: this.pass,
        },
      })

      return this.resp.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const parametreService = new ParametreService()

export default parametreService
