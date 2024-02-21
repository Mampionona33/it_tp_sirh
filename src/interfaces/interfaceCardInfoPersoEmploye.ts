import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface ICardInfoPersoEmploye {
  register: UseFormRegister<IEmploye>
  setValue: UseFormSetValue<IEmploye>
  control: Control<IEmploye, any, IEmploye>
}
