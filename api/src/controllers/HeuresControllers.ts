import { Request, Response } from 'express'
import { parse } from 'date-fns'
class HeuresControllers {
  private db: any
  constructor(db: any) {
    this.db = db
  }
  formatDate = (date: string) => {
    const parsedDate = parse(date, 'dd/MM/yyyy', new Date())
    return parsedDate
  }

  getOne = (req: Request, res: Response) => {
    const matricule = req.body.matricule
    const dateDebutString = req.body.dateDebut
    const dateFinString = req.body.dateFin

    const formatedDateDebut = this.formatDate(dateDebutString)
    const formatedDateFin = this.formatDate(dateFinString)

    const data = this.db['/employeeHours']
      .map((employHrs: any) => {
        const formatedEmployerDate = this.formatDate(employHrs.date)

        if (
          String(employHrs.matricule) === String(matricule) &&
          formatedDateDebut <= formatedEmployerDate &&
          formatedDateFin >= formatedEmployerDate
        ) {
          return employHrs
        } else {
          return null
        }
      })
      .filter((item: any) => item !== null)

    res.status(200).json(data)
  }
}

export default HeuresControllers
