import {
  IEmploye,
  EnumGenre,
  EnumCertificatEnfant,
  EnumBoolean,
} from '@src/interfaces/interfaceEmploye'
import { id } from 'date-fns/locale'
import { z } from 'zod'

export interface IFormEmployeSchema
  extends Omit<IEmploye, 'id' | 'matricule' | 'conjoint' | 'salaire_de_base'> {
  id?: string | number
  matricule: string
  conjoint?: Conjoint
  salaire_de_base: string
}

interface Conjoint {
  nom: string
  prenom: string
  date_naissance: string
  tel?: string
}

const formEmployeSchema: z.ZodType<IFormEmployeSchema> = z.object({
  id: z.union([z.string().optional(), z.number().optional()]),

  nom: z.string().min(2, { message: 'Le champ nom doit contenir au moins 2 caractères' }),

  prenom: z.string().min(2, { message: 'Le champ prénom doit contenir au moins 2 caractères' }),

  date_naissance: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Veuillez renseigner une date valide' }),

  lieu_naissance: z
    .string()
    .min(3, { message: 'Le champ lieu de naissance doit contenir au moins 3 caractères' }),

  date_delivrance_cin: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Veuillez renseigner une date valide' }),

  adresse: z.string().min(3, { message: 'Le champ addresse doit contenir au moins 3 caractères' }),

  nom_pere: z.string().optional(),

  nom_mere: z.string().optional(),

  telephone: z
    .union([
      z.string().regex(/^$|^[-+()\s\d]+$/, {
        message: 'Veuillez renseigner un numéro de numéro valide',
      }),
      z.literal(''),
    ])
    .optional(),

  email: z
    .union([
      z.string().email({ message: 'Veuillez renseigner une adresse email valide' }),
      z.literal(''),
    ])
    .optional(),

  num_cin: z
    .string()
    .refine((value) => value.length === 15, {
      message: 'Veuillez renseigner un numéro de carte d’identité valide',
    })
    .refine((value) => /^\d+(\s\d+)*$/.test(value), {
      message: 'Ce champ accepte uniquement des chiffres',
    })
    .refine((value) => /^\d{3}\s?\d{3}\s?\d{3}\s?\d{3}$/.test(value), {
      message: 'Veuillez suivre le format 000 000 000 000',
    }),

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
      nom: z.string().min(2, { message: 'Le champ nom doit contenir au moins 2 caractères' }),

      prenom: z.string().min(2, { message: 'Le champ prénom doit contenir au moins 2 caractères' }),

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

      tel: z
        .string()
        .regex(/^\+?\d{10}$/, { message: 'Veuillez renseigner un numéro de téléphone valide' })
        .optional(),

      email: z.string().email(),
    })
    .optional(),

  enfant: z
    .array(
      z.object({
        id: z.union([z.string().min(1, { message: 'Le champ est obligatoire' }), z.number()]),
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

  titre_poste: z.string().min(2, { message: 'Le champ poste doit contenir au moins 2 caractères' }),

  matricule: z
    .string()
    .min(2, { message: 'Le champ matricule doit contenir au moins 2 caractères' }),

  categorie: z.object({
    id: z.union([z.string().optional(), z.number().optional()]),
    label: z.string(),
    value: z.string(),
  }),

  date_embauche: z.string(),

  departement: z.string(),

  lieu_travail: z.string(),

  est_cadre: z.enum([EnumBoolean.OUI, EnumBoolean.NON]).optional(),

  travail_de_nuit: z.enum([EnumBoolean.OUI, EnumBoolean.NON]),

  salaire_de_base: z.string().regex(/^[1-9]\d*$/, {
    message: 'Veuillez renseigner un salaire valide',
  }),

  rib: z
    .string()
    .refine((value) => value.length === 26, {
      message: 'Veuillez renseigner un num de rib valide',
    })
    .refine((value) => /\s\d*$/.test(value), {
      message: 'Ce champ accepte uniquement des chiffres',
    })
    .refine((value) => /^\d{5} \d{5} \d{11} \d{2}$/.test(value), {
      message: 'Veuillez suivre le format 00000 00000 00000000000 00',
    })
    .optional(),

  mode_paiement_salaire: z.object({
    id: z.union([z.string().optional(), z.number().optional()]),
    label: z.string(),
    value: z.string(),
  }),

  num_cnaps: z
    .string()
    .min(2, { message: 'Le champ doit contenir au moins 2 caractères' })
    .optional(),

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
