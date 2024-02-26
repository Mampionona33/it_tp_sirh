<<<<<<< HEAD
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form'
=======
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
import { IEmploye } from './interfaceEmploye'

export interface ICardInfoPersoEmploye {
  register: UseFormRegister<IEmploye>
<<<<<<< HEAD
  setValue: UseFormSetValue<IEmploye>
  control: Control<IEmploye, any, IEmploye>
=======
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
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
}
