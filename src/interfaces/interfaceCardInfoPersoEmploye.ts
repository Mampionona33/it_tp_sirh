import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface ICardInfoPersoEmploye {
  register: UseFormRegister<IEmploye>
  formEmployeValidationError: FieldErrors<IEmploye>
  setValue: UseFormSetValue<IEmploye>
  control: Control<IEmploye, any, IEmploye>
  // data: Pick<
  //   IEmploye,
  //   | 'nom'
  //   | 'prenom'
  //   | 'date_naissance'
  //   | 'lieu_naissance'
  //   | 'genre'
  //   | 'num_cin'
  //   | 'nom_mere'
  //   | 'nom_pere'
  //   | 'adresse'
  //   | 'date_delivrance_cin'
  // >
}
