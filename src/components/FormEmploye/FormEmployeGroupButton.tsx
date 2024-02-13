import React from 'react'
import ButtonWithIcon, { ButtonWithIconVariant } from '../buttons/ButtonWithIcon'
import ButtonLink, { ButtonLinkVariant } from '../buttons/ButtonLink'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

export interface IFormEmployeGroupButtonProps {
  setShowResiliationCard: React.Dispatch<React.SetStateAction<boolean>>
  resiliationCardOpen: boolean
}

const FormEmployeGroupButton = ({
  setShowResiliationCard,
  resiliationCardOpen,
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
        <ButtonWithIcon
          type="button"
          label={resiliationCardOpen ? 'Annuler la résiliation' : 'Résilier contrat'}
          onClick={handleToggleResiliationCard}
        />

        {resiliationCardOpen ? null : (
          <>
            <ButtonWithIcon
              type="reset"
              label="Recommencer"
              variant={ButtonWithIconVariant.Secondary}
            />
            <ButtonWithIcon name="submit-update-or-add" type="submit" label="Enregistrer" />
          </>
        )}
      </div>
    </>
  )
}

export default FormEmployeGroupButton
