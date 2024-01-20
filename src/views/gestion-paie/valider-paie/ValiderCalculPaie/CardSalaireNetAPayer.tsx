import CustomSection from '@src/components/CustomSection'
import React, { useCallback, useEffect } from 'react'
import CardRow from './CardRow'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
// import calculPaie from '@src/utils/CalculPaie'
import CalculPaie_v2 from '@src/utils/CalculPaie_v2'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const Body = () => {
  const {
    salaireNet,
    avance,
    salaireNetAPayer,
    salarie,
    primeEtGratification,
    indemnites,
    montanReductionChargeParEnfant,
    valReductionChargeEnfants,
    avantages,
    deductions,
    rappel,
  } = useAppSelector((store) => store.bulletinDePaie)
  const dispatch = useAppDispatch()

  const updateBulletinDePaie = useCallback(() => {
    const calculPaie = new CalculPaie_v2()

    const allocationFamille = calculPaie.calculateReductionChargeFamiliale({
      salarie: salarie,
      montanReductionChargeParEnfant: montanReductionChargeParEnfant,
    })

    const salaireNetAPayer = calculPaie.calculSalaireNetAPayer({
      salaireNet,
      primeAssiduite: primeEtGratification.assiduite,
      primeExcellence: primeEtGratification.excellence,
      indemniteTransport: indemnites.transport,
      indeminiteAutres: indemnites.autresIndemnite,
      avantageVehicule: avantages.vehicule,
      avantageLogement: avantages.logement,
      avantageAutre: avantages.autresAvantages,
      absence: deductions.absence,
      retard: deductions.retard,
      avantageDomestique: avantages.domestique,
      avance,
      allocationFamille,
      rappel,
    })

    dispatch(
      setBulletinDePaie({
        salaireNetAPayer: salaireNetAPayer,
        valReductionChargeEnfants: allocationFamille,
      } as IBulletinDePaieProps),
    )
  }, [
    salaireNet,
    avance,
    salarie,
    montanReductionChargeParEnfant,
    dispatch,
    primeEtGratification,
    indemnites,
    rappel,
    avantages,
    deductions,
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
        cell1="Prime d'assuidité "
        cell3={primeEtGratification.assiduite}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Prime d'excellence"
        cell3={primeEtGratification.excellence}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Indemnité de Transport"
        cell3={indemnites.transport}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Autres indemnités"
        cell3={indemnites.autresIndemnite}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Avantages en nature (Véhicules)"
        cell3={avantages.vehicule}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Avantages en nature (Logement)"
        cell3={avantages.logement}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Avantages en nature (Domestique)"
        cell3={avantages.domestique}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Autres avantages"
        cell3={avantages.autresAvantages}
      />
      <CardRow className="border-b border-b-customBlue-100" cell1="Rappel" cell3={rappel} />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Allocation Familliale"
        cell3={valReductionChargeEnfants}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Absence"
        cell3={deductions.absence}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Retard"
        cell3={deductions.retard}
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
