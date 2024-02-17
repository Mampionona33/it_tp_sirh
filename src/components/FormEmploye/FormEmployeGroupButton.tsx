import React from 'react'
import ButtonWithIcon, { ButtonWithIconVariant } from '../buttons/ButtonWithIcon'
import ButtonLink, { ButtonLinkVariant } from '../buttons/ButtonLink'
import { ResiliationState } from '@src/interfaces/interfaceCardResiliationContrat'

export interface IFormEmployeGroupButtonProps {
  id?: string | number
  setShowResiliationCard: React.Dispatch<React.SetStateAction<boolean>>
  setEtatResiliation: React.Dispatch<React.SetStateAction<ResiliationState>>
  resiliationCardOpen: boolean
}

const FormEmployeGroupButton = ({
  setShowResiliationCard,
  resiliationCardOpen,
  setEtatResiliation,
  id,
}: IFormEmployeGroupButtonProps) => {
  const handleToggleResiliationCard = () => {
    setShowResiliationCard((prev) => !prev)
    if (resiliationCardOpen) {
      setEtatResiliation('canceled')
    } else {
      setEtatResiliation('open')
    }
  }

  return (
    <>
      <div className="flex flex-row flex-wrap justify-end m-4 gap-3">
        <ButtonLink to="/employees/list" variant={ButtonLinkVariant.Tertiary}>
          Retour à la liste
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
          <ButtonWithIcon
            name="submit-update-or-add"
            type="submit"
            label="Enregistrer"
            onClick={() => setEtatResiliation('idle')}
          />
        )}
      </div>
    </>
  )
}

export default FormEmployeGroupButton
