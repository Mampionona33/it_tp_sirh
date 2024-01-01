import CustomSection from '@src/components/CustomSection'
import React from 'react'
import CardRow from './CardRow'
import { useAppSelector } from '@src/hooks/useAppDispatch'

const CardSalaireNetAPayer = () => {
  const bulletinDePaie = useAppSelector((store) => store.bulletinDePaie)
  const Body = () => {
    return (
      <div className="w-full text-sm">
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="Salaire Net"
          cell3={bulletinDePaie.salaireNet}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="Avances"
          cell3={bulletinDePaie.salaireNet}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="Avantage en nature"
          cell3={bulletinDePaie.salaireNet}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="Allocation familialee"
          cell3={bulletinDePaie.salaireNet}
        />
      </div>
    )
  }

  return <CustomSection title="Salaire net à payer" body={<Body />} />
}

export default CardSalaireNetAPayer
