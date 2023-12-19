import axios from 'axios'

class EmployeeService {
  REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'

  login = 'lslisteemployes'
  pass = '20lsliste23'

  async getAll() {
    try {
      const response = await axios.get(`${this.REACT_APP_API_BASE_URL}/personnels`, {
        auth: {
          username: this.login,
          password: this.pass,
        },
      })
      return response.data
    } catch (error) {
      console.error("Une erreur s'est produite lors de la requête :", error)
    }
  }

  getById(id) {
    return axios.get(`${this.REACT_APP_API_BASE_URL}/employees/id=${id}`)
  }

  async addEmployee(data) {
    try {
      const response = await axios.post(`${this.REACT_APP_API_BASE_URL}/personnels/ajout`, data, {
        auth: {
          username: this.login,
          password: this.pass,
        },
      })
      return response
    } catch (error) {
      console.error("Une erreur s'est produite lors de la requête :", error)
      // throw error
    }
  }
}
const newEmployeeService = new EmployeeService()

export default newEmployeeService
