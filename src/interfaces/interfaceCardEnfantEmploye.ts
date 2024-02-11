import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { IEmploye, IEnfantEmploye } from './interfaceEmploye'

export interface ICardEnfantEmployeProps {
  index: number | string
  data: IEnfantEmploye
  formEmployeValidationError: FieldErrors<IEmploye>
  register: UseFormRegister<IEmploye>
  control: Control<IEmploye, any, IEmploye>
  setValue: UseFormSetValue<IEmploye>
}
