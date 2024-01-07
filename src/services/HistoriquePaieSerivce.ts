import axios from 'axios'

export interface IGetByUserIDAndDate {
  id: string | number
  annee?: number
}

export interface IGetByUserIdAndBulletin {
  id: string | number
  idValidation: string | number
}

class HistoriquePaieService {
  private REACT_APP_API_BASE_URL: string
  private REACT_APP_API_BASE_URL_DEV: string
  private login: string
  private pass: string
  constructor() {
    this.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
    this.REACT_APP_API_BASE_URL_DEV =
      process.env.REACT_APP_API_BASE_URL_DEV || 'http://localhost:8000'
    this.pass = '20lsliste23'
    this.login = 'lslisteemployes'
  }

  async getAllByUserIDAndDate(params: IGetByUserIDAndDate) {
    /**
     * Récupère l'historique de paie pour un employé spécifique et une année donnée.
     *
     * @param params - Les paramètres de la requête.
     * @param params.id - L'identifiant de l'employé.
     * @param params.annee - L'année sélectionnée. Par défaut, c'est l'année en cours.
     * @returns Promise<Array<{ date: string, id: number, status: string }>> - Un tableau d'objets représentant l'historique de paie.
     */
    const { id, annee = new Date().getFullYear() } = params
    try {
      const resp = await axios.get(`${this.REACT_APP_API_BASE_URL}/historique-paie/${id}/${annee}`)
      console.log(resp)
      return resp
    } catch (error) {
      throw error
    }
  }

  async getOnByUserIdAndBltinPaieId(params: IGetByUserIdAndBulletin) {
    const { id, idValidation } = params
    try {
      const resp = await axios.get(
        `${this.REACT_APP_API_BASE_URL}/historique-paie/${id}/details/${idValidation}`,
      )
      return resp
    } catch (error) {
      throw error
    }
  }
}

const historiquePaieService = new HistoriquePaieService()
export default historiquePaieService
