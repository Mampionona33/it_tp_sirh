import { EnumBoolean, IInputWithLabelOptionsProps } from './interfaceEmploye'

export interface ICardInfoProEmployeProps {
  data: {
    matricule: string
    titre_poste: string
    departement: string
    date_embauche: string
    lieu_travail: string
    telephone?: string
    email?: string
    categorie?: IInputWithLabelOptionsProps
    travail_de_nuit: EnumBoolean
  }
}
