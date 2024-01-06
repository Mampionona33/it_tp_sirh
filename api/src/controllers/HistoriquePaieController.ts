import { Request, Response } from 'express'
import { IBulletinDePaieProps } from 'interfaces/interfaceBulletinDePaie'

class HistoriquePaieController {
  private db: any
  constructor(db: Object) {
    this.db = db
  }

  getOne = (req: Request, res: Response) => {
    const { id } = req.params
    const listBulletinDePaie: IBulletinDePaieProps[] = this.db['bulletinDePaie']

    const data = listBulletinDePaie.filter((blt) => String(blt.salarie?.id) === id)

    return res.status(200).send(data)
  }
}

export default HistoriquePaieController
