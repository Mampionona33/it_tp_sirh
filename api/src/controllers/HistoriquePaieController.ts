import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Request, Response } from 'express'
import { IBulletinDePaieProps } from 'interfaces/interfaceBulletinDePaie'

export interface IGetOneProps {
  salarie_id?: number
  annee?: string | number | Date
  matricule?: string
  mois?: string | number | Date
  validation_status?: string
}
class HistoriquePaieController {
  private db: any
  constructor(db: Object) {
    this.db = db
  }

  getAllByIdEmployeAndDate = (req: Request, res: Response) => {
    const { id, annee } = req.params
    const listBulletinDePaie: IBulletinDePaieProps[] = this.db['bulletinDePaie']
    const resp: IGetOneProps[] = []

    const data = listBulletinDePaie.filter(
      (blt) =>
        String(blt.salarie?.id) === id &&
        new Date(blt.validation?.date ?? '').getFullYear() === parseInt(annee, 10),
    )

    for (let i = 0; i < data.length; i++) {
      resp.push({
        salarie_id: data[i].salarie?.id,
        annee: data[i].validation?.date,
        matricule: data[i].salarie?.matricule,
        mois: data[i].validation?.date
          ? format(new Date(data[i].validation.date as string | number), 'MMMM', { locale: fr })
          : 'Date non définie',

        validation_status: data[i].validation?.status,
      })
    }

    return res.status(200).send(resp)
  }

  getDetailsById = (req: Request, res: Response) => {
    const { id, annee, mois } = req.params
    const listBulletinDePaie: IBulletinDePaieProps[] = this.db['bulletinDePaie']

    console.log(id, annee)

    const data = listBulletinDePaie.filter((blt) => {
      const salarieId = String(blt.salarie?.id)
      const validationDate = blt.validation?.date || ''

      const validAnne = new Date(validationDate).getFullYear()
      const validMonth = format(new Date(validationDate).getMonth() - 1, 'MMMM', { locale: fr })
      console.log(validationDate)

      if (salarieId === String(id) && validAnne === Number(annee) && validMonth === mois) {
        return true
      }

      return false
    })[0]
    console.log(data)

    res.status(200).send(data)
  }
}

export default HistoriquePaieController
