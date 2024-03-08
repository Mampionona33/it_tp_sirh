import { IFormPageOmsi } from '@src/interfaces/interfaceFormPageOmsi'
import { z } from 'zod'

const formOmsiSchema: z.ZodType<Partial<IFormPageOmsi>> = z
  .object({
    periode: z.object({
      value: z.coerce.string().min(1, { message: 'Valeur obligatoire pour la periode' }),
      label: z.string().min(1, { message: 'Label obligatoire pour la periode' }),
    }),
    annee: z.object({
      value: z.coerce.number().gt(0, { message: "Valeur obligatoire pour l'annee" }),
      label: z.string().min(1, { message: "Label obligatoire pour l'annee" }),
    }),
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
      if (!data.periode) {
        return false
      }
      return true
    },
    {
      message: 'Veuillez renseigner la période.',
      path: ['periode'],
    },
  )

export default formOmsiSchema
