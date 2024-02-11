import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface ICardInfoProEmployeProps {
  data: Partial<IEmploye>
  formEmployeValidationError: FieldErrors<IEmploye>
  register: UseFormRegister<IEmploye>
  control: Control<IEmploye, any, IEmploye>
}
