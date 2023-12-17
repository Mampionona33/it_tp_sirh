import { Request, Response } from 'express'
class CotisationController {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  getAll = (req: Request, res: Response) => {
    return res.status(200).send(this.db['cotisations'])
  }
}

export default CotisationController
