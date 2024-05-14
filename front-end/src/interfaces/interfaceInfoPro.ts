import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface IInfoProPros {
  register?: UseFormRegister<any>
  formErrors?: FieldErrors<IEmploye>
}
