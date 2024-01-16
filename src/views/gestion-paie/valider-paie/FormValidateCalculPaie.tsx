import { setModalClose } from '@src/redux/modal/modalReducer'
import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import React, { useEffect } from 'react'
import bulletinDePaieService from '@src/services/BulletinDePaieService'
import { useNavigate, useParams } from 'react-router-dom'
import { resetBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'

const FormValidateCalculPaie = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const bullettinDePaie = useAppSelector((store) => store.bulletinDePaie)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(bullettinDePaie)
  }, [bullettinDePaie])

  const handleValidation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const resp = await bulletinDePaieService.create({ id, data: bullettinDePaie })
      console.log(resp)

      if (resp.data.message === 'Paie enregistrée') {
        // Paie enregistrée
        dispatch(resetBulletinDePaie())
        dispatch(setModalClose())
        navigate(`/gestion-de-paie/historique/${id}`)
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
