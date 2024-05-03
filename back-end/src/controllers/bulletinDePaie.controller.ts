import { format } from 'date-fns'
import BulletinDePaie from '../schema/bulletinDePaie.schema'
import { fr } from 'date-fns/locale'

export const addBulletinDePaie = async (req: any, res: any) => {
  try {
    const newBulletinDePaie = new BulletinDePaie(req.body)
    const savedBulletinDePaie = await newBulletinDePaie.save()
    if (savedBulletinDePaie) {
      //   res.status(201).json(savedBulletinDePaie)
      res.status(201).send('Paie enregistrée')
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getAllSalariesValidateBulletin = async (req: any, res: any) => {
  try {
    const { id, annee } = req.params
    const newDate = new Date(parseInt(annee), 0, 1)

    const historiquePaie = await BulletinDePaie.find({
      'validation.status': 'oui',
      'validation.date': { $eq: newDate },
      'salarie._id': id,
    })

    // Mapper les résultats pour obtenir le format désiré
    const result = historiquePaie.map((paie: any) => {
      console.log('paie', paie)
      const date = new Date(paie.validation.date)
      return {
        annee: date.getFullYear().toString(),
        mois: format(date, 'MMMM', { locale: fr }).toLowerCase(),
        matricule: paie.salarie.matricule,
        salarie_id: paie.salarie._id,
        validation_status: paie.validation.status,
      }
    })

    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
