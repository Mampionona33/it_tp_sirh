import OmsiModel from '../schema/omsi.schema'
import { Request, Response } from 'express'

export const createOmsi = async (req: Request, res: Response) => {
  try {
    const omsiData = req.body
    const newOmsi = new OmsiModel(omsiData)
    const savedOmsi = await newOmsi.save()
    res.status(201).json(savedOmsi)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getOmsiByPeriodeYear = async (req: Request, res: Response) => {
  try {
    const { annee, periode } = req.params
    const omsi = await OmsiModel.findOne({ annee, periode })
    if (!omsi) {
      return res.status(404).json({ error: 'Omsi not found' })
    }
    res.status(200).json(omsi)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
