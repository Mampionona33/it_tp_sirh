import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface ICardInfoPaieEmployeProps {
  data: Partial<IEmploye>
  formEmployeValidationError: FieldErrors<IEmploye>
  register: UseFormRegister<IEmploye>
  contol: Control<IEmploye, any, IEmploye>
  setValue: UseFormSetValue<IEmploye>
}
