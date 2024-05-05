import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'
export type ResiliationState = 'idle' | 'open' | 'canceled'
export interface ICardResiliationContratProps {
  id?: string | number
  control: Control<IEmploye, any, IEmploye>
  setValue: UseFormSetValue<IEmploye>
  getValue: UseFormGetValues<IEmploye>
  register: UseFormRegister<IEmploye>
  handleSubmit: UseFormHandleSubmit<IEmploye, IEmploye>
  formEmployeValidationError: FieldErrors<IEmploye>
}
