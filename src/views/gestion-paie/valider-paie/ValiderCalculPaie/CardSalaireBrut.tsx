import CustomSection from '@src/components/CustomSection'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import formatAriaryMga from '@src/utils/formatAriaryMga'
import React, { useEffect, useState } from 'react'
import CardRow from './CardRow'
import useSalaireNetAPayerUpdate from '@src/hooks/useSalaireNetAPayerUpdate'
import calculPaie from '@src/utils/CalculPaie'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'

const Body = () => {
  const {
    totalPrimeEtGratification,
    salaireDeBase,
    totalDeduction,
    rappel,
    // valHsni150,
    // valHsni130,
    // valHFerie,
    // valHdim,
    // valHsi130,
    // valHsi150,
    // valHs30,
    // valHs50,
    // hsi130,
    // hsi150,
    // hsni130,
    // hsni150,
    // totalHs30,
    // totalHs50,
    // totalHDim,
    // totalHFerie,
    // totalIndemnite
  } = useAppSelector((store) => store.bulletinDePaie)
  const formatCell2 = (value: number) => {
    return value.toFixed(2).toString().padStart(2, '0') + ' H'
  }

  const [state, setState] = useState({
    hsni130: 0,
    hsni150: 0,
    hsi130: 0,
    hsi150: 0,
    totalHs30: 0,
    totalHs50: 0,
    totalHDim: 0,
    totalHFerie: 0,
    valHsni130: 0,
    valHsni150: 0,
    valHsi130: 0,
    valHsi150: 0,
    valHs30: 0,
    valHs50: 0,
    valHdim: 0,
    valHFerie: 0,
    salaireBrut: 0,
    salaireNetAPayer: 0,
  })

  // useEffect(() => {
  //   calculPaie.setTotalPrimeEtGratification(totalPrimeEtGratification)
  //   calculPaie.setTotalDeduction(totalDeduction)

  //   const hsni130 = calculPaie.getHsni130()
  //   const hsni150 = calculPaie.getHsni150()
  //   const hsi130 = calculPaie.getHsi130()
  //   const hsi150 = calculPaie.getHsi150()
  //   const totalHs30 = calculPaie.getTotalHs30()
  //   const totalHs50 = calculPaie.getTotalHs50()
  //   const totalHDim = calculPaie.getTotalHDim()
  //   const totalHFerie = calculPaie.getTotalHFerie()
  //   const valHsni130 = calculPaie.getValHsni130()
  //   const valHsni150 = calculPaie.getValHsni150()
  //   const valHsi130 = calculPaie.getValHsi130()
  //   const valHsi150 = calculPaie.getValHsi150()
  //   const valHs30 = calculPaie.getTotalHs30()
  //   const valHs50 = calculPaie.getTotalHs50()
  //   const valHdim = calculPaie.getValHdim()
  //   const valHFerie = calculPaie.getTotalHFerie()
  //   const salaireBrut = calculPaie.getSalaireBrut()

  //   setState({
  //     hsni130,
  //     hsni150,
  //     hsi130,
  //     hsi150,
  //     totalHs30,
  //     totalHs50,
  //     totalHDim,
  //     totalHFerie,
  //     valHsni130,
  //     valHsni150,
  //     valHsi130,
  //     valHsi150,
  //     valHs30,
  //     valHs50,
  //     valHdim,
  //     valHFerie,
  //     salaireBrut,
  //     salaireNetAPayer: salaireBrut - totalDeduction,
  //   })
  // }, [totalDeduction, totalPrimeEtGratification])

  return (
    <div className="w-full text-sm">
      <div className="flex justify-between px-4 py-2 border-b border-b-customBlue-100">
        <div>Salaire de base</div>
        <div>{formatAriaryMga(salaireDeBase)}</div>
      </div>
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HSNI 130%"
        cell2={formatCell2(state.hsni130)}
        cell3={state.valHsni130}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HSNI 150%"
        cell2={formatCell2(state.hsni150)}
        cell3={state.valHsni150}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HSI 130%"
        cell2={formatCell2(state.hsi130)}
        cell3={state.valHsi130}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HSI 150%"
        cell2={formatCell2(state.hsi150)}
        cell3={state.valHsi150}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HS 30%"
        cell2={formatCell2(state.totalHs30)}
        cell3={state.valHs30}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HS 50%"
        cell2={formatCell2(state.totalHs50)}
        cell3={state.valHs50}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HFérié"
        cell2={formatCell2(state.totalHFerie)}
        cell3={state.valHFerie}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="HDimanche"
        cell2={formatCell2(state.totalHDim)}
        cell3={state.valHdim}
      />
      <CardRow className="border-b border-b-customBlue-100" cell1="Rappel" cell3={rappel} />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Absence/Retard"
        cell3={totalDeduction}
      />
      <CardRow
        className="border-b border-b-customBlue-100"
        cell1="Primes Et Gratification"
        cell3={totalPrimeEtGratification}
      />
      <div className="flex justify-between px-4 py-2 ">
        <div>Salaire brut</div>
        <div className="text-customRed-900">{formatAriaryMga(state.salaireBrut)}</div>
      </div>
    </div>
  )
}

const CardSalaireBrut = () => {
  return <CustomSection title="Salaire Brut" body={<Body />} />
}

export default CardSalaireBrut
