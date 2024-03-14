import OmsiModel from '../schema/omsi.schema'
import { Request, Response } from 'express'

export const createOrUpdateOmsi = async (req: Request, res: Response) => {
  try {
    const omsiData = req.body
    const { matricule, annee, periode } = omsiData

    // Vérifie si des données existent pour le matricule, l'année et la période spécifiés
    const existingOmsi = await OmsiModel.findOne({ matricule, annee, periode })

    if (existingOmsi) {
      // Si des données existent, les mettre à jour
      const updatedOmsiData = { ...existingOmsi.toObject(), ...omsiData }

      // Si les salaires mensuels sont définis dans la requête entrante, les remplacer
      if (omsiData.salaires) {
        updatedOmsiData.salaires = {
          ...existingOmsi.salaires,
          ...omsiData.salaires,
        }
      }

      await OmsiModel.findOneAndUpdate({ matricule, annee, periode }, updatedOmsiData)
      res.status(200).json({ message: 'Omsi updated successfully' })
    } else {
      // Si aucune donnée n'existe, créer de nouvelles données
      const newOmsi = new OmsiModel(omsiData)
      await newOmsi.save()
      res.status(201).json({ message: 'New Omsi created successfully' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getOmsiByPeriodeYear = async (req: Request, res: Response) => {
  try {
    const { annee, periode } = req.params
    const omsi = await OmsiModel.find({ annee, periode })
    if (!omsi) {
      return res.status(404).json({ error: 'Omsi not found' })
    }
    res.status(200).json(omsi)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
