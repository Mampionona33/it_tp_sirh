import axios from 'axios'

class ModeDePayementService {
  REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
  REACT_APP_API_BASE_URL_DEV = process.env.REACT_APP_API_BASE_URL_DEV || 'http://localhost:8000'

  login = 'lslisteemployes'
  pass = '20lsliste23'

  getAll = async () => {
    try {
      const response = await axios.get(`${this.REACT_APP_API_BASE_URL_DEV}/mode-de-payement`, {
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

  getOneByVal = async (value: string) => {
    try {
      const response = await axios.get(
        `${this.REACT_APP_API_BASE_URL_DEV}/mode-de-payement/${value}`,
        {
          auth: {
            username: this.login,
            password: this.pass,
          },
        },
      )
      return response
    } catch (error) {
      throw error
    }
  }
}

const modeDePayementService = new ModeDePayementService()
export default modeDePayementService
