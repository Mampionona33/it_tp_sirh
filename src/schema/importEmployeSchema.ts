import { EnumGenre } from '@src/interfaces/interfaceEmploye'
import { z } from 'zod'

const employeSchema = z.object({
  nom: z.string(),
  prenom: z.string(),
  matricule: z.union([z.string(), z.number()]), // Permettre les nombres et les chaînes de caractères pour le matricule
  'categorie/label': z.string(),
  'categorie/value': z.string(),
  date_delivrance_cin: z.number(),
  date_embauche: z.number(),
  date_naissance: z.number(),
  departement: z.string(),
  email: z.string().optional(),
  genre: z.nativeEnum(EnumGenre),
  lieu_naissance: z.string(),
  lieu_travail: z.string(),
  'mode_paiement_salaire/label': z.string(),
  'mode_paiement_salaire/value': z.string(),
  nom_mere: z.string().optional(),
  nom_pere: z.string().optional(),
  rib: z.string(),
  salaire_de_base: z.number(),
})

export default employeSchema
