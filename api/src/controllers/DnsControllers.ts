import { Request, Response } from 'express'

class DnsControllers {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  fetchDns = (req: Request, res: Response) => {
    const { annee, periode } = req.params

    const data = this.db['dns'].map((dns: any) => {
      const travailleurs = dns.travailleur.filter((trav: any) => {
        return trav.trimestre === periode && trav.annee === annee
      })

      return { travailleurs, employeur: dns.employeur, cotisation: dns.cotisation }
    })

    setTimeout(() => {
      res.status(200).json(data[0])
    }, 3000)
  }
}

export default DnsControllers
