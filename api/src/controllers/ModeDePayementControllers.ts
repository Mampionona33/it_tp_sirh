import { Request, Response } from 'express'

class ModeDePayementControllers {
  private db: any
  constructor(db: any) {
    this.db = db
  }
  getAll = (req: Request, res: Response) => {
    return res.status(200).json(this.db['modeDePayement'])
  }

  getOneByVal = (req: Request, res: Response) => {
    const value = req.params.value
    const modeDePayement = this.db['modeDePayement'].find((modeDePayement: any) => {
      return modeDePayement.value === value
    })
    console.log(modeDePayement)

    return res.status(200).json(modeDePayement)
  }
}

export default ModeDePayementControllers
