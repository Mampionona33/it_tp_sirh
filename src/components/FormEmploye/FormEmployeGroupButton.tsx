import React from 'react'
import ButtonWithIcon, { ButtonWithIconVariant } from '../buttons/ButtonWithIcon'
import ButtonLink, { ButtonLinkVariant } from '../buttons/ButtonLink'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { boolean } from 'zod'
import { id } from 'date-fns/locale'

export interface IFormEmployeGroupButtonProps {
  id?: string | number
  setShowResiliationCard: React.Dispatch<React.SetStateAction<boolean>>
  resiliationCardOpen: boolean
}

const FormEmployeGroupButton = ({
  setShowResiliationCard,
  resiliationCardOpen,
  id,
}: IFormEmployeGroupButtonProps) => {
  const dispatch = useAppDispatch()

  const handleclickCancel = () => {
    dispatch(resetFormEmploye())
  }

  const handleToggleResiliationCard = () => {
    setShowResiliationCard((prev) => !prev)
  }

  return (
    <>
      <div className="flex flex-row flex-wrap justify-end m-4 gap-3">
        <ButtonLink
          onClick={handleclickCancel}
          to="/employees/list"
          variant={ButtonLinkVariant.Tertiary}
        >
          Annuler
        </ButtonLink>
        {id ? (
          <ButtonWithIcon
            type="submit"
            variant={ButtonWithIconVariant.Secondary}
            label={resiliationCardOpen ? 'Annuler la résiliation' : 'Résilier contrat'}
            onClick={handleToggleResiliationCard}
          />
        ) : null}
        {resiliationCardOpen ? null : (
          <ButtonWithIcon name="submit-update-or-add" type="submit" label="Enregistrer" />
        )}
      </div>
    </>
  )
}

export default FormEmployeGroupButton
