import axios from 'axios'
class PaieService {
  constructor(parameters) {}
  REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
  REACT_APP_API_BASE_URL_DEV = process.env.REACT_APP_API_BASE_URL_DEV || 'http://localhost:8000'

  login = 'lslisteemployes'
  pass = '20lsliste23'

  async getAll() {
    try {
      const response = await axios.get(`${this.REACT_APP_API_BASE_URL_DEV}/personnels`, {
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
