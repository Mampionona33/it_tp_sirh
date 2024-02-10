import { EnumBoolean } from './interfaceEmploye'

export interface ICardInfoProEmployeProps {
  data: {
    matricule: string
    titre_poste: string
    departement: string
    date_embauche: string
    lieu_travail: string
    telephone?: string
    email?: string
    categorie: string
    travail_de_nuit: EnumBoolean
  }
}
