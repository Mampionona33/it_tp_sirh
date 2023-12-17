import { Request, Response } from 'express'
class MouvementSalaireControllers {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  getAll = (req: Request, res: Response) => {
    return res.status(200).send(this.db['mouvementSalaire'])
  }
}

export default MouvementSalaireControllers
