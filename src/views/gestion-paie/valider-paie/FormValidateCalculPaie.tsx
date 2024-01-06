import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean } from '@src/interfaces/interfaceEmploye'
import { setModalClose, setModalOpen } from '@src/redux/modal/modalReducer'
import { format } from 'date-fns'
import React from 'react'

const FormValidateCalculPaie = () => {
  const dispatch = useAppDispatch()
  const bullettinDePaie = useAppSelector((store) => store.bulletinDePaie)
  console.log(bullettinDePaie)

  const handleValidation = async () => {}

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
