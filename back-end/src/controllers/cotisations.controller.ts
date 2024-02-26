import { Request, Response } from 'express'
import Cotisations from '../schema/cotisations.schema'

export const getAllCotisation = async (req: Request, res: Response) => {
  try {
    console.log('try to find cotisations')
    const cotisations = await Cotisations.find()
    if (cotisations.length === 0) {
      res.status(404).json({ error: 'No cotisations found' })
      return
    } else {
      console.log(cotisations)
      res.status(200).json(cotisations)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createCotisation = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    // Vérifiez si le corps de la requête contient les données attendues
    if (
      !req.body ||
      !req.body.libelle ||
      !req.body.type ||
      !req.body.employeur ||
      !req.body.salarie ||
      !req.body.modeDePayement
    ) {
      return res.status(400).json({ error: 'Missing required fields in request body' })
    }

    // Créez une nouvelle instance de Cotisation avec les données du corps de la requête
    const newCotisation = new Cotisations({
      libelle: req.body.libelle,
      type: req.body.type,
      employeur: req.body.employeur,
      salarie: req.body.salarie,
      modeDePayement: req.body.modeDePayement,
    })

    // Sauvegardez la nouvelle cotisation dans la base de données
    const savedCotisation = await newCotisation.save()

    console.log(savedCotisation)

    // Renvoyez la nouvelle cotisation créée en réponse
    res.status(201).json(savedCotisation)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateCotisation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { libelle, type, employeur, salarie, modeDePayement } = req.body
    const updatedCotisation = await Cotisations.findByIdAndUpdate(
      id,
      { libelle, type, employeur, salarie, modeDePayement },
      { new: true },
    )
    if (!updatedCotisation) {
      res.status(404).json({ error: 'Cotisation not found' })
      return
    }
    res.status(200).json(updatedCotisation)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteCotisation = async (req: Request, res: Response) => {
  console.log(req.params)
  try {
    const { id } = req.params
    const deletedCotisation = await Cotisations.findByIdAndDelete({ _id: id })
    if (!deletedCotisation) {
      res.status(404).json({ error: 'Cotisation not found' })
      return
    }
    res.status(200).json({ message: 'Cotisation deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getCotisationCnaps = async (req: Request, res: Response) => {
  try {
    const coti = await Cotisations.find({ type: 'CNAPS' }).lean()

    if (!coti || coti.length === 0) {
      return res.status(404).json({ error: 'Cotisation CNAPS not found' })
    }

    res.status(200).json(coti)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
