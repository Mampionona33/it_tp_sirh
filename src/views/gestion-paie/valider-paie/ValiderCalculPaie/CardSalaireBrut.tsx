import CustomSection from '@src/components/CustomSection'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import formatAriaryMga from '@src/utils/formatAriaryMga'
import React, { useEffect, useMemo, useState } from 'react'
import CardRow from './CardRow'
import useSalaireNetAPayerUpdate from '@src/hooks/useSalaireNetAPayerUpdate'
import calculPaie from '@src/utils/CalculPaie'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import CalculPaie_v2 from '@src/utils/CalculPaie_v2'
import { EnumBoolean } from '@src/interfaces/interfaceEmploye'
import CalculPaie from '@src/utils/CalculPaie'

const Body = () => {
  const { employeHours } = useAppSelector((store) => store.employeHours)
  const {
    salarie,
    totalPrimeEtGratification,
    salaireDeBase,
    totalDeduction,
    rappel,
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
    totalIndemnite,
    salaireBrut,
  } = useAppSelector((store) => store.bulletinDePaie)
  const formatCell2 = (value: number) => {
    return value.toFixed(2).toString().padStart(2, '0') + ' H'
  }

  // const calcul = useMemo(() => {
  //   const calculPaie = new CalculPaie_v2(salaireDeBase)
  //   const hsni130 = calculHeuresEmploye.getHsni130()
  //   const est_cadre: boolean = salarie.categorie === 'hc'

  //   const valHsni130 = calculPaie.calculateValHsni130(hsni130, est_cadre)

  //   return {
  //     hsni130,
  //     valHsni130,
  //   }
  // }, [salaireDeBase, salarie])

  // useEffect(() => {
  //   const updateBulletinDePaie = async () => {
  //     if (calcul) {
  //       console.log(calcul.hsni130, calcul.valHsni130)

  //       // Dispatch les mises à jour
  //       // await dispatch(setBulletinDePaie({ hsni130: calcul.hsni130 }))
  //       // await dispatch(setBulletinDePaie({ valHsni130: calcul.valHsni130 }))

  //       // Votre logique supplémentaire ici, si nécessaire
  //     }
  //   }

  //   updateBulletinDePaie()
  // }, [calcul])

  // const calcul = useMemo(() => {
  //   calculHeuresEmploye.setHeuresMonsuelEmploye(employeHours)
  //   salarie.categorie === 'hc' && calculHeuresEmploye.setEstCadre(true)
  //   salarie.travail_de_nuit === EnumBoolean.OUI && calculHeuresEmploye.setTravailDeNuit(true)
  //   const totalHn = calculHeuresEmploye.getTotalHnormale()
  //   const totalHs30 = calculHeuresEmploye.getTotalTravailDeNuit30()
  //   const totalHs50 = calculHeuresEmploye.getTotalTravailDeNuit50()
  //   const totalHDim = calculHeuresEmploye.getTotalHdim()
  //   const totalHs = calculHeuresEmploye.getTotalHsDuMois()
  //   const totalHs130 = calculHeuresEmploye.getTotalHs130()
  //   const totalHs150 = calculHeuresEmploye.getTotalHs150()
  //   const hsni130 = calculHeuresEmploye.getHsni130()
  //   const hsni150 = calculHeuresEmploye.getHsni150()
  //   const hsi130 = calculHeuresEmploye.getHsi130()
  //   const hsi150 = calculHeuresEmploye.getHsi150()
  //   const totalHFerie = calculHeuresEmploye.getTotalHFerie()

  //   const calculPaie = new CalculPaie(salaireDeBase)
  //   salarie.categorie === 'hc' && calculPaie.setEstCadre(true)
  //   calculPaie.setHsni130(hsni130)
  //   calculPaie.setHsni150(hsni150)
  //   calculPaie.setHsi130(hsi130)
  //   calculPaie.setHsi150(hsi150)
  //   calculPaie.setTotalHs30(totalHs30)
  //   calculPaie.setTotalHs50(totalHs50)
  //   calculPaie.setTotalHDim(totalHDim)
  //   calculPaie.setTotalHFerie(totalHFerie)

  //   const cnaps = calculPaie.getCnaps()
  //   const osie = calculPaie.getOsie()
  //   const valHsni130 = calculPaie.getValHsni130()
  //   const valHsni150 = calculPaie.getValHsni150()
  //   const valHsi130 = calculPaie.getValHsi130()
  //   const valHsi150 = calculPaie.getValHsi150()
  //   const valHs30 = calculPaie.getValHs30()
  //   const valHs50 = calculPaie.getValHs50()
  //   const valHdim = calculPaie.getValHdim()
  //   const valHFerie = calculPaie.getValHFerie()
  //   const salaireBrut = calculPaie.getSalaireBrut()
  //   const baseIrsa = calculPaie.getBaseIrsa()
  //   const baseIrsaArrondi = calculPaie.getBaseIrsaArrondi()
  //   const irsaAPayer = calculPaie.getIrsaAPayer()
  //   const salaireNet = calculPaie.getSalaireNet()
  //   const salaireNetAPayer = calculPaie.getSalaireNetAPayer()

  //   return {
  //     cnaps,
  //     osie,
  //     valHsni130,
  //     valHsni150,
  //     valHsi130,
  //     valHsi150,
  //     valHs30,
  //     valHs50,
  //     valHdim,
  //     valHFerie,
  //     salaireBrut,
  //     baseIrsa,
  //     baseIrsaArrondi,
  //     irsaAPayer,
  //     salaireNet,
  //     salaireNetAPayer,
  //     totalHFerie,
  //     totalHs,
  //     totalHs130,
  //     totalHs150,
  //     totalHn,
  //     totalHs30,
  //     totalHs50,
  //     totalHDim,
  //     hsni130,
  //     hsni150,
  //     hsi130,
  //     hsi150,
  //   }
  // }, [employeHours, salaireDeBase, salarie])

  // useEffect(() => {
  //   const updateBulletindDePaie = async () => {}
  //   if (calcul) {
  //     updateBulletindDePaie()
  //   }
  // }, [calcul])

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
        <div className="text-customRed-900">{formatAriaryMga(salaireBrut)}</div>
      </div>
    </div>
  )
}

const CardSalaireBrut = () => {
  return <CustomSection title="Salaire Brut" body={<Body />} />
}

export default CardSalaireBrut
