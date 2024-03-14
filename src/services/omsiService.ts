import { DataOmsiProps } from '@src/interfaces/interfaceBtnDownloadOmsi'
import axios from 'axios'

class OmsiService {
  private REACT_APP_API_BASE_URL: string
  private login: string
  private pass: string

  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.pass = process.env.REACT_APP_BACKEND_PASS || '20lsliste23'
    this.login = process.env.REACT_APP_BACKEND_LOGIN || 'lslisteemployes'
  }

  async getOmsiByPeriodeYear(periode: string, year: number) {
    try {
      const response = await axios.get(
        `${this.REACT_APP_API_BASE_URL}/declaration-omsi/${year}/${periode}`,
        {
          auth: {
            username: this.login,
            password: this.pass,
          },
        },
      )
      return response.data
    } catch (error) {
      console.error('An error occurred during the request:', error)
      throw error
    }
  }

  async add(data: DataOmsiProps) {
    try {
      const response = await axios.put(`${this.REACT_APP_API_BASE_URL}/declaration-omsi`, data, {
        auth: {
          username: this.login,
          password: this.pass,
        },
      })
      return response.data
    } catch (error) {
      console.error('An error occurred during the request:', error)
      throw error
    }
  }
}

const omsiService = new OmsiService()
export default omsiService
