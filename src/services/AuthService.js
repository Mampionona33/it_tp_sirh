import axios from 'axios'

class AuthService {
  REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
  email = null
  password = null
  async login(email, password) {
    this.email = email
    this.password = password
    try {
      const resp = await axios.post(`${this.REACT_APP_API_BASE_URL}/login`, {
        auth: {
          username: this.email,
          password: this.password,
        },
      })
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default AuthService
