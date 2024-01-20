import CustomSection from '@src/components/CustomSection'
import React, { useCallback, useEffect } from 'react'
import CardRow from './CardRow'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import CalculPaie_v2 from '@src/utils/CalculPaie_v2'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const Body = () => {
  const { salaireNet, avance, salaireNetAPayer, salarie, montanReductionChargeParEnfant } =
    useAppSelector((store) => store.bulletinDePaie)
  const dispatch = useAppDispatch()

  const updateBulletinDePaie = useCallback(() => {
    const calculPaie = new CalculPaie_v2()

    const allocationFamille = calculPaie.calculateReductionChargeFamiliale({
      salarie: salarie,
      montanReductionChargeParEnfant: montanReductionChargeParEnfant,
    })

    const salaireNetAPayer = calculPaie.calculSalaireNetAPayer({
      salaireNet,
      avanceQuinzaine: avance.quinzaine,
      avanceSpeciale: avance.speciale,
    })

    dispatch(
      setBulletinDePaie({
        salaireNetAPayer: salaireNetAPayer,
        valReductionChargeEnfants: allocationFamille,
      } as IBulletinDePaieProps),
    )
  }, [salaireNet, avance, salarie, montanReductionChargeParEnfant, dispatch])

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
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Avances quinzaine"
        cell3={avance.quinzaine}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Avances spéciale"
        cell3={avance.speciale}
      />

      <CardRow
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
