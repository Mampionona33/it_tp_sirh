import { IPageIrsaState } from '@src/interfaces/intefacePageIrsa'
import { z } from 'zod'

const formPageIrsaSchema: z.ZodType<Partial<IPageIrsaState>> = z
  .object({
    mois: z
      .object({
        value: z.coerce.number().gt(0, { message: 'Veuillez renseigner le mois' }),
        label: z.string().min(1, { message: 'Veuillez renseigner le mois' }),
      })
      .optional(),

    annee: z
      .object({
        value: z.coerce
          .number()
          .gt(0, { message: "Veuillez renseigner l'année" })
          .max(9999, { message: 'Veuillez renseigner une année valide' }),
        label: z
          .string()
          .min(1, { message: "Veuillez renseigner l'année" })
          .max(4, { message: 'Veuillez renseigner une année valide' }),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.annee) {
        return false
      }
      return true
    },
    { message: "Veuillez renseigner l'annee", path: ['annee'] },
  )
  .refine(
    (data) => {
      if (!data.mois) {
        return false
      }
      return true
    },
    { message: 'Veuillez renseigner le mois', path: ['mois'] },
  )

export default formPageIrsaSchema
