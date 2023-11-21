import axios from 'axios'

class AuthService {
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.email = null
    this.password = null
  }

  async login(email, password) {
    this.email = email
    this.password = password
    try {
      const resp = await axios.post(`${this.REACT_APP_API_BASE_URL}/login`, {
        email: this.email,
        password: this.password,
      })
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default AuthService
