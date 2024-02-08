import CustomSection from '@src/components/CustomSection'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import formatAriaryMga from '@src/utils/formatAriaryMga'
import React, { useCallback, useEffect } from 'react'
import CardRow from './CardRow'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import CalculPaie_v2 from '@src/utils/CalculPaie_v2'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const Body = () => {
  const {
    salaireDeBase,
    valHsni150,
    valHsni130,
    valHFerie,
    valHdim,
    valHsi130,
    valHsi150,
    valHs30,
    valHs50,
    hsi130,
    hsi150,
    hsni130,
    hsni150,
    totalHs30,
    totalHs50,
    totalHDim,
    totalHFerie,
    salaireBrut,
    primeEtGratification,
    indemnites,
    avantages,
    rappel,
    deductions,
  } = useAppSelector((store) => store.bulletinDePaie)
  const dispatch = useAppDispatch()

  const formatCell2 = (value: number) => {
    return value.toFixed(2).toString().padStart(2, '0') + ' H'
  }

  const updateBulletinDePaie = useCallback(() => {
    return () => {
      const calculPaie = new CalculPaie_v2()
      calculPaie.setSalaireBase(salaireDeBase)

      const totalIndemnite: number = Object.values(indemnites).reduce(
        (acc, currentValue) => acc + currentValue,
      )

      const salaireBrut = calculPaie.calculateSalaireBrut({
        valHdim,
        valHs30,
        valHs50,
        valHFerie,
        valHsi130,
        valHsi150,
        valHsni130,
        valHsni150,
        rappel,
        primeAssiduite: primeEtGratification!.assiduite,
        primeExcellence: primeEtGratification!.excellence,
        totalIndemnite,
        avantageLogement: avantages!.logement,
        avantageVehicule: avantages!.vehicule,
        avantageDomestique: avantages!.domestique,
        avantageAutre: avantages!.autresAvantages,
        retard: deductions!.retard,
        absence: deductions!.absence,
      })

      const baseCnaps = calculPaie.calculBaseCnaps({
        salaireBrut,
      })

      dispatch(setBulletinDePaie({ salaireBrut, baseCnaps } as IBulletinDePaieProps))
    }
  }, [
    salaireDeBase,
    deductions,
    rappel,
    dispatch,
    valHdim,
    valHs30,
    valHs50,
    valHFerie,
    valHsi130,
    valHsi150,
    valHsni130,
    valHsni150,
    primeEtGratification,
    indemnites,
    avantages,
  ])

  useEffect(() => {
    updateBulletinDePaie()()
  }, [updateBulletinDePaie])

  return (
    <div className="w-full text-sm">
      <div className="flex justify-between px-4 py-2 border-b border-b-customBlue-100">
        <div>Salaire de base</div>
        <div>{formatAriaryMga(salaireDeBase)}</div>
      </div>
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HSNI 130%"
        cell2={formatCell2(hsni130)}
        cell3={valHsni130}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HSNI 150%"
        cell2={formatCell2(hsni150)}
        cell3={valHsni150}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HSI 130%"
        cell2={formatCell2(hsi130)}
        cell3={valHsi130}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HSI 150%"
        cell2={formatCell2(hsi150)}
        cell3={valHsi150}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HS 30%"
        cell2={formatCell2(totalHs30)}
        cell3={valHs30}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HS 50%"
        cell2={formatCell2(totalHs50)}
        cell3={valHs50}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HFérié"
        cell2={formatCell2(totalHFerie)}
        cell3={valHFerie}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HDimanche"
        cell2={formatCell2(totalHDim)}
        cell3={valHdim}
      />
      <CardRow
        cell1="Prime d'assiduité"
        cell3={primeEtGratification!.assiduite}
        className="border-b border-b-customBlue-100"
      />
      <CardRow
        cell1="Autres primes"
        cell3={primeEtGratification!.excellence}
        className="border-b border-b-customBlue-100"
      />
      <CardRow
        cell1="Total indémnités"
        cell3={Object.values(indemnites).reduce((acc, currentValue) => acc + currentValue)}
        className="border-b border-b-customBlue-100"
      />
      <CardRow
        cell1="Avantage logement"
        cell3={avantages!.logement}
        className="border-b border-b-customBlue-100"
      />
      <CardRow
        cell1="Avantage véhicule"
        cell3={avantages!.vehicule}
        className="border-b border-b-customBlue-100"
      />
      <CardRow
        cell1="Avantage domestique"
        cell3={avantages!.domestique}
        className="border-b border-b-customBlue-100"
      />
      <CardRow
        cell1="Avantage autres"
        cell3={avantages!.autresAvantages}
        className="border-b border-b-customBlue-100"
      />
      <CardRow cell1="Rappel" cell3={rappel} className="border-b border-b-customBlue-100" />
      <CardRow
        cell1="Retard"
        cell3={deductions!.retard}
        className="border-b border-b-customBlue-100"
      />
      <CardRow
        cell1="Absence"
        cell3={deductions!.absence}
        className="border-b border-b-customBlue-100"
      />

      <div className="flex justify-between px-4 py-2 ">
        <div>Salaire brut</div>
        <div className="text-customRed-900">{formatAriaryMga(salaireBrut)}</div>
      </div>
    </div>
  )
}

const CardSalaireBrut = () => {
  return <CustomSection title="Salaire Brut" body={<Body />} />
}

export default CardSalaireBrut
