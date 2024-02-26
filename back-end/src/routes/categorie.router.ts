import { createCategorie, getAllCategorie } from '../controllers/categories.controller'
import { Router } from 'express'

const categorieRouter = Router()

categorieRouter.post('/categorie-employe', createCategorie)
categorieRouter.get('/categorie-employe', getAllCategorie)

export default categorieRouter
