import { Request, Response } from 'express'
import IrsaModel from '../schema/irsa.schema'

export const createIrsa = async (req: Request, res: Response) => {
  try {
    const irsaData = req.body
    const newIrsa = new IrsaModel(irsaData)
    const savedIrsa = await newIrsa.save()
    if (!savedIrsa) {
      return res.status(500).json({ error: 'Internal server error' })
    }
    res.status(201).json(savedIrsa)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
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
    if (!irsa) {
      return res.status(404).json({ error: 'irsa not found' })
    }
    res.status(200).json(irsa)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
