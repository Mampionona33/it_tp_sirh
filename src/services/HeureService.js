import axios from 'axios'

class HeureService {
  REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
  REACT_APP_API_BASE_URL_DEV = process.env.REACT_APP_API_BASE_URL_DEV || 'http://localhost:8000'
  matricule = null
  dateDebut = null
  dateFin = null
  async getAll(matricule, dateDebut, dateFin) {
    this.matricule = matricule
    this.dateDebut = dateDebut
    this.dateFin = dateFin

    try {
      const resp = await axios.post(`${this.REACT_APP_API_BASE_URL}/heuressupplementaires`, {
        matricule: matricule,
        dateDebut: dateDebut,
        dateFin: dateFin,
      })
      console.log(resp.data)
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

const newHeureService = new HeureService()
export default newHeureService
