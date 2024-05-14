import { z } from 'zod'

export interface IDnsGeneratorDataProps {
  annee?: {
    value: number
    label: string
  }
  periode?: {
    value: string
    label: string
  }
}

const formDnsSchema: z.ZodType<IDnsGeneratorDataProps> = z
  .object({
    annee: z
      .object({
        value: z.coerce.number().gt(0, { message: "Valeur obligatoire pour l'année" }),
        label: z.string().min(1, { message: "Label obligatoire pour l'année" }),
      })
      .optional(),
    periode: z
      .object({
        value: z.coerce.string().min(1, { message: 'Valeur obligatoire pour la periode' }),
        label: z.string().min(1, { message: 'Label obligatoire pour la periode' }),
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
    {
      message: "Veuillez renseigner l'année",
      path: ['annee'],
    },
  )
  .refine(
    (data) => {
      if (!data.periode) {
        return false
      }
      return true
    },
    {
      message: 'Veuillez renseigner une période',
      path: ['periode'],
    },
  )

export default formDnsSchema
