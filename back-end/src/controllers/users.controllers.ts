import User from '../schema/user.schema'
import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Missing required fields in request body' })
    }

    const salt = await bcrypt.genSalt(10)
    const pswdHash = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      email: req.body.email,
      password: pswdHash,
    })

    const savedUser = await newUser.save()
    res.status(201).json({ message: 'User created successfully', savedUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Missing required fields in request body' })
    }
    const user = await User.findOne({ email: req.body.email })

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    // Replace the second line with the first one in the future
    // for now the other backend use this worst methode
    // res.status(200).json({ message: 'Login successful', user })
    res.status(200).send('Connecté')
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
