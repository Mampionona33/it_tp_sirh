import ModeDePayement from '../schema/modeDePaiment.schema'
import { Request, Response } from 'express'

export const createModeDePayement = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Missing required fields in request body' })
    }
    const newModeDePayement = new ModeDePayement({
      label: req.body.label,
      value: req.body.value,
    })
    const savedModeDePayement = await newModeDePayement.save()
    res.status(201).json({ message: 'Mode de paiement created successfully', savedModeDePayement })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getAllModeDePayement = async (req: Request, res: Response) => {
  try {
    const modeDePayement = await ModeDePayement.find({})
    res.status(200).json({ modeDePayement })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
