import {
  IEmploye,
  EnumGenre,
  EnumCertificatEnfant,
  EnumBoolean,
} from '@src/interfaces/interfaceEmploye'
import { z } from 'zod'

export interface IFormEmployeSchema extends Omit<IEmploye, 'categorie'> {
  categorie?: string
}

const formEmployeSchema: z.ZodType<IFormEmployeSchema> = z.object({
  id: z.string(),
  nom: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
  prenom: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
  date_naissance: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Veuillez renseigner une date valide' }),

  lieu_naissance: z.string().min(3, { message: 'Le champ doit contenir au moins 3 caractères' }),
  date_delivrance_cin: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Veuillez renseigner une date valide' }),
  adresse: z.string().min(3, { message: 'Le champ doit contenir au moins 3 caractères' }),
  nom_pere: z.string().optional(),
  nom_mere: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().email().optional(),
  num_cin: z
    .string()
    .regex(/^\d{3} \d{3} \d{3} \d{3}$/, { message: 'Veuillez suivre le format 000 000 000 000' }),
  genre: z.enum([EnumGenre.MASCULIN, EnumGenre.FEMININ]),
  contact_urgence: z
    .array(
      z.object({
        nom: z.string(),
        prenom: z.string(),
        tel: z.string(),
      }),
    )
    .optional(),
  conjoint: z
    .object({
      nom: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
      prenom: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
      date_naissance: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Veuillez renseigner une date valide' }),
      lieu_naissance: z
        .string()
        .min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
      adresse: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
      num_cin: z.string().regex(/^\d{3} \d{3} \d{3} \d{3}$/, {
        message: 'Veuillez suivre le format 000 000 000 000',
      }),
      tel: z.string(),
      email: z.string().email(),
    })
    .optional(),
  enfant: z
    .array(
      z.object({
        id: z.number(),
        nom: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
        prenom: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
        date_naissance: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Veuillez renseigner une date valide' }),
        lieu_naissance: z
          .string()
          .min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
        genre_enfant: z.enum([EnumGenre.MASCULIN, EnumGenre.FEMININ]),
        certificat: z.object({
          id: z.string().optional(),
          label: z.string(),
          value: z.enum([
            EnumCertificatEnfant.AUCUN,
            EnumCertificatEnfant.VIE,
            EnumCertificatEnfant.DECE,
            EnumCertificatEnfant.MEDICAL,
            EnumCertificatEnfant.SCOLARITE,
          ]),
        }),
        action: z.enum(['ajout', 'modifier']).optional(),
      }),
    )
    .optional(),
  titre_poste: z.string(),
  matricule: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
  categorie: z.string(),
  date_embauche: z.string(),
  departement: z.string(),
  lieu_travail: z.string(),
  est_cadre: z.enum([EnumBoolean.OUI, EnumBoolean.NON]).optional(),
  travail_de_nuit: z.enum([EnumBoolean.OUI, EnumBoolean.NON]),
  salaire_de_base: z.number(),
  rib: z.string().regex(/^\d{5} \d{5} \d{11} \d{2}$/, {
    message: 'Veuillez suivre le format 00000 00000 00000000000 00',
  }),
  mode_paiement_salaire: z.string(),
  num_cnaps: z.string().optional(),
  num_osie: z.string().optional(),
  prime_et_avantage_permanent: z
    .array(
      z.object({
        id: z.number(),
        libelle: z.string(),
        montant: z.number(),
      }),
    )
    .optional(),
  depart: z
    .object({
      date: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
      motif: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
    })
    .optional(),
  actif: z.enum([EnumBoolean.OUI, EnumBoolean.NON]).optional(),
  indemnites: z
    .object({
      transport: z.number(),
      autres: z.number(),
    })
    .optional(),
  avance: z.number().optional(),
})

export default formEmployeSchema
