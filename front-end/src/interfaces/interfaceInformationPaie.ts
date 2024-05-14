import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface IInformationPaie {
  register?: UseFormRegister<any>
  formErrors?: FieldErrors<IEmploye>
}
