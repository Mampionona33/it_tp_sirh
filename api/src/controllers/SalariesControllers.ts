import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
class SalaierControllers {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  getAll = (req: Request, res: Response) => {
    return res.status(200).send(this.db['salaries'])
  }

  create = (req: Request, res: Response) => {
    try {
      // Construire le chemin complet vers le fichier db.json en utilisant __dirname
      const dbFilePath = path.join(__dirname, '../db/db.json')

      // Charger le contenu actuel du fichier db.json
      const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'))

      // Ajouter la nouvelle donnée au tableau dans le fichier db.json
      dbContent.salaries.push(req.body)

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

export default SalaierControllers
