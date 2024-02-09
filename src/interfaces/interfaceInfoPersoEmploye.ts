import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface IInfoPersoEmployeProps {
  register?: UseFormRegister<any>
  formErrors?: FieldErrors<IEmploye>
}
