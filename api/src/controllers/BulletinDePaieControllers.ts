import path from 'path'
import fs from 'fs'
import { Request, Response } from 'express'

class BulletinDePaieControllers {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  create = (req: Request, res: Response) => {
    try {
      const dbFilePath = path.join(__dirname, '../db/db.json')

      const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'))

      const id = dbContent.bulletinDePaie.length + 1

      dbContent.bulletinDePaie.push({ ...req.body, id })

      fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8')

      res.status(201).json({ message: 'Paie enregistrée' })
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'écriture dans le fichier db.json :", error)
      res.status(500).send('Erreur serveur')
    }
  }
}

export default BulletinDePaieControllers
