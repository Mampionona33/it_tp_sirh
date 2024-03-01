import { IPageIrsaProps, IPageIrsaState } from '@src/interfaces/intefacePageIrsa'
import { date, z } from 'zod'

export interface IFormPageIrsaSchema {
  mois: {
    value: number
    label: string
  }
  annee: {
    value: number
    label: string
  }
}

const formPageIrsaSchema: z.ZodType<IPageIrsaState> = z.object({
  mois: z.object({
    value: z.coerce.number().gt(0, { message: 'Veuillez renseigner le mois' }),
    label: z.string().min(1, { message: 'Veuillez renseigner le mois' }),
  }),
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
    .refine((data) => {
      console.log('data', data)
    }),
})

export default formPageIrsaSchema
