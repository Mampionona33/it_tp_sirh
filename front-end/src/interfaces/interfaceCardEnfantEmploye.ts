import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface ICardEnfantEmployeProps {
  index: number | string
  formEmployeValidationError: FieldErrors<IEmploye>
  register: UseFormRegister<IEmploye>
  control: Control<IEmploye>
  setValue: UseFormSetValue<IEmploye>
  value: FieldArrayWithId<IEmploye, 'enfant', 'id'>
  remove: UseFieldArrayRemove
  update: UseFieldArrayUpdate<IEmploye, 'enfant'>
}
