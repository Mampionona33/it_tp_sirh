import { Request, Response } from 'express'
import HistoriquePaieModel from '../schema/historiquePaie.schema'

export const createHistoriquePaie = async (req: Request, res: Response) => {
  try {
    const historiquePaieData = req.body
    const newHistoriquePaie = new HistoriquePaieModel(historiquePaieData)
    const savedHistoriquePaie = await newHistoriquePaie.save()
    res.status(201).json(savedHistoriquePaie)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// export const getHistoriquePaieByIdYear = async (req: Request, res: Response) => {
//   try {
//     const { id, annee } = req.params
//     const historiquePaie = await HistoriquePaieModel.find({ salarie_id: id, annee: annee }).lean()
//     if (!historiquePaie) {
//       return res.status(404).json({ error: 'HistoriquePaie not found' })
//     }
//     res.status(200).json(historiquePaie)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// }
