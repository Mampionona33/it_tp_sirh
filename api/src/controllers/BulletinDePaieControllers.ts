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
      // Ajouter la nouvelle donnée au tableau dans le fichier db.json
      dbContent.bulletinDePaie.push({ ...req.body, id })

      // Écrire le contenu mis à jour dans le fichier db.json
      fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8')

      // Répondre avec la nouvelle donnée
      res.status(201).json(req.body)
    } catch (error) {
      // En cas d'erreur, répondre avec un statut d'erreur
      console.error("Une erreur s'est produite lors de l'écriture dans le fichier db.json :", error)
      res.status(500).send('Erreur serveur')
    }
  }
}

export default BulletinDePaieControllers
