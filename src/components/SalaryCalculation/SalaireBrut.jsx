import React, { useEffect, useMemo, useState } from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector, useDispatch } from 'react-redux'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import {
  setHsni130Value,
  setHsni150Value,
  setSelectedEmployeSalaireBrut,
} from 'src/redux/selectedEmploye/selectedEmployeReducer'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import CalculPai from 'src/utils/CalculPaie'

const SalaireBrut = () => {
  const dispatch = useDispatch()
  const employeeTotalHours = useSelector((state) => state.employeHours)
  const title = 'Salaire brut'
  const selecteEmploy = useSelector((state) => state.bulletinDePaie.salarie)
  const ajoutSalaire = useSelector((state) => state.bulletinDePaie.ajoutSalaire)
  const retenuSalaire = useSelector((state) => state.bulletinDePaie.retenuSalaire)
  const cotisations = useSelector((state) => state.bulletinDePaie.cotisations)
  // const salaireDeBase = selecteEmploy.salaireBase
  const isCadre = selecteEmploy.cadre
  const salaireDeBase = useSelector((state) => state.bulletinDePaie.salaireDeBase)
  const hsni130 = useSelector((state) => state.bulletinDePaie.hsni130)
  const hsni150 = useSelector((state) => state.bulletinDePaie.hsni150)
  const totalHs130 = useSelector((state) => state.bulletinDePaie.totalHs130)
  const totalHs150 = useSelector((state) => state.bulletinDePaie.totalHs150)
  const totalHs30 = useSelector((state) => state.bulletinDePaie.totalHs30)
  const totalHs50 = useSelector((state) => state.bulletinDePaie.totalHs50)
  const totalHDim = useSelector((state) => state.bulletinDePaie.totalHDim)

  const totalPrimeEtAvantage = useSelector((state) => state.bulletinDePaie.totalPrimeEtAvantage)
  const totalDeduction = useSelector((state) => state.bulletinDePaie.totalDeduction)

  // const totalAjoutSalaire =
  //   ajoutSalaire.length > 0 &&
  //   ajoutSalaire.reduce((acc, cur) => {
  //     if (cur && cur.hasOwnProperty('montant')) {
  //       return acc + cur['montant']
  //     }
  //     return acc
  //   }, 0)

  // const totalRetenuSalarie =
  //   retenuSalaire.length > 0 &&
  //   retenuSalaire.reduce((acc, cur) => {
  //     if (cur && cur.hasOwnProperty('montant')) {
  //       return acc + cur['montant']
  //     }
  //     return acc
  //   }, 0)

  console.log(totalPrimeEtAvantage)
  console.log(totalDeduction)

  // ------------------------------

  const calculPaie = useMemo(() => {
    const calc = new CalculPai(salaireDeBase)
    calc.setTauxHoraire(173.33)
    calc.setHsni130(hsni130)
    calc.setHsni150(hsni150)
    calc.setTotalHs130(totalHs130)
    calc.setTotalHs150(totalHs150)
    calc.setTotalHn30(totalHs30)
    calc.setTotalHn50(totalHs50)
    calc.setTotalHDim(totalHDim)
    calc.setTotalAjoutSalaire(totalPrimeEtAvantage)
    return calc
  }, [
    salaireDeBase,
    hsni130,
    hsni150,
    totalHDim,
    totalHs130,
    totalHs150,
    totalHs30,
    totalHs50,
    totalPrimeEtAvantage,
  ])

  const hsni130_ = calculPaie.getHsni130()
  const hsni150_ = calculPaie.getHsni150()
  const hsi130_ = calculPaie.getHsi130()
  const hsi150_ = calculPaie.getHsi150()
  const hn30 = calculPaie.getHn30()
  const hn50 = calculPaie.getHn50()
  const hdim = calculPaie.getHDim()
  const salaireBrut_ = calculPaie.getSalaireBrut()
  const cnaps_ = calculPaie.getCnaps()
  const omsi_ = calculPaie.getOmsi()

  const baseIrsa = useMemo(() => {
    return calculPaie.getBaseIrsa()
  }, [calculPaie])

  const baseCnaps = useMemo(() => {
    return calculPaie.getBaseCnaps()
  }, [calculPaie])

  const plafondSME = calculPaie.getPlafondSME()
  const tauxCnaps = calculPaie.getTauxCnaps()
  const tauxOmsi = calculPaie.getTauxOmsi()

  // console.log(`hsni130_: ${hsni130_}`)
  // console.log(`hsni150_: ${hsni150_}`)
  // console.log(`hsi130_: ${hsi130_}`)
  // console.log(`hsi150_: ${hsi150_}`)
  // console.log(`hn30: ${hn30}`)
  // console.log(`hn50: ${hn50}`)
  // console.log(`hdim: ${hdim}`)
  // console.log(`salaireBrut_: ${salaireBrut_}`)
  // console.log(`cnaps_: ${cnaps_}`)
  // console.log(`omsi_: ${omsi_}`)
  // console.log(`baseIrsa: ${baseIrsa}`)
  // console.log(`baseCnaps: ${baseCnaps}`)
  // console.log(indemnite)
  // ------------------------------

  const formatedHsni130Value = formatAriaryMga(hsni130_)
  const formatedHsni150Value = formatAriaryMga(hsni150_)
  const formatedHsi130Value = formatAriaryMga(hsi130_)
  const formatedHsi150Value = formatAriaryMga(hsi150_)
  const formatedHn30Value = formatAriaryMga(hn30)
  const formatedHn50Value = formatAriaryMga(hn50)
  const formatedHdimValue = formatAriaryMga(hdim)
  const formatedSlaireBruteValue = formatAriaryMga(salaireBrut_)
  const formatedSalaireBase = formatAriaryMga(salaireDeBase)
  const formatedPrimeEtAvantage = formatAriaryMga(totalPrimeEtAvantage)

  const data = [
    {
      title: 'HSNI 130% :',
      hours: `${employeeTotalHours.hsni130}`,
      value: `${formatedHsni130Value}`,
    },
    {
      title: 'HSNI 150% :',
      hours: `${employeeTotalHours.hsni150}`,
      value: `${formatedHsni150Value}`,
    },
    {
      title: 'HSI 130% :',
      hours: `${employeeTotalHours.totalHs130 - employeeTotalHours.hsni130}`,
      value: `${formatedHsi130Value}`,
    },
    {
      title: 'HSI 150% :',
      hours: `${employeeTotalHours.totalHs150 - employeeTotalHours.hsni150}`,
      value: `${formatedHsi150Value}`,
    },
    {
      title: 'HN 30% :',
      hours: `${employeeTotalHours.totalHs30}`,
      value: `${formatedHn30Value}`,
    },
    {
      title: 'HN 50% :',
      hours: `${employeeTotalHours.totalHs50}`,
      value: `${formatedHn50Value}`,
    },
    {
      title: 'Hdim% :',
      hours: `${employeeTotalHours.totalHdim}`,
      value: `${formatedHdimValue}`,
    },
  ]

  const Body = () => {
    return (
      <>
        <table className="table-auto w-full">
          <tbody>
            <tr className="flex flex-wrap justify-between border-b border-customRed-100">
              <td
                colSpan="2"
                className="text-left py-3 pl-3 font-medium overflow-hidden whitespace-no-wrap"
              >
                Salaire de base
              </td>
              <td className="text-right py-3 pr-3 font-medium">{formatedSalaireBase}</td>
            </tr>
            {data.map((item, index) => (
              <tr
                className="flex flex-wrap sm:justify-between border-b border-customRed-100"
                key={index}
              >
                <td className="text-left w-full py-3 pl-3 pr-0 font-medium sm:w-1/3 overflow-hidden whitespace-nowrap">
                  {item.title}
                </td>
                <td className="flex justify-center text-left py-3 sm:w-1/3">
                  {item.hours.toString().padStart(2, '0')} H
                </td>
                <td className="text-right py-3 pr-3 sm:w-1/3 overflow-hidden whitespace-nowrap">
                  {item.value}
                </td>
              </tr>
            ))}

            <tr className="flex flex-wrap justify-between border-b border-customRed-100">
              <td
                colSpan="2"
                className="text-left py-3 pl-4 font-medium overflow-hidden whitespace-no-wrap"
              >
                Primes et avantages:
              </td>
              <td className="text-right py-3 px-4  text-customRed-900 overflow-hidden whitespace-no-wrap">
                {formatedPrimeEtAvantage}
              </td>
            </tr>
            <tr className="flex flex-wrap justify-between border-b border-customRed-100">
              <td
                colSpan="2"
                className="text-left py-3 pl-4 font-medium overflow-hidden whitespace-no-wrap"
              >
                Salaire brute
              </td>
              <td className="text-right py-3 px-4 font-medium text-customRed-900 overflow-hidden whitespace-no-wrap">
                {formatedSlaireBruteValue}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }

  React.useEffect(() => {
    let mount = true
    if (salaireBrut_ && mount) {
      dispatch(setBulletinDePaie({ salaireBrut: salaireBrut_ }))
    }
    if (hsni130_) {
      if (mount) {
        dispatch(setBulletinDePaie({ valeurHsni130: hsni130_ }))
      }
    }
    if (hsni150_ && mount) {
      dispatch(setBulletinDePaie({ valeurHsni150: hsni150_ }))
    }

    if (hn30 && mount) {
      dispatch(setBulletinDePaie({ valeurHs30: hn30 }))
    }
    if (hn50 && mount) {
      dispatch(setBulletinDePaie({ valeurHs50: hn50 }))
    }

    if (baseIrsa && mount) {
      dispatch(setBulletinDePaie({ baseIrsa: baseIrsa }))
    }
    if (omsi_ && mount) {
      dispatch(setBulletinDePaie({ omsi: omsi_ }))
    }

    if (plafondSME && mount) {
      dispatch(setBulletinDePaie({ plafondSME: plafondSME }))
    }

    if (cnaps_ && mount) {
      dispatch(setBulletinDePaie({ cnaps: cnaps_ }))
    }

    // if (tauxCnaps && mount && cnaps_ && baseCnaps) {
    //   const cnapsObjectIndex = retenuSalaire.findIndex((ret) => ret.label === 'cnaps')

    //   if (cnapsObjectIndex === -1) {
    //     // Si l'objet 'cnaps' n'existe pas encore dans le tableau, ajoutez-le
    //     dispatch(
    //       setBulletinDePaie({
    //         retenuSalaire: [
    //           ...retenuSalaire,
    //           { label: 'cnaps', base: baseCnaps, taux: tauxCnaps, montant: cnaps_ },
    //         ],
    //       }),
    //     )
    //   } else {
    //     // Si l'objet 'cnaps' existe déjà, mettez à jour ses propriétés
    //     dispatch(
    //       setBulletinDePaie({
    //         retenuSalaire: retenuSalaire.map((ret, index) =>
    //           index === cnapsObjectIndex
    //             ? { ...ret, base: baseCnaps, taux: tauxCnaps, montant: cnaps_ }
    //             : ret,
    //         ),
    //       }),
    //     )
    //   }
    // }

    return () => {
      mount = false
    }
  }, [
    salaireBrut_,
    tauxCnaps,
    tauxOmsi,
    hsni130_,
    plafondSME,
    hsni150_,
    hn30,
    hn50,
    dispatch,
    cnaps_,
    baseIrsa,
    baseCnaps,
    omsi_,
  ])

  return (
    <div>
      <CustomSection title={title} body={<Body />} />
    </div>
  )
}

export default SalaireBrut
