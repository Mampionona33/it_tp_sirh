import { EnumGenre } from '@src/interfaces/interfaceEmploye'
import { z } from 'zod'

const employeSchema = z
  .object({
    nom: z.string().optional(),
    prenom: z.string().optional(),
    matricule: z.union([z.string(), z.number()]).optional(),
    'categorie/label': z.string().optional(),
    'categorie/value': z.string().optional(),
    date_delivrance_cin: z.number().optional(),
    adresse: z.string().optional(),
    date_embauche: z.number().optional(),
    date_naissance: z.number().optional(),
    departement: z.string().optional(),
    num_cin: z.string().optional(),
    email: z.string().optional(),
    genre: z.nativeEnum(EnumGenre),
    num_cnaps: z.string().optional(),
    lieu_naissance: z.string().optional(),
    lieu_travail: z.string().optional(),
    'mode_paiement_salaire/label': z.string(),
    'mode_paiement_salaire/value': z.string(),
    nom_mere: z.string().optional(),
    nom_pere: z.string().optional(),
    rib: z.string().optional(),
    salaire_de_base: z
      .number()
      .min(100000, { message: 'Le salaire de base doit être supérieur à 100000' })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.nom) {
        return false
      }
      return true
    },
    { message: 'Veuillez renseigner le nom', path: ['nom'] },
  )
  .refine(
    (data) => {
      if (!data.matricule) {
        return false
      }
      return true
    },
    {
      message: 'Veuillez renseigner le matricule',
      path: ['matricule'],
    },
  )
  .refine(
    (data) => {
      if (!data.salaire_de_base) {
        return false
      }
      return true
    },
    {
      message: 'Veuillez renseigner le salaire de base',
      path: ['salaire_de_base'],
    },
  )
  .refine(
    (data) => {
      if (!data.date_embauche) {
        return false
      }
      return true
    },
    {
      message: "Veuillez renseigner la date d'embauche",
      path: ['date_embauche'],
    },
  ).refine((data) => {
    if (!data.num_cnaps) {
      return false
    }
    return true
  },{
    message: 'Veuillez renseigner le numéro CNAPS',
    path: ['num_cnaps'],
  })
  .refine(
    (data) => {
      if (!data.num_cin) {
        return false
      }
      return true
    },
    {
      message: 'Veuillez renseigner le numéro de CIN',
      path: ['num_cin'],
    },
  )
  .refine(
    (data) => {
      if (!data.date_naissance) {
        return false
      }
      return true
    },
    {
      message: 'Veuillez renseigner la date de naissance',
      path: ['date_naissance'],
    },
  )
  .refine(
    (data) => {
      if (data.rib) {
        if (
          data.rib.length > 0 &&
          /^\d{5} \d{5} \d{11} \d{2}$/.test(data.rib) &&
          /\s\d*$/.test(data.rib)
        ) {
          return true
        }
        return false
      }
      return true
    },
    {
      message: 'Veuillez suivre le format 00000 00000 00000000000 00.',
      path: ['rib'],
    },
  )
  .refine(
    (data) => {
      if (!data.adresse) {
        return false
      }
      return true
    },
    {
      message: "Veuillez renseigner l'adresse",
      path: ['adresse'],
    },
  )

export default employeSchema
