import React from 'react'
import ButtonWithIcon, { ButtonWithIconVariant } from '../ButtonWithIcon'

const FormEmployeGroupButton = () => {
  return (
    <>
      <div className="flex flex-row justify-end m-4 gap-3">
        <ButtonWithIcon label="Annuler" variant={ButtonWithIconVariant.Tertiary} />
        <ButtonWithIcon label="Recommencer" variant={ButtonWithIconVariant.Secondary} />
        <ButtonWithIcon label="Enregistrer" />
      </div>
    </>
  )
}

export default FormEmployeGroupButton
