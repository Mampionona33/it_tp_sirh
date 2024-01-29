import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express'
import { format } from 'date-fns'

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

  private getPeriode = (date: string): string => {
    const month = new Date(date).getMonth() + 1

    switch (month) {
      case 1:
      case 2:
      case 3:
        return 't1'
      case 4:
      case 5:
      case 6:
        return 't2'
      case 7:
      case 8:
      case 9:
        return 't3'
      case 10:
      case 11:
      case 12:
        return 't4'
      default:
        return 't1'
    }
  }

  create = (req: Request, res: Response) => {
    try {
      const data = req.body
      const dbFilePath = path.join(__dirname, '../db/db.json')

      const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'))

      // Vérifier si le tableau dns existe et s'il contient des éléments
      if (Array.isArray(dbContent.dns) && dbContent.dns.length > 0) {
        // Accéder au premier élément du tableau dns
        const firstDnsItem = dbContent.dns[0]
        // Vérifier si la propriété travailleur existe dans le premier élément de dns
        if (firstDnsItem.travailleur) {
          const id = firstDnsItem.travailleur.length + 1

          const formatedData = {
            id: id,
            annee: new Date(data.validation.date).getFullYear(),
            trimestre: this.getPeriode(data.validation.date),
            mois: new Date(data.validation.date).getMonth() + 1,
            matricule: data.salarie.matricule,
            nom: data.salarie.nom,
            prenom: data.salarie.prenom,
            date_embauche: data.salarie.date_embauche,
            date_depart: data.salarie.depart.date,
            salaire_du_mois: 1000000,
            avantage_du_mois: 100000,
            temps_presence: 160,
            num_cnaps: data.salarie.depart.num_cnaps,
            cin: data.salarie.depart.num_cin,
            created_at: format(new Date(data.validation.date), 'yyyy-MM-dd'),
            updated_at: null,
          }

          // Ajouter les données formatées à la propriété travailleur
          dbContent.dns[0].travailleur.push({ ...formatedData })
          fs.writeFileSync(dbFilePath, JSON.stringify(firstDnsItem, null, 2), 'utf-8')
          // Envoi de la réponse
          res.status(200).json({ message: 'Dns a été créée avec succès.' })
        } else {
          throw new Error(
            "La propriété travailleur n'est pas définie dans le premier élément de dns.",
          )
        }
      } else {
        throw new Error('Le tableau dns est soit inexistant, soit vide.')
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'écriture dans le fichier db.json :", error)
      res.status(500).send('Erreur serveur')
    }
  }
}

export default DnsControllers
