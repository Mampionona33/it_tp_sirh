import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { IEmploye } from './interfaceEmploye'

export interface ICardInfoProEmployeProps {
  data: Pick<
    IEmploye,
    | 'travail_de_nuit'
    | 'matricule'
    | 'date_embauche'
    | 'departement'
    | 'titre_poste'
    | 'categorie'
    | 'lieu_travail'
    | 'telephone'
    | 'email'
  >
  formEmployeValidationError: FieldErrors<IEmploye>
  register: UseFormRegister<IEmploye>
  control: Control<IEmploye, any, IEmploye>
  setValue: UseFormSetValue<IEmploye>
}
