import React from 'react'
import ButtonWithIcon from '../ButtonWithIcon'
import { PlusIcon } from '@heroicons/react/24/outline'

const PrimeEtAvantageParMois: React.FC = () => {
  return (
    <>
      <div>
        <ButtonWithIcon label="Ajouter Prime et avantage (mois)" icon={<PlusIcon width={20} height={20} />} />
      </div>
    </>
  )
}

export default PrimeEtAvantageParMois
