import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { setModalClose, setModalOpen } from '@src/redux/modal/modalReducer'
import React from 'react'

const FormValidateCalculPaie = () => {
  const dispatch = useAppDispatch()

  const handleValidation = () => {
    // Ajoutez la logique de validation ici
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
          <ButtonWithIcon type="submit" label="Valider" variant={ButtonWithIconVariant.Secondary} />
          <ButtonWithIcon type="button" label="Annuler" onClick={handleCancel} />
        </div>
      </form>
    </div>
  )
}

export default FormValidateCalculPaie
