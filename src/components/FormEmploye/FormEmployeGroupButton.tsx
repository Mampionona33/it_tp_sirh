import React from 'react'
import ButtonWithIcon, { ButtonWithIconVariant } from '../buttons/ButtonWithIcon'
import ButtonLink, { ButtonLinkVariant } from '../buttons/ButtonLink'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

const FormEmployeGroupButton = () => {
  const dispatch = useAppDispatch()

  const handleclickCancel = () => {
    dispatch(resetFormEmploye())
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
          type="reset"
          label="Recommencer"
          variant={ButtonWithIconVariant.Secondary}
        />
        <ButtonWithIcon name="submit-update-or-add" type="submit" label="Enregistrer" />
      </div>
    </>
  )
}

export default FormEmployeGroupButton
