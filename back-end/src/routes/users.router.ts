import { Router } from 'express'
import { createUser, loginUser } from '../controllers/users.controllers'

const userRouter = Router()

userRouter.post('/users', createUser)

userRouter.post('/login', loginUser)

export default userRouter
