import { Request, Response } from 'express'
import { IUser } from 'interfaces/userInterfaces'

class AuthController {
  private db: any

  constructor(db: any) {
    this.db = db
    this.login = this.login.bind(this) // Ajoutez cette ligne pour lier correctement la méthode login à l'instance
  }

  login = (req: Request, res: Response): void => {
<<<<<<< HEAD
=======
    // Vérifiez si req.body est défini et non vide
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ success: false, message: 'Invalid request body' })
      return
    }

    const { email, password } = req.body
    console.log(req.body)
<<<<<<< HEAD
    const shouldConnect = this.isValidCredential(email, password)
    console.log(shouldConnect)

    if (shouldConnect) {
      res.status(200).send('Connecté')
    } else {
      // res.status(401).json({ success: false, message: 'Vérifier les identifications' })
      res.send('Vérifier les identifications')
=======

    if (this.isValidCredential(email, password)) {
      // res.status(200).json({ success: true })
      res.status(200).send('Connecté')
    } else {
      res.status(401).json({ success: false })
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
    }
  }

  isValidCredential(email: string, password: string): boolean {
<<<<<<< HEAD
    let isValid = false
    if (email && password) {
      isValid = this.db.users.some(
        (user: IUser): boolean => user.email === email && user.password === password,
      )
    }
    return isValid
=======
    return this.db.users.some((user: IUser) => user.email === email && user.password === password)
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
  }
}

export default AuthController
