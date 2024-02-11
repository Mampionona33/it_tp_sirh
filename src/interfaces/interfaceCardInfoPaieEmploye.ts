import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface ICardInfoPaieEmployeProps {
  data: Partial<IEmploye>
  formEmployeValidationError: FieldErrors<IEmploye>
  register: UseFormRegister<IEmploye>
}
