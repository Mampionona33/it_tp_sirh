import { Request, Response } from 'express'
import { IUser } from 'interfaces/userInterfaces'

class AuthController {
  private db: any

  constructor(db: any) {
    this.db = db
    this.login = this.login.bind(this) // Ajoutez cette ligne pour lier correctement la méthode login à l'instance
  }

  login = (req: Request, res: Response): void => {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ success: false, message: 'Invalid request body' })
      return
    }

    const { email, password } = req.body
    console.log(req.body)
    const shouldConnect = this.isValidCredential(email, password)
    console.log(shouldConnect)

    if (shouldConnect) {
      setTimeout(() => {
        res.status(200).send('Connecté')
      }, 5000)
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
  }

  isValidCredential(email: string, password: string): boolean {
    let isValid = false
    if (email && password) {
      isValid = this.db.users.some(
        (user: IUser): boolean => user.email === email && user.password === password,
      )
    }
    return isValid
  }
}

export default AuthController
