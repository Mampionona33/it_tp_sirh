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
      const response = await axios.get(`${this.REACT_APP_API_BASE_URL}/omsi/${year}/${periode}`, {
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
