import CustomSection from '@src/components/CustomSection'
import React, { useEffect } from 'react'
import CardRow from './CardRow'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import calculPaie from '@src/utils/CalculPaie'

const Body = () => {
  const { salaireNet, totalIndemnite, salaireNetAPayer, avance, totalAvantages } = useAppSelector(
    (store) => store.bulletinDePaie,
  )

  return (
    <div className="w-full text-sm">
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Salaire Net"
        cell3={salaireNet}
      />
      <CardRow className="border-b border-b-customBlue-100" cell1="Avances" cell3={avance} />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Indemnité"
        cell3={totalIndemnite || 0}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Avantage en nature"
        cell3={totalAvantages}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Allocation familiale"
        cell3={salaireNet}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Salaire net à payer"
        cell3={salaireNetAPayer}
        cell3ClassName="text-customRed-900"
      />
    </div>
  )
}

const CardSalaireNetAPayer = () => {
  return <CustomSection title="Salaire net à payer" body={<Body />} />
}

export default CardSalaireNetAPayer
