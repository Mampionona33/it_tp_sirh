import { Request, Response } from 'express'
import HeuresSupplementaireModel from '../schema/heuresSupplementaire.schema'
import mongoose from 'mongoose'

export const createHeuresSupplementaire = async (req: Request, res: Response) => {
  try {
    const heuresSupplementaireData = req.body.heuressup

    // Mapper les données et ajouter des identifiants
    const heuresSupplementaireDocuments = heuresSupplementaireData.map((data: any) => ({
      ...data,
      _id: new mongoose.Types.ObjectId(), // Générer un nouvel identifiant unique
    }))

    // Enregistrer les documents dans la base de données
    const savedHeuresSupplementaires = await HeuresSupplementaireModel.create(
      heuresSupplementaireDocuments,
    )

    res.status(201).json(savedHeuresSupplementaires)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
