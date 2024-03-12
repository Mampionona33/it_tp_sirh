import DnsModel from '../schema/dns.schema'
import { Request, Response } from 'express'

export const createDns = async (req: Request, res: Response) => {
  try {
    const dnsData = req.body
    const newDns = new DnsModel(dnsData)
    const savedDns = await newDns.save()
    res.status(201).json(savedDns)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getDnsByYearPeriod = async (req: Request, res: Response) => {
  try {
    const { annee, periode } = req.params
    const dns = await DnsModel.find({
      'travailleur.annee': annee,
      'travailleur.trimestre': periode,
    })

    if (!dns) {
      return res.status(404).json({ error: 'Dns not found' })
    }
    res.status(200).json(dns)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const addDns = async (req: Request, res: Response) => {
  try {
    const dnsData = req.body
    const validationDate = new Date(dnsData.validation.date)
    const annee = validationDate.getFullYear().toString()
    const mois = validationDate.getMonth() + 1
    const moisString = mois.toString().padStart(2, '0')

    const data = {
      mois: moisString,
      annee: annee,
      avantage_du_mois: dnsData.avantage_du_mois,
      cin: dnsData.salarie.num_cin,
      date_depart: dnsData.salarie.date_depart,
      date_embauche: dnsData.salarie.date_embauche,
      hs_non_plafonne: dnsData.hs_non_plafonne,
      hs_plafonne: dnsData.hs_plafonne,
      matricule: dnsData.salarie.matricule,
      nom: dnsData.salarie.nom,
      num_cnaps: dnsData.salarie.num_cnaps,
      prenom: dnsData.salarie.prenom,
      salaire_du_mois: dnsData.salarie.salaire_de_base,
      taux_cotisation_cnaps_salarie: dnsData.tauxCnaps,
      temps_presence: dnsData.totalHn,
      trimestre: calculTrimestre(mois),
    }

    console.log(data)

    const newDns = new DnsModel(data)
    const savedDns = await newDns.save()
    res.status(201).json(savedDns)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateDnsByYearPeriod = async (req: Request, res: Response) => {
  try {
    const { annee, period } = req.params
    const { employeur, travailleur } = req.body
    const dns = await DnsModel.findOneAndUpdate(
      { annee: annee, mois: period },
      { employeur, travailleur },
      { new: true },
    )

    if (!dns) {
      return res.status(404).json({ error: 'Dns not found' })
    }
    res.status(200).json(dns)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const calculTrimestre = (mois: number): string => {
  let result = ''
  switch (mois) {
    case 1 || 2 || 3:
      result = 't1'
      break
    case 4 || 5 || 6:
      result = 't2'
      break
    case 7 || 8 || 9:
      result = 't3'
      break
    case 10 || 11 || 12:
      result = 't4'
      break

    default:
      break
  }
  return result
}
