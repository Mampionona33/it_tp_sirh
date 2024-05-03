import BulletinDePaie from '../schema/bulletinDePaie.schema'

export const addBulletinDePaie = async (req: any, res: any) => {
  try {
    const newBulletinDePaie = new BulletinDePaie(req.body)
    res.status(201).json(await newBulletinDePaie.save())
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
