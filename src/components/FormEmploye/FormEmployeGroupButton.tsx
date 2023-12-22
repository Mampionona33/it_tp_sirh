import React from 'react'
import ButtonWithIcon, { ButtonWithIconVariant } from '../buttons/ButtonWithIcon'

const FormEmployeGroupButton = () => {
  return (
    <>
      <div className="flex flex-row justify-end m-4 gap-3">
        <ButtonWithIcon label="Annuler" variant={ButtonWithIconVariant.Tertiary} />
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
