import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import React from 'react'

const CardGroupeButtons = () => {
  return (
    <div className="w-full text-sm flex flex-col gap-4 p-4 bg-white shadow-lg">
      <p className="text-customRed-930">
        Veuillez bien effectuer les vérifications avant de procéder à la validation. Après cette
        étape, aucune modification ne sera autorisée.
      </p>
      <div className="flex justify-end">
        <ButtonWithIcon type="submit" label="Valider" />
      </div>
    </div>
  )
}

export default CardGroupeButtons
