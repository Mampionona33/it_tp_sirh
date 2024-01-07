import { Request, Response } from 'express'
import { IBulletinDePaieProps } from 'interfaces/interfaceBulletinDePaie'

export interface IGetOneProps {
  id?: number
  id_employe?: number | string
  date?: string
  validationDay?: string
  salaireBrut?: number
  salaireNet?: number
  status?: string
}
class HistoriquePaieController {
  private db: any
  constructor(db: Object) {
    this.db = db
  }

  getOne = (req: Request, res: Response) => {
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
        id: data[i].id,
        id_employe: data[i].salarie?.id,
        validationDay: data[i].validation.day,
        date: data[i].validation?.date,
        salaireBrut: data[i].salaireBrut,
        salaireNet: data[i].salaireNet,
        status: data[i].validation?.status,
      })
    }

    return res.status(200).send(resp)
  }
}

export default HistoriquePaieController
