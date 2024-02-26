import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'
export type ResiliationState = 'idle' | 'open' | 'canceled'
export interface ICardResiliationContratProps {
  id?: string | number
  control: Control<IEmploye, any, IEmploye>
  register: UseFormRegister<IEmploye>
  handleSubmit: UseFormHandleSubmit<IEmploye, IEmploye>
  formEmployeValidationError: FieldErrors<IEmploye>
}
