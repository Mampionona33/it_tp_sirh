import Categories from '../schema/categorie.schema'
import { NextFunction, Request, Response } from 'express'

export const getAllCategorie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('try to find all categories')
    const categories = await Categories.find({})
    res.status(200).json(categories)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createCategorie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body && (!req.body.label || req.body.value)) {
      return res.status(400).json({ error: 'Missing required fields in request body' })
    }
    const newCat = new Categories({
      label: req.body.label,
      value: req.body.value,
    })
    const savedCat = await newCat.save()
    res.status(201).json({ message: 'Categorie created successfully', savedCat })
  } catch (error) {
    console.log('error on create Categorie', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
