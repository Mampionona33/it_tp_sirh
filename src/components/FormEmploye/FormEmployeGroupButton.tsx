import React from 'react'
import ButtonWithIcon, { ButtonWithIconVariant } from '../buttons/ButtonWithIcon'
import ButtonLink, { ButtonLinkVariant } from '../buttons/ButtonLink'

const FormEmployeGroupButton = () => {
  return (
    <>
      <div className="flex flex-row justify-end m-4 gap-3">
        <ButtonLink to="/employees/list" variant={ButtonLinkVariant.Tertiary}>
          Annuler
        </ButtonLink>
        <ButtonWithIcon
          type="reset"
          label="Recommencer"
          variant={ButtonWithIconVariant.Secondary}
        />
        <ButtonWithIcon type="submit" label="Enregistrer" />
      </div>
    </>
  )
}

export default FormEmployeGroupButton
