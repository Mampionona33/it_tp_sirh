import { setModalClose } from '@src/redux/modal/modalReducer'
import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import React, { useEffect } from 'react'
import bulletinDePaieService from '@src/services/BulletinDePaieService'
import { useNavigate, useParams } from 'react-router-dom'
import { resetBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import useAddEmployeDns from '@src/hooks/useAddEmployeDns'
import useAddDeclarationIrsa from '@src/hooks/useAddDeclarationIrsa'
import { IAvantageProps, IPrimeEtGratification } from '@src/interfaces/interfaceBulletinDePaie'

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

  const handleValidation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const dateValidation = new Date(String(bullettinDePaie.validation.date))

      const declarationIrsaData = {
        year: dateValidation.getFullYear().toString(),
        month: (dateValidation.getMonth() + 1).toString().padStart(2, '0'),
        matricule: bullettinDePaie.salarie?.matricule,
        num_cnaps: bullettinDePaie.salarie?.num_cnaps,
        nom_prenom: bullettinDePaie.salarie?.nom + ' ' + bullettinDePaie.salarie?.prenom,
        cin: bullettinDePaie.salarie?.num_cin,
        date_embauche: bullettinDePaie.salarie?.date_embauche,
        fonction: bullettinDePaie.salarie?.titre_poste,
        salaire_de_base: bullettinDePaie.salarie?.salaire_de_base,
        indemnite_imposables: bullettinDePaie.valHsi130 + bullettinDePaie.valHsi150,
        indemnite_non_imposables: bullettinDePaie.valHsni130 + bullettinDePaie.valHsni150,
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
        montant_imposable: bullettinDePaie.salaireNet,
        impot_du: bullettinDePaie.irsaAPayer,
      }

      console.log('declarationIrsaData', declarationIrsaData)

      await addDeclarationIrsa({ data: declarationIrsaData })
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
