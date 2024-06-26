import {
  IEmploye,
  EnumGenre,
  EnumCertificatEnfant,
  EnumBoolean,
  Depart,
} from '@src/interfaces/interfaceEmploye'
import { date, z } from 'zod'
import { compareAsc, differenceInYears } from 'date-fns'
import path from 'path'

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

const formEmployeSchema: z.ZodType<IFormEmployeSchema> = z
  .object({
    id: z.union([z.string().optional(), z.number().optional()]),

    nom: z.string().min(2, { message: 'Le champ nom doit contenir au moins 2 caractères' }),

    prenom: z.string().nullable().optional(),

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

    nom_pere: z.nullable(z.string().nullable().optional()),

    nom_mere: z.nullable(z.string().nullable().optional()),

    telephone: z.nullable(
      z
        .union([
          z.string().regex(/^$|^[-+()\s\d]+$/, {
            message: 'Veuillez renseigner un numéro de numéro valide',
          }),
          z.literal(''),
        ])
        .optional(),
    ),

    email: z.nullable(
      z
        .union([
          z.string().email({ message: 'Veuillez renseigner une adresse email valide' }),
          z.literal(''),
        ])
        .optional(),
    ),

    num_cin: z
      .string()
      .refine((value) => value.length === 15, {
        message: 'Veuillez renseigner un numéro de carte d’identité valide 000.000.000.000',
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
          prenom: z.string().optional(),
          date_naissance: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Veuillez renseigner une date valide' })
            .refine(
              (value) => {
                const result = compareAsc(new Date(value), new Date())
                if (result === -1 || result === 0) {
                  return true
                } else {
                  return false
                }
              },
              {
                message:
                  'Veuillez renseigner une date de naissance valide, Vous avez saisi une date dans le futur',
              },
            ),
          lieu_naissance: z
            .string()
            .min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
          genre_enfant: z.enum([EnumGenre.MASCULIN, EnumGenre.FEMININ]),

          certificat: z.nullable(
            z
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
          ),

          action: z.enum(['ajout', 'modifier']).optional(),
        }),
      )
      .optional(),

    matricule: z
      .string()
      .min(2, { message: 'Le champ matricule doit contenir au moins 2 caractères' }),

    categorie: z.object({
      id: z.union([z.string().optional(), z.number().optional()]),
      label: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
      value: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
    }),

    date_embauche: z.string(),

    departement: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),

    titre_poste: z
      .string()
      .min(3, { message: 'Le champ poste doit contenir au moins 2 caractères' }),

    lieu_travail: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),

    est_cadre: z.enum([EnumBoolean.OUI, EnumBoolean.NON]).optional(),

    travail_de_nuit: z.enum([EnumBoolean.OUI, EnumBoolean.NON], {
      errorMap: () => ({ message: 'Veuillez renseigner une valeur' }),
    }),

    salaire_de_base: z.coerce.number().gte(1, {
      message: 'Le salaire doit être supérieur à 0Ar.',
    }),

    rib: z.string().nullable().optional(),

    mode_paiement_salaire: z.object({
      id: z.union([z.string().optional(), z.number().optional()]),
      label: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
      value: z.string().min(2, { message: 'Le champ doit contenir au moins 2 caractères' }),
    }),

    num_cnaps: z.string().nullable().optional(),

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
      if (!data.categorie) {
        return true
      } else {
        return true
      }
    },
    {
      message: 'Le champ select ne doit pas être vide',
      path: ['categorie'],
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
      if (data.salaire_de_base && data.salaire_de_base >= 100000) {
        return true
      } else {
        return false
      }
    },
    {
      message: 'Le salaire doit étre superieur ou égal à 100000Ar.',
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
  .refine((data) => {
    if (data.enfant && data.enfant.length > 0) {
      for (const enfant of data.enfant) {
        if (!enfant.nom) {
          return {
            message: 'Le champ ne doit pas être vide',
            path: ['enfant', 'nom'],
          }
        }
        if (!enfant.date_naissance) {
          return {
            message: 'Le champ ne doit pas être vide',
            path: ['enfant', 'date_naissance'],
          }
        }
        if (!enfant.lieu_naissance) {
          return {
            message: 'Le champ ne doit pas être vide',
            path: ['enfant', 'lieu_naissance'],
          }
        }
        if (!enfant.genre_enfant) {
          return {
            message: 'Le champ ne doit pas être vide',
            path: ['enfant', 'genre_enfant'],
          }
        }
      }
    }
    return true
  })
  .refine(
    (data) => {
      if (
        !data.date_naissance ||
        differenceInYears(new Date(), new Date(data.date_naissance)) < 18
      ) {
        console.log('shoud show error')
        return false
      }
      return true
    },
    {
      message: "L'age minimum est de 18 ans",
      path: ['date_naissance'],
    },
  )
  .refine(
    (data) => {
      if (
        !data.date_naissance ||
        differenceInYears(new Date(), new Date(data.date_naissance)) > 65
      ) {
        console.log('shoud show error')
        return false
      }
      return true
    },
    {
      message: "L'age maximum est de 65 ans",
      path: ['date_naissance'],
    },
  )
  .refine(
    (data) => {
      const { date_naissance, date_delivrance_cin } = data
      const ageCinPast = differenceInYears(new Date(date_delivrance_cin), new Date(date_naissance))
      const ageCinFutur = differenceInYears(new Date(), new Date(date_delivrance_cin))

      if (date_naissance && date_delivrance_cin && ageCinPast < 18) {
        return false
      }
      if (ageCinFutur < 0) {
        console.log('shoud show error', ageCinFutur)
        return false
      }

      return true
    },
    {
      message:
        "La date de délivrance du CIN n'est pas compatible avec la date de naissance (age légale: 18 ans)",
      path: ['date_delivrance_cin'],
    },
  )
  .superRefine((data, ctx) => {
    data.enfant?.forEach((enfant, index) => {
      const result = compareAsc(new Date(enfant.date_naissance), new Date(data.date_naissance))

      if (result !== 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "La date de naissance de l'enfant doit être posterieure à la date de naissance de l'employé",
          path: ['enfant', index, 'date_naissance'],
        })
      }
    })
  })

export default formEmployeSchema
