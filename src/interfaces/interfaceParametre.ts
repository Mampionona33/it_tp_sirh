export interface ICotisationParametre {
  name: string
  part_employeur: number
  part_salarie: number
}

export interface IPeriodeDuMoisParametre {
  month: number
  jour_debut: string
  jour_fin: string
}

export interface ICategorieParametre {
  label: string
  value: string
}

export interface IModeDePaiementParametre {
  label: string
  value: string
}

interface IParametreProps {
  plafond_sme: number
  reduction_charge_par_enfant: number
  cotisations: ICotisationParametre[]
  periode_mensuelle: IPeriodeDuMoisParametre[]
  categorie_salarie: ICategorieParametre[]
  mode_de_paiement: IModeDePaiementParametre[]
}

export default IParametreProps
