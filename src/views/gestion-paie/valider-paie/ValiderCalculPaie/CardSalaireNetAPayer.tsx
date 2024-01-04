import CustomSection from '@src/components/CustomSection'
import React, { useCallback, useEffect, useMemo } from 'react'
import CardRow from './CardRow'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import calculPaie from '@src/utils/CalculPaie'
import CalculPaie_v2 from '@src/utils/CalculPaie_v2'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'

const Body = () => {
  const {
    salaireNet,
    totalIndemnite,
    avance,
    totalAvantages,
    salaireNetAPayer,
    salarie,
    montantAllocationParEnfant,
    valAllocationEnfantsEmploye,
  } = useAppSelector((store) => store.bulletinDePaie)
  const dispatch = useAppDispatch()

  const updateBulletinDePaie = useCallback(() => {
    const calculPaie = new CalculPaie_v2()

    const salaireNetAPayer = calculPaie.calculSalaireNetAPayer({
      salaireNet: salaireNet,
      totalIndemnite: totalIndemnite,
      avance: avance,
      totalAvantagesNature: totalAvantages,
      allocationFamille: 0,
    })
    const allocation = calculPaie.calculateAllocationFamilliale({
      salarie: salarie,
      montantAllocationParEnfant: montantAllocationParEnfant,
    })

    dispatch(
      setBulletinDePaie({
        salaireNetAPayer: salaireNetAPayer,
        valAllocationEnfantsEmploye: allocation,
      }),
    )
  }, [
    salaireNet,
    totalIndemnite,
    avance,
    totalAvantages,
    salarie,
    montantAllocationParEnfant,
    dispatch,
  ])

  useEffect(() => {
    updateBulletinDePaie()
  }, [updateBulletinDePaie])

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
        cell3={valAllocationEnfantsEmploye}
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
