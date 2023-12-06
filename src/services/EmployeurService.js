import axios from 'axios'

class EmployeurService {
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.resp = null
  }

  async fetcheEmpoyeur() {
    try {
      this.resp = await axios.get(`${this.REACT_APP_API_BASE_URL}/employeur`)
      return this.resp
    } catch (error) {
      console.log(error)
    }
  }
}

const EmployeurServiceInstance = new EmployeurService()

export default EmployeurServiceInstance
