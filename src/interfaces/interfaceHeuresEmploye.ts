import { DDMMYYYYFormat } from '@src/types/DateType'

export interface IHeuresEmploye {
  date: DDMMYYYYFormat
  heure_de_travail: number
  heure_normale: number
  hs_de_dimanche: number
  hs_de_nuit: number
  hs_jours_feries: number
  hs_normale: number
  jour: string
  matricule: string
}
