import axios from 'axios'

class TauxCnapsService {
  private REACT_APP_API_BASE_URL: string
  private REACT_APP_API_BASE_URL_DEV: string
  private login: string
  private pass: string
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.REACT_APP_API_BASE_URL_DEV =
      process.env.REACT_APP_API_BASE_URL_DEV || 'http://localhost:8000'
    this.login = 'lslisteemployes'
    this.pass = '20lsliste23'
  }

  public getTauxEmployeur = async () => {
    try {
      const response = await axios.get(`${this.REACT_APP_API_BASE_URL_DEV}/taux-cnaps/employeur`, {
        auth: {
          username: this.login,
          password: this.pass,
        },
      })
      return response
    } catch (error) {
      throw error
    }
  }

  public getTauxSalarie = async () => {
    try {
      const response = await axios.get(`${this.REACT_APP_API_BASE_URL_DEV}/taux-cnaps/salarie`, {
        auth: {
          username: this.login,
          password: this.pass,
        },
      })
      return response
    } catch (error) {
      throw error
    }
  }
}

const tauxCnapsService = new TauxCnapsService()

export default tauxCnapsService
