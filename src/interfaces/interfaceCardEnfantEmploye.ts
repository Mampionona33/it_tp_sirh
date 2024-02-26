import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
<<<<<<< HEAD
import { IEmploye } from './interfaceEmploye'

export interface ICardEnfantEmployeProps {
  index: number | string
=======
import { IEmploye, IEnfantEmploye } from './interfaceEmploye'

export interface ICardEnfantEmployeProps {
  index: number | string
  data: IEnfantEmploye
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
  formEmployeValidationError: FieldErrors<IEmploye>
  register: UseFormRegister<IEmploye>
  control: Control<IEmploye, any, IEmploye>
  setValue: UseFormSetValue<IEmploye>
  value: FieldArrayWithId<IEmploye, 'enfant', 'id'>
  remove: UseFieldArrayRemove
  update: UseFieldArrayUpdate<IEmploye, 'enfant'>
}
