import { z } from 'zod'

const formEmployeSchema = z
  .object({
    nom: z.string().min(2),
    prenom: z.string().min(2),
    date_naissance: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .datetime(),
    lieu_naissance: z.string().min(3),
    date_delivrance_cin: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .datetime(),
    adresse: z.string().min(3),
    nom_pere: z.string().optional(),
    nom_mere: z.string().optional(),
    telephone: z.string().optional(),
    email: z.string().email().optional(),
    num_cin: z.string().regex(/^\d{3} \d{3} \d{3} \d{3}$/),
    genre: z.enum(['masculin', 'feminin']),
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
        nom: z.string(),
        prenom: z.string(),
        date_naissance: z.string(),
        lieu_naissance: z.string(),
        adresse: z.string(),
        num_cin: z.string(),
        tel: z.string(),
        email: z.string().email(),
      })
      .optional(),
    enfant: z
      .array(
        z.object({
          id: z.number(),
          nom: z.string(),
          prenom: z.string(),
          date_naissance: z.string(),
          lieu_naissance: z.string(),
          genre_enfant: z.enum(['masculin', 'feminin']),
          certificat: z.enum(['', 'vie', 'dece', 'scolarite', 'medical']).optional(),
          action: z.enum(['ajout', 'modifier']).optional(),
        }),
      )
      .optional(),
    titre_poste: z.string(),
    matricule: z.string(),
    categorie: z.string(),
    date_embauche: z.string(),
    departement: z.string(),
    lieu_travail: z.string(),
    est_cadre: z.enum(['oui', 'non']).optional(),
    travail_de_nuit: z.enum(['oui', 'non']),
    salaire_de_base: z.number(),
    rib: z.string().regex(/^\d{5} \d{5} \d{11} \d{2}$/),
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
    depart: z.object({
      date: z.any(),
      motif: z.any(),
    }),
    actif: z.enum(['oui', 'non']),
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
      return (
        data.date_naissance !== '' && data.date_delivrance_cin !== '' && data.date_embauche !== ''
      )
    },
    {
      message: 'Les dates ne peuvent pas être vides.',
    },
  )

export default formEmployeSchema
