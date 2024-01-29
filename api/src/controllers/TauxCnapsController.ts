import { Request, Response } from 'express'

class TauxCnapsController {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  getAll = (req: Request, res: Response) => {
    try {
      const tauxCnaps = this.db['/cotisations'].filter((tnCnaps: any) => {
        return tnCnaps.type === 'CNAPS'
      })

      return res.status(200).json(...tauxCnaps)
    } catch (error) {
      console.error("Erreur lors de la récupération des taux CNAPS pour l'employeur :", error)
      return res
        .status(500)
        .json({ message: "Erreur lors de la récupération des taux CNAPS pour l'employeur" })
    }
  }
}

export default TauxCnapsController
