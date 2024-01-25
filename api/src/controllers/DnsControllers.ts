import { Request, Response } from 'express'

export interface travailleurProps {
  id: number
  annee: string
  trimestre: string
  mois: string
  matricule: string
  nom: string
  prenom: string
  date_embauche: string
  date_depart: null | string
  salaire_du_mois: number
  avantage_du_mois: number
  temps_presence: number
  hs_non_plafonne: number
  hs_plafonne: number
  num_cnaps: string
  cin: string
  created_at: null | string
  ref_employeur: string
  updated_at: null | string
  taux_cotisation_cnaps_employeur: number
  taux_cotisation_cnaps_salarie: number
}

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

      const travailleursObjet: { [key: number]: any } = travailleurs.reduce(
        (acc: { [key: number]: any }, travailleur: any) => {
          acc[travailleur.id] = travailleur
          return acc
        },
        {},
      )

      return {
        travailleur: travailleursObjet,
        employeur: dns.employeur,
        cotisation: dns.cotisation,
      }
    })

    setTimeout(() => {
      res.status(200).json(data[0])
    }, 3000)
  }
}

export default DnsControllers
