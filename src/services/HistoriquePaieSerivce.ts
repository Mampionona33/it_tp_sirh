import axios from 'axios'

class HistoriquePaieService {
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

  async getOne(id: string | number) {
    try {
      const resp = await axios.get(`${this.REACT_APP_API_BASE_URL}/historique-paie/${id}`)
      console.log(resp)
      return resp
    } catch (error) {
      throw error
    }
  }
}

const historiquePaieService = new HistoriquePaieService()
export default historiquePaieService
