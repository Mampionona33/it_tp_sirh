import { Request, Response } from 'express'
class SalaierControllers {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  getAll = (req: Request, res: Response) => {
    return res.status(200).send(this.db['salaries'])
  }

  create = (req: Request, res: Response) => {
    const { nom, prenom, date_naissance } = req.body
    res.status(200).json({ nom, prenom, date_naissance })
  }
}

export default SalaierControllers
