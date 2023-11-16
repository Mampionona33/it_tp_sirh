import axios from 'axios'

class AvanceService {
  async getOne(id, dateDebut, dateFin) {
    try {
      const resp = await axios.get(
        `${REACT_APP_API_DEV_BASE_URL}/avances/id=${id}&&dateDebut=${dateDebut}&&dateFin=${dateFin}`,
      )
      return resp.data
    } catch (error) {
      console.log(error)
    }
  }
}

const newAvanceService = new AvanceService()

export default newAvanceService
