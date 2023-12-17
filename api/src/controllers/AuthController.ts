import { Request, Response } from 'express'
import { IUser } from 'interfaces/userInterfaces'

class AuthController {
  private db: any

  constructor(db: any) {
    this.db = db
    this.login = this.login.bind(this) // Ajoutez cette ligne pour lier correctement la méthode login à l'instance
  }

  login = (req: Request, res: Response): void => {
    // Vérifiez si req.body est défini et non vide
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ success: false, message: 'Invalid request body' })
      return
    }

    const { email, password } = req.body
    console.log(req.body)

    if (this.isValidCredential(email, password)) {
      // res.status(200).json({ success: true })
      res.status(200).send('Connecté')
    } else {
      res.status(401).json({ success: false })
    }
  }

  isValidCredential(email: string, password: string): boolean {
    return this.db.users.some((user: IUser) => user.email === email && user.password === password)
  }
}

export default AuthController
