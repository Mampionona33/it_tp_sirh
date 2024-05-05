import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface ICardInfoPaieEmployeProps {
  data: Pick<IEmploye, 'salaire_de_base' | 'mode_paiement_salaire' | 'rib' | 'num_cnaps'>
  formEmployeValidationError: FieldErrors<IEmploye>
  register: UseFormRegister<IEmploye>
  control: Control<IEmploye, any, IEmploye>
  setValue: UseFormSetValue<IEmploye>
  getValues: UseFormGetValues<IEmploye>
}
