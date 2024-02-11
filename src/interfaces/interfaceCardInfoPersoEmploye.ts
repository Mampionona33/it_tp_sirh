import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { EnumGenre, IEmploye } from './interfaceEmploye'

export interface ICardInfoPersoEmploye {
  register: UseFormRegister<IEmploye>
  formEmployeValidationError: FieldErrors<IEmploye>
  data: {
    nom: string
    prenom: string
    date_naissance: string
    lieu_naissance: string
    genre: EnumGenre
    num_cin: string
    nom_pere?: string
    nom_mere?: string
    adresse: string
    date_delivrance_cin: string
  }
}
