import { Request, Response } from 'express'
import ParametreGeneral from '../schema/parametre.schema'

// Create - Créer de nouveaux paramètres de paie
export const createParametre = async (req: Request, res: Response) => {
  try {
    const parametreData = req.body
    const newParametre = new ParametreGeneral(parametreData)
    const savedParametre = await newParametre.save()
    res.status(201).json(savedParametre)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
}

// Read - Récupérer les paramètres de paie
export const getParametre = async (req: Request, res: Response) => {
  try {
    const parametre = await ParametreGeneral.findOne()
    res.status(200).json(parametre)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
}

// Update - Mettre à jour les paramètres de paie
export const updateParametre = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body
    const updatedParametre = await ParametreGeneral.findOneAndUpdate({}, updatedData, { new: true })
    res.status(200).json(updatedParametre)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
}

// Delete - Supprimer les paramètres de paie
export const deleteParametre = async (req: Request, res: Response) => {
  try {
    await ParametreGeneral.deleteMany({})
    res.status(200).json({ message: 'Paramètres de paie supprimés avec succès' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
}
