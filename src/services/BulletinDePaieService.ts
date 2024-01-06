import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import axios from 'axios'

export interface IBltndPaieCreateParams {
  id: string | number
  data: IBulletinDePaieProps
}

class BulletinDePaieService {
  private REACT_APP_API_BASE_URL: string
  private REACT_APP_API_BASE_URL_DEV: string
  private login: string
  private pass: string
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.REACT_APP_API_BASE_URL_DEV =
      process.env.REACT_APP_API_BASE_URL_DEV || 'http://localhost:8000'
    this.pass = '20lsliste23'
    this.login = 'lslisteemployes'
  }

  async create(params: IBltndPaieCreateParams) {
    const { id, data } = params
    try {
      const response = await axios.post(
        `${this.REACT_APP_API_BASE_URL}/bulletin-de-paie/ajout/${id}`,
        data,
        {
          auth: {
            username: this.login,
            password: this.pass,
          },
        },
      )
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

const bulletinDePaieService = new BulletinDePaieService()

export default bulletinDePaieService
