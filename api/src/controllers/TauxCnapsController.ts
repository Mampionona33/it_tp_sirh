import { Request, Response } from 'express'

class TauxCnapsController {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  getTauxEmployeur = (req: Request, res: Response) => {
    const tauxCnaps = Array(this.db['tauxCnaps']).filter((tauxCnaps) => {
      return tauxCnaps.type === 'employeur'
    })
    return res.status(200).json(tauxCnaps)
  }
  getTauxSalarie = (req: Request, res: Response) => {
    const tauxCnaps = Array(this.db['tauxCnaps']).filter((tauxCnaps) => {
      return tauxCnaps.type === 'salarie'
    })
    return res.status(200).json(tauxCnaps)
  }
}

export default TauxCnapsController
