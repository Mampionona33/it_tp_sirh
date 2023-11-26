import axios from 'axios'

class HeureService {
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.matricule = null
    this.dateDebut = null
    this.dateFin = null
    this.resp = null
  }
  async getAll(matricule, dateDebut, dateFin) {
    this.matricule = matricule
    this.dateDebut = dateDebut
    this.dateFin = dateFin

    try {
      this.resp = await axios.post(`${this.REACT_APP_API_BASE_URL}/heuressupplementaires`, {
        matricule: matricule,
        dateDebut: dateDebut,
        dateFin: dateFin,
      })
      return this.resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default HeureService
