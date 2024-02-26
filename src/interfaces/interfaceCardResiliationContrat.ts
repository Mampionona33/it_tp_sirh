import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'
<<<<<<< HEAD
export type ResiliationState = 'idle' | 'open' | 'canceled'
export interface ICardResiliationContratProps {
  id?: string | number
=======

export interface ICardResiliationContratProps {
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
  control: Control<IEmploye, any, IEmploye>
  register: UseFormRegister<IEmploye>
  handleSubmit: UseFormHandleSubmit<IEmploye, IEmploye>
  formEmployeValidationError: FieldErrors<IEmploye>
}
