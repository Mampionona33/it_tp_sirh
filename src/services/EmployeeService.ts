import { createEmploye } from '@src/redux/employe/employeReducer'
import { store } from '@src/redux/store'
import axios, { AxiosResponse } from 'axios'
import { IEmploye } from '@src/interfaces/interfaceEmploye'

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

  getById(id: string | number) {
    return axios.get(`${this.REACT_APP_API_BASE_URL}/employees/id=${id}`)
  }

  async create(data: IEmploye) {
    try {
      const response = await axios.post(`${this.REACT_APP_API_BASE_URL}/personnels/ajout`, data, {
        auth: {
          username: this.login,
          password: this.pass,
        },
      })
      console.log(response.data)
      return response
    } catch (error) {
      console.error("Une erreur s'est produite lors de la requête :", error)
      // throw error
    }
  }

  async update(id: string | number, data: IEmploye): Promise<AxiosResponse> {
    console.log(data)
    try {
      const response = await axios.put(
        `${this.REACT_APP_API_BASE_URL}/personnels/modifier/${id}`,
        data,
        {
          auth: {
            username: this.login,
            password: this.pass,
          },
        },
      )
      console.log(response)
      return response
    } catch (error) {
      console.error("Une erreur s'est produite lors de la requête :", error)
      // throw error
    }
  }
}

const employeService = new EmployeeService()

export default employeService
