import { Request, Response } from 'express'
import IrsaModel from '../schema/irsa.schema'

export const createIrsa = async (req: Request, res: Response) => {
  try {
    const irsaData = req.body
    const { year, month } = irsaData

    // Vérifier s'il existe déjà un enregistrement avec la même année et le même mois
    const existingIrsa = await IrsaModel.findOne({ year, month })

    if (existingIrsa) {
      // Un enregistrement existe déjà pour cette année et ce mois
      const updatedIrsaData = { ...existingIrsa.toObject(), ...irsaData }

      if (irsaData.irsa) {
        updatedIrsaData.irsa = {
          ...existingIrsa,
          ...irsaData.irsa,
        }
      }
      await IrsaModel.findOneAndUpdate(
        { year, month, matricule: irsaData.matricule },
        updatedIrsaData,
      )

      res.status(200).json({ message: 'Irsa updated successfully' })
    } else {
      const newIrsa = new IrsaModel(irsaData)
      const savedIrsa = await newIrsa.save()
      if (!savedIrsa) {
        return res
          .status(500)
          .json({ error: 'Erreur lors de la création du nouvel enregistrement' })
      }
      res.status(201).json(savedIrsa)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
}

export const getAllIrsa = async (req: Request, res: Response) => {
  try {
    const irsa = await IrsaModel.find()
    res.status(200).json(irsa)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getIrsaByYearMonth = async (req: Request, res: Response) => {
  try {
    const { year, month } = req.params
    const irsa = await IrsaModel.find({ year, month })
    console.log(irsa)
    if (!irsa || irsa.length === 0) {
      return res.status(404).json({ error: 'irsa not found' })
    }
    res.status(200).json(irsa)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
