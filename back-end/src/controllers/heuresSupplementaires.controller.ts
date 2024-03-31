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

export const getSalarieHsByYearMonthMatricule = async (req: Request, res: Response) => {
  try {
    const { annee, mois, matricule } = req.params
    console.log(annee, mois, matricule)

    if (!annee || !mois || !matricule) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    const salarieHs = await HeuresSupplementaireModel.find(
      {
        annee,
        mois,
        matricule,
      },
      { hs: 1, hsi: 1, hsni: 1, hsni130: 1, hsni150: 1 },
    ).lean()

    res.status(200).json(...salarieHs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
