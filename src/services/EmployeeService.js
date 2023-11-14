import axios from 'axios'

// const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
const REACT_APP_API_BASE_URL = 'http://localhost:8000'
console.log(process.env.REACT_APP_API_BASE_URL)

class EmployeeService {
  async getAll() {
    try {
      const response = await axios.post(`${REACT_APP_API_BASE_URL}`, {
        matricule: 345,
        dateDebut: '02/01/2023',
        dateFin: '06/01/2023',
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error("Une erreur s'est produite lors de la requête :", error)
    }
  }
  getById(id) {
    return axios.get(`${REACT_APP_API_BASE_URL}/employees/id=${id}`)
  }
}

export default new EmployeeService()
