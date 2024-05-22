import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export type ResiliationState = 'idle' | 'open' | 'canceled'

export interface ICardResiliationContratProps {
  id?: string | number
  control: Control<IEmploye>
  setValue: UseFormSetValue<IEmploye>
  getValue: UseFormGetValues<IEmploye>
  register: UseFormRegister<IEmploye>
  reset: UseFormReset<IEmploye>
  handleSubmit: UseFormHandleSubmit<IEmploye>
  formEmployeValidationError: FieldErrors<IEmploye>
}
