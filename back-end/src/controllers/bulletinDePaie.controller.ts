import { format, parse } from 'date-fns'
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
    const endOfYear = new Date(parseInt(annee), 11, 31, 23, 59, 59) // 31 décembre de l'année spécifiée à 23h59m59s

    const historiquePaie = await BulletinDePaie.find({
      'validation.status': 'oui',
      'validation.date': { $gte: newDate, $lte: endOfYear },
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

export const getBulletinDePaieByIdYearAndMonth = async (req: any, res: any) => {
  try {
    const { id, annee, mois } = req.params
    console.log('id, annee, mois', id, annee, mois)

    // Convertir le mois de format "MMMM" en un nombre entre 1 et 12
    const moisNumber = parseInt(
      format(parse(mois, 'MMMM', new Date(annee, 0), { locale: fr }), 'M', { locale: fr }),
    )
    if (moisNumber < 1 || moisNumber > 12) {
      return res.status(400).json({ error: 'Mois invalide' })
    }

    // Créer une nouvelle date en utilisant le premier jour du mois spécifié
    const newDate = new Date(annee, moisNumber - 1, 1)
    const endOfMonth = new Date(annee, moisNumber, 0, 23, 59, 59)
    console.log('newDate', newDate)

    const historiquePaie = await BulletinDePaie.find({
      'validation.status': 'oui',
      'salarie._id': id,
      'validation.date': { $gte: newDate, $lte: endOfMonth },
    }).lean()

    if (!historiquePaie || historiquePaie.length === 0) {
      return res.status(404).json({ error: 'HistoriquePaie not found' })
    }

    res.status(200).json(...historiquePaie)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
