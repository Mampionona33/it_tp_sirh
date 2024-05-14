import axios from 'axios'

class AvanceService {
  REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'

  async getOne(id, dateDebut, dateFin) {
    try {
      const resp = await axios.get(
        `${this.REACT_APP_API_BASE_URL}/avances/id=${id}&&dateDebut=${dateDebut}&&dateFin=${dateFin}`,
      )
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

const newAvanceService = new AvanceService()

export default newAvanceService
