import { Request, Response } from 'express'
import EmployeModel from '../schema/employe.schema'
import { format } from 'date-fns'

// Create - Créer un nouvel employé
export const createEmploye = async (req: Request, res: Response) => {
  try {
    const employeData = req.body
    const newEmploye = new EmployeModel(employeData)
    const savedEmploye = await newEmploye.save()
    res.status(201).json(savedEmploye)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Read - Récupérer tous les employés
export const getAllEmployes = async (req: Request, res: Response) => {
  try {
    const employes = await EmployeModel.find()
    const modifiedEmployes = employes.map((employe) => {
      return {
        ...employe.toObject(),
        id: employe._id.toString(),
      }
    })
    res.status(200).json(modifiedEmployes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Read - Récupérer un employé par son ID
export const getEmployeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const employe = await EmployeModel.findById(id).lean()
    if (!employe) {
      return res.status(404).json({ error: 'Employe not found' })
    }

    const formattedEmploye = {
      ...employe,
      id: employe._id.toString(),
      date_delivrance_cin:
        employe.date_delivrance_cin && format(employe.date_delivrance_cin, 'yyyy-MM-dd'),
      date_naissance: employe.date_naissance && format(employe.date_naissance, 'yyyy-MM-dd'),
      date_embauche: employe.date_embauche && format(employe.date_embauche, 'yyyy-MM-dd'),
      enfant:
        employe.enfant &&
        employe.enfant.map((enfant, index) => {
          return {
            ...enfant,
            date_naissance: enfant.date_naissance && format(enfant.date_naissance, 'yyyy-MM-dd'),
          }
        }),
    }

    res.status(200).json(formattedEmploye)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update - Mettre à jour les informations d'un employé
export const updateEmploye = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedData = req.body
    const updatedEmploye = await EmployeModel.findByIdAndUpdate(id, updatedData, { new: true })
    if (!updatedEmploye) {
      return res.status(404).json({ error: 'EmployeModel not found' })
    }
    res.status(200).json(updatedEmploye)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Delete - Supprimer un employé par son ID
export const deleteEmploye = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedEmploye = await EmployeModel.findByIdAndDelete(id)
    if (!deletedEmploye) {
      return res.status(404).json({ error: 'EmployeModel not found' })
    }
    res.status(200).json({ message: 'EmployeModel deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
