import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
class SalaierControllers {
  private db: any
  constructor(db: any) {
    this.db = db
  }

  getAll = (req: Request, res: Response) => {
    setTimeout(() => {
      res.status(200).send(this.db['salaries'])
    }, 5000)
    // return res.status(200).send(this.db['salaries'])
  }

  getOne = (req: Request, res: Response) => {
    const { id } = req.params
    const salarie = this.db['salaries'].find((salarie: any) => salarie.id === id)
    setTimeout(() => {
      res.status(200).send(salarie)
    }, 5000)
  }

  create = (req: Request, res: Response) => {
    try {
      const dbFilePath = path.join(__dirname, '../db/db.json')

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

  update = async (req: Request, res: Response) => {
    try {
      const dbFilePath = path.join(__dirname, '../db/db.json')
      const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'))

      const { id } = req.params
      const data = req.body

      const employeeIndex = dbContent.salaries.findIndex(
        (employee: any) => Number(employee.id) === Number(id),
      )

      if (employeeIndex === -1) {
        return res.status(404).send('Employé non trouvé')
      }

      // Mettre à jour directement l'employé dans le tableau existant
      dbContent.salaries[employeeIndex] = {
        ...dbContent.salaries[employeeIndex],
        ...data,
      }

      console.log(dbContent.salaries[employeeIndex])

      // Écrire le contenu mis à jour dans le fichier db.json
      fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8')

      // Répondre avec la copie de l'employé existant (nouvelle version)
      res.status(200).json(dbContent.salaries[employeeIndex])
    } catch (error) {
      console.error("Une erreur s'est produite lors de la mise à jour de l'employé :", error)
      res.status(500).send('Erreur serveur')
    }
  }
}

export default SalaierControllers
