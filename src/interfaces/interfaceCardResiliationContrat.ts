import { Control, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface ICardResiliationContratProps {
  control: Control<IEmploye, any, IEmploye>
  register: UseFormRegister<IEmploye>
  handleSubmit: UseFormHandleSubmit<IEmploye, IEmploye>
}
