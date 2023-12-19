import axios, { AxiosResponse } from 'axios'

class CategorieEmployeService {
  private resp: AxiosResponse | null = null
  private REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
  private REACT_APP_API_BASE_URL_DEV =
    process.env.REACT_APP_API_BASE_URL_DEV || 'http://localhost:8000'

  constructor() {}

  async getAll() {
    try {
      this.resp = await axios.get(`${this.REACT_APP_API_BASE_URL_DEV}/categorie-employe`)
      return this.resp
    } catch (error) {
      throw error
    }
  }
}

const categorieEmployeService = new CategorieEmployeService()

export default categorieEmployeService
