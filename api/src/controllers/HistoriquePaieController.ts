import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Request, Response } from 'express'
import { IBulletinDePaieProps } from 'interfaces/interfaceBulletinDePaie'

export interface IGetOneProps {
  salarie_id?: number
  annee?: string | number | Date
  matricule?: string
  mois?: string | number | Date
  validation_status?: string
}
class HistoriquePaieController {
  private db: any
  constructor(db: Object) {
    this.db = db
  }

  getAllByIdEmployeAndDate = (req: Request, res: Response) => {
    const { id, annee } = req.params
    const listBulletinDePaie: IBulletinDePaieProps[] = this.db['bulletinDePaie']
    const resp: IGetOneProps[] = []

    const data = listBulletinDePaie.filter(
      (blt) =>
        String(blt.salarie?.id) === id &&
        new Date(blt.validation?.date ?? '').getFullYear() === parseInt(annee, 10),
    )

    for (let i = 0; i < data.length; i++) {
      resp.push({
        salarie_id: data[i].salarie?.id,
        annee: data[i].validation?.date,
        matricule: data[i].salarie?.matricule,
        mois: data[i].validation?.date
          ? format(new Date(data[i].validation.date as string | number), 'MMMM', { locale: fr })
          : 'Date non définie',

        validation_status: data[i].validation?.status,
      })
    }

    setTimeout(() => {
      return res.status(200).send(resp)
    }, 5000)
  }

  getDetailsById = (req: Request, res: Response) => {
    const { id, annee, mois } = req.params

    // Vérifier si les paramètres nécessaires sont fournis et valides
    if (!id || isNaN(Number(id)) || !annee || isNaN(Number(annee)) || !mois) {
      return res.status(400).send({ error: 'Paramètres invalides ou manquants.' })
    }

    const listBulletinDePaie: IBulletinDePaieProps[] = this.db['bulletinDePaie']

    let data: IBulletinDePaieProps | undefined

    listBulletinDePaie.forEach((blt) => {
      const salarieId = String(blt.salarie?.id)
      const validationDate = blt.validation?.date || ''

      const validAnne = new Date(validationDate).getFullYear()
      const validMonth = format(new Date(validationDate), 'MMMM', { locale: fr })

      if (
        salarieId === String(id) &&
        validAnne === Number(annee) &&
        validMonth.toLowerCase() === mois.toLowerCase()
      ) {
        data = blt
        return
      }
    })

    console.log(data)

    if (!data) {
      // Aucun bulletin de paie correspondant trouvé
      return res.status(404).send({ error: 'Bulletin de paie non trouvé.' })
    }

    res.status(200).send(data)
  }
}

export default HistoriquePaieController
