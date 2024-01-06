import { Request, Response } from 'express'

class HistoriquePaieController {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  getOne(req: Request, res: Response) {
    console.log(req.params)

    return res.status(200).send('ok')
  }
}

export default HistoriquePaieController
