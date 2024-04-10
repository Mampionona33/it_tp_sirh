import { setModalClose } from '@src/redux/modal/modalReducer'
import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import React, { useEffect } from 'react'
import bulletinDePaieService from '@src/services/BulletinDePaieService'
import { useNavigate, useParams } from 'react-router-dom'
import { resetBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import useAddEmployeDns from '@src/hooks/useAddEmployeDns'
import useAddDeclarationIrsa from '@src/hooks/useAddDeclarationIrsa'
import {
  IAvantageProps,
  IPrimeEtGratification,
  IValidationProps,
} from '@src/interfaces/interfaceBulletinDePaie'
import useAddDeclarationOmsie from '@src/hooks/useAddDeclarationOmsie'
import { DataOmsiProps } from '@src/interfaces/interfaceBtnDownloadOmsi'
import { irsaProps } from '@src/interfaces/interfaceBtnDownloadIrsaProps'

const FormValidateCalculPaie = () => {
  const dispatch = useAppDispatch()
  const { data, error, isError, isIdle, isSuccess, isPending, mutate, addEmployeeDns } =
    useAddEmployeDns()

  const {
    data: irsaData,
    isError: isErrorIrsa,
    error: errorIrsa,
    isSuccess: isSuccessIrsa,
    mutate: mutateIrsa,
    addDeclarationIrsa,
  } = useAddDeclarationIrsa()

  const {
    data: omsieData,
    isError: isErrorOmsie,
    error: errorOmsie,
    isSuccess: isSuccessOmsie,
    mutate: mutateOmsie,
    addDeclarationOmsie,
    isIdle: isIdleOmsie,
    isPending: isPendingOmsie,
  } = useAddDeclarationOmsie()

  const { id } = useParams()
  const bullettinDePaie = useAppSelector((store) => store.bulletinDePaie)
  const navigate = useNavigate()

  const calculTotalAvantage = (avantages?: IAvantageProps): number => {
    let total = 0
    if (avantages) {
      if (avantages.autresAvantages) total += avantages.autresAvantages
      if (avantages.domestique) total += avantages.domestique
      if (avantages.logement) total += avantages.logement
      if (avantages.vehicule) total += avantages.vehicule
    }
    return total
  }

  const calculPrimes = (primeEtGratification?: IPrimeEtGratification): number => {
    let total = 0
    if (primeEtGratification) {
      if (primeEtGratification.assiduite) total += primeEtGratification.assiduite
      if (primeEtGratification.excellence) total += primeEtGratification.excellence
    }
    return total
  }

  const getValidationPeriode = (validation: IValidationProps) => {
    const date = new Date(String(validation.date))
    const month = date.getMonth() + 1

    switch (month) {
      case 1:
      case 2:
      case 3:
        return 't1'
      case 4:
      case 5:
      case 6:
        return 't2'
      case 7:
      case 8:
      case 9:
        return 't3'
      case 10:
      case 11:
      case 12:
        return 't4'
      default:
        return ''
    }
  }

  const getGenderSalarieOmsie = (gender: string): string => {
    let result = 'M'
    if (gender.match(/femminin/gi)) {
      result = 'F'
    }
    return result
  }

  const formatSalariesOmsie = (salaire: number, mois: number) => {
    const result: Record<string, number | null> = {}
    switch (mois) {
      case 1:
      case 4:
      case 7:
      case 10:
        result.salaire_mois_1 = salaire
        result.salaire_mois_2 = 0
        result.salaire_mois_3 = 0
        break
      case 2:
      case 5:
      case 8:
      case 11:
        result.salaire_mois_2 = salaire
        result.salaire_mois_3 = 0
        result.salaire_mois_1 = 0
        break
      case 3:
      case 6:
      case 9:
      case 12:
        result.salaire_mois_3 = salaire
        result.salaire_mois_2 = 0
        result.salaire_mois_1 = 0
        break
      default:
        break
    }
    return result
  }

  const handleValidation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const dateValidation = new Date(String(bullettinDePaie.validation.date))

      const moisValidation = dateValidation.getMonth() + 1

      if (
        !bullettinDePaie.salarie?.matricule ||
        !bullettinDePaie.validation.date ||
        !bullettinDePaie.salarie?.num_cnaps
      ) {
        return
      }

      const declarationIrsaData: irsaProps = {
        year: dateValidation.getFullYear().toString(),
        month: (dateValidation.getMonth() + 1).toString(),
        matricule: bullettinDePaie.salarie?.matricule,
        num_cnaps: bullettinDePaie.salarie?.num_cnaps,
        nom_prenom: bullettinDePaie.salarie?.nom + ' ' + bullettinDePaie.salarie?.prenom,
        cin: bullettinDePaie.salarie?.num_cin,
        date_embauche: bullettinDePaie.salarie?.date_embauche,
        fonction: bullettinDePaie.salarie?.titre_poste,
        salaire_de_base: bullettinDePaie.salarie?.salaire_de_base,
        indemnite_imposables:
          (bullettinDePaie.indemnites?.autresIndemnite ?? 0) +
          (bullettinDePaie.indemnites?.transport ?? 0),
        indemnite_non_imposables: 0,
        hs_inposables: bullettinDePaie.valHsi130 + bullettinDePaie.valHsi150,
        hs_non_exonerables: bullettinDePaie.valHsni130 + bullettinDePaie.valHsni150,
        avantage_nature_imposables: calculTotalAvantage(bullettinDePaie.avantages),
        temps_de_presence: bullettinDePaie.totalHn,
        heures_supplementaires: bullettinDePaie.totalHs,
        prime_gratification: calculPrimes(bullettinDePaie.primeEtGratification),
        autres_avantages: bullettinDePaie.avantages?.autresAvantages,
        salaire_brut: bullettinDePaie.salaireBrut,
        cnaps: bullettinDePaie.cnaps,
        ostie: bullettinDePaie.osie,
        salaire_net: bullettinDePaie.salaireNet,
        impo_correspondant: bullettinDePaie.irsaAPayer,
        reduction_charge_famille: bullettinDePaie.valReductionChargeEnfants,
        montant_imposable: bullettinDePaie.baseIrsaArrondi,
        impot_du: bullettinDePaie.irsaAPayer,
      }

      const genderSalarieOm = getGenderSalarieOmsie(bullettinDePaie.salarie?.genre)

      const declarationOmsieData: DataOmsiProps = {
        annee: dateValidation.getFullYear().toString(),
        periode: getValidationPeriode(bullettinDePaie.validation),
        matricule: bullettinDePaie.salarie?.matricule,
        num_cnaps: bullettinDePaie.salarie?.num_cnaps,
        date_embauche: bullettinDePaie.salarie?.date_embauche,
        nom: bullettinDePaie.salarie.nom,
        prenom: bullettinDePaie.salarie.prenom,
        genre: genderSalarieOm,
        salaires: formatSalariesOmsie(bullettinDePaie.salaireBrut, moisValidation),
      }
      console.log('declarationIrsaData: ', declarationIrsaData)
      console.log('declarationOmsieData: ', declarationOmsieData)

      await addDeclarationIrsa({ data: declarationIrsaData })
      await addDeclarationOmsie({ ...declarationOmsieData })
      await addEmployeeDns(bullettinDePaie)

      const resp = await bulletinDePaieService.create({ id: String(id), data: bullettinDePaie })

      if (resp.data === 'Paie enregistrée') {
        dispatch(resetBulletinDePaie())
        dispatch(setModalClose())
        navigate(`/gestion-de-paie`)
      }
    } catch (error) {
      dispatch(setModalClose())
      throw error
    }
  }

  const handleCancel = () => {
    dispatch(setModalClose())
  }

  React.useEffect(() => {
    if (isError || isErrorIrsa || isErrorOmsie) {
      dispatch(setModalClose())
    }
  }, [isError, isErrorIrsa, isErrorOmsie, dispatch])

  return (
    <div className="flex flex-col bg-white w-2/4 p-3 rounded-sm">
      <form onSubmit={handleValidation}>
        <p className="text-justify font-medium text-base">
          Êtes-vous prêt(e) à procéder à la validation du calcul de paie ?
        </p>
        <p className="text-justify text-sm">
          Vous êtes sur le point de valider le calcul de la paie. Une fois la validation confirmée,
          les modifications ne pourront pas être révoquées.
        </p>
        <div className="flex justify-end gap-3">
          <ButtonWithIcon type="submit" label="Valider" />
          <ButtonWithIcon
            type="button"
            label="Annuler"
            onClick={handleCancel}
            variant={ButtonWithIconVariant.Secondary}
          />
        </div>
      </form>
    </div>
  )
}

export default FormValidateCalculPaie
