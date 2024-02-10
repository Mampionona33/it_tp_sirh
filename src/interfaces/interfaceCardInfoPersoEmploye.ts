import { EnumGenre } from './interfaceEmploye'

export interface ICardInfoPersoEmploye {
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
