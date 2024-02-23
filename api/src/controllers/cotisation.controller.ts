import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const cotisationClient = new PrismaClient().cotisations

export const getAllCotisation = async (req: Request, res: Response) => {
  try {
    const allCotisation = await cotisationClient.findMany()
    res.status(200).json({ data: allCotisation })
  } catch (error) {
    console.log(error)
  }
}
