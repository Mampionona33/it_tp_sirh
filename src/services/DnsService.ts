import axios, { AxiosError, AxiosResponse } from 'axios'
import AxiosErrorHandler from './AxiosErrorHandler'

export interface IDnsFetchAllProps {
  annee: number
  periode: string
}
class DnsService {
  static REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
  private resp: AxiosResponse | null
  constructor() {
    this.resp = null
  }

  async fetch(props: IDnsFetchAllProps) {
    const { annee, periode } = props
    const email = 'lslisteemployes'
    const password = '20lsliste23'
    try {
      this.resp = await axios.get(`${DnsService.REACT_APP_API_BASE_URL}/dns/${annee}/${periode}`, {
        auth: {
          username: email,
          password: password,
        },
      })

      // console.log(this.resp) change
      return this.resp
    } catch (error) {
      // console.log(error, typeof error)
      if (axios.isAxiosError(error)) {
        AxiosErrorHandler.handle(error)
      }

      const newError = error as AxiosError

      throw newError
    }
  }
}

const dnsService = new DnsService()
export default dnsService
