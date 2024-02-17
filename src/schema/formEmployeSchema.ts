import {
  IEmploye,
  EnumGenre,
  EnumCertificatEnfant,
  EnumBoolean,
  Depart,
} from '@src/interfaces/interfaceEmploye'
import { dataTagSymbol } from '@tanstack/react-query'
import { z } from 'zod'

export interface IFormEmployeSchema extends Omit<IEmploye, 'id' | 'matricule' | 'conjoint'> {
  id?: string | number
  matricule: string
  conjoint?: Conjoint
}

interface Conjoint {
  nom: string
  prenom: string
  date_naissance: string
  tel?: string
}

// interface formEmployeDateProps extends Depart {
//   nom_matricule?: string
// }

const formEmployeSchema: z.ZodType<IFormEmployeSchema> = z
  .object({
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

    adresse: z
      .string()
      .min(3, { message: 'Le champ addresse doit contenir au moins 3 caractères' }),

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
      .refine((value) => /^\d+(\.\d+)*$/.test(value), {
        message: 'Ce champ accepte uniquement des chiffres',
      })
      .refine((value) => /^\d{3}\.?\d{3}\.?\d{3}\.?\d{3}$/.test(value), {
        message: 'Veuillez suivre le format 000.000.000.000',
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

        prenom: z
          .string()
          .min(2, { message: 'Le champ prénom doit contenir au moins 2 caractères' }),

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
          id: z.union([
            z.string().min(1, { message: 'ID enfant est obligatoire' }),
            z.number().min(1, { message: 'ID enfant est obligatoire' }),
          ]),
          nom: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
          prenom: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
          date_naissance: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Veuillez renseigner une date valide' }),
          lieu_naissance: z
            .string()
            .min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
          genre_enfant: z.enum([EnumGenre.MASCULIN, EnumGenre.FEMININ]),
          certificat: z
            .object({
              id: z.union([z.string().optional(), z.number().optional()]),
              label: z
                .string()
                .min(2, { message: 'Le champ certificat doit contenir au moins 2 caractères' }),
              value: z.enum([
                EnumCertificatEnfant.AUCUN,
                EnumCertificatEnfant.VIE,
                EnumCertificatEnfant.DECE,
                EnumCertificatEnfant.MEDICAL,
                EnumCertificatEnfant.SCOLARITE,
              ]),
            })
            .optional(),

          action: z.enum(['ajout', 'modifier']).optional(),
        }),
      )
      .optional(),

    titre_poste: z
      .string()
      .min(2, { message: 'Le champ poste doit contenir au moins 2 caractères' }),

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

    salaire_de_base: z.coerce.number().gte(1, {
      message: 'Le salaire doit être supérieur à 0Ar.',
    }),

    rib: z.string().optional(),

    mode_paiement_salaire: z.object({
      id: z.union([z.string().optional(), z.number().optional()]),
      label: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
      value: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
    }),

    num_cnaps: z.string().optional(),

    prime_et_avantage_permanent: z
      .array(
        z.object({
          id: z.number(),
          libelle: z.string(),
          montant: z.number(),
        }),
      )
      .optional(),

    depart: z.nullable(
      z
        .object({
          nom_matricule: z.string().optional(),

          date: z
            .string()
            .min(2, { message: 'Le champ date doit contenir au moins 2 caractères' })
            .optional(),
          motif: z
            .string()
            .min(2, { message: 'Le champ motif doit contenir au moins 2 caractères' })
            .optional(),
        })
        .optional(),
    ),

    actif: z.enum([EnumBoolean.OUI, EnumBoolean.NON]).optional(),

    indemnites: z
      .object({
        transport: z.number(),
        autres: z.number(),
      })
      .optional(),
    avance: z.number().optional(),
  })
  .refine(
    (data) => {
      const { depart } = data
      if (!depart) {
        return true
      } else if (depart && depart.nom_matricule && depart.nom_matricule.length > 0) {
        return true
      } else {
        return false
      }
    },
    {
      message: 'Le champ ne doit pas être vide',
      path: ['depart', 'nom_matricule'],
    },
  )
  .refine(
    (data) => {
      const { depart } = data
      if (!depart) {
        return true
      } else if (depart && depart.motif && depart.motif.length > 0) {
        return true
      } else {
        return false
      }
    },
    {
      message: 'Le champ ne doit pas être vide',
      path: ['depart', 'motif'],
    },
  )
  .refine(
    (data) => {
      const { depart, nom, matricule } = data
      if (!depart) {
        return true
      } else if (
        depart.nom_matricule !== undefined &&
        depart.nom_matricule.length > 2 &&
        depart.nom_matricule === `${nom} ${matricule}`
      ) {
        return true
      } else {
        return false
      }
    },
    {
      message: "Veuillez suivre le format 'nom matricule'",
      path: ['depart', 'nom_matricule'],
    },
  )
  .refine(
    (data) => {
      if (data.salaire_de_base) {
        return true
      } else {
        return false
      }
    },
    {
      message: 'Le champ ne doit pas être vide',
      path: ['salaire_de_base'],
    },
  )
  .refine(
    (data) => {
      if (data.salaire_de_base && data.salaire_de_base > 100000) {
        return true
      } else {
        return false
      }
    },
    {
      message: 'Le salaire ne doit pas depasser 100000',
      path: ['salaire_de_base'],
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
      // Accept empty string
      return true
    },
    {
      message: 'Veuillez suivre le format 00000 00000 00000000000 00.',
      path: ['rib'],
    },
  )

export default formEmployeSchema
