import React from 'react'
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
  const indemnite = useSelector((state) => state.bulletinDePaie.indemnite)
  const salaireDeBase = selecteEmploy.salaireBase
  const isCadre = selecteEmploy.cadre

  // ------------------------------
  const calculPaie = new CalculPai(salaireDeBase)
  calculPaie.setTauxHoraire(173.33)
  calculPaie.setHsni130(employeeTotalHours.hsni130)
  calculPaie.setHsni150(employeeTotalHours.hsni150)
  calculPaie.setTotalHs130(employeeTotalHours.totalHs130)
  calculPaie.setTotalHs150(employeeTotalHours.totalHs150)
  calculPaie.setTotalHn30(employeeTotalHours.totalHs30)
  calculPaie.setTotalHn50(employeeTotalHours.totalHs50)
  calculPaie.setTotalHDim(employeeTotalHours.totalHdim)
  calculPaie.setIsCadre(isCadre)
  // calculPaie.setPrimeEtAvantage()

  const hsni130_ = calculPaie.getHsni130()
  const hsni150_ = calculPaie.getHsni150()
  const hsi130_ = calculPaie.getHsi130()
  const hsi150_ = calculPaie.getHsi150()
  const hn30 = calculPaie.getHn30()
  const hn50 = calculPaie.getHn50()
  const hdim = calculPaie.getHDim()
  const salaireBrute_ = calculPaie.getSalaireBrut()
  const cnaps_ = calculPaie.getCnaps()
  const omsi_ = calculPaie.getOmsi()
  const baseIrsa = calculPaie.getBaseIrsa()
  const baseCnaps = calculPaie.getBaseCnaps()

  // console.log(`hsni130_: ${hsni130_}`)
  // console.log(`hsni150_: ${hsni150_}`)
  // console.log(`hsi130_: ${hsi130_}`)
  // console.log(`hsi150_: ${hsi150_}`)
  // console.log(`hn30: ${hn30}`)
  // console.log(`hn50: ${hn50}`)
  // console.log(`hdim: ${hdim}`)
  // console.log(`salaireBrute_: ${salaireBrute_}`)
  // console.log(`cnaps_: ${cnaps_}`)
  // console.log(`omsi_: ${omsi_}`)
  // console.log(`baseIrsa: ${baseIrsa}`)
  // console.log(`baseCnaps: ${baseCnaps}`)
  // console.log(indemnite)
  // ------------------------------

  const tauxHoraire = selecteEmploy.salaireBase / 173.33

  const calculHs = (heures, majoration) => {
    let valeur = 0
    valeur = (tauxHoraire * heures * majoration) / 100
    return valeur
  }
  const hsni130Value = calculHs(employeeTotalHours.hsni130, 130)
  const hsni150Value = calculHs(employeeTotalHours.hsni150, 150)
  const hsi130Value = calculHs(employeeTotalHours.totalHs130 - employeeTotalHours.hsni130, 130)
  const hsi150Value = calculHs(employeeTotalHours.totalHs150 - employeeTotalHours.hsni150, 150)
  const hn30Value = calculHs(employeeTotalHours.totalHs30, 30)
  const hn50Value = calculHs(employeeTotalHours.totalHs50, 50)
  const hdimValue = calculHs(employeeTotalHours.totalHdim, 100)

  const salaireBruteVal =
    hsni130Value +
    hsni150Value +
    hsi130Value +
    hsi150Value +
    hn30Value +
    hn50Value +
    hdimValue +
    selecteEmploy.salaireBase

  const formatedHsni130Value = formatAriaryMga(hsni130Value)
  const formatedHsni150Value = formatAriaryMga(hsni150Value)
  const formatedHsi130Value = formatAriaryMga(hsi130Value)
  const formatedHsi150Value = formatAriaryMga(hsi150Value)
  const formatedHn30Value = formatAriaryMga(hn30Value)
  const formatedHn50Value = formatAriaryMga(hn50Value)
  const formatedHdimValue = formatAriaryMga(hdimValue)
  const formatedSlaireBruteValue = formatAriaryMga(salaireBruteVal)
  const formatedSalaireBase = formatAriaryMga(salaireDeBase)

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
      <table className="table-auto">
        <tbody>
          <tr className="flex flex-wrap justify-between border-b border-customRed-100">
            <td colSpan="2" className="text-left py-3 pl-4 font-medium">
              Salaire de base
            </td>
            <td className="text-right py-3 px-4 font-medium">{formatedSalaireBase}</td>
          </tr>
          {data.map((item, index) => (
            <tr
              className="flex flex-wrap justify-between border-b border-customRed-100"
              key={index}
            >
              <td className="text-left py-3 pl-4 font-medium">{item.title}</td>
              <td className="text-left py-3 pl-8 pr-8">
                {item.hours.toString().padStart(2, '0')} H
              </td>
              <td className="text-right py-3 px-4">{item.value}</td>
            </tr>
          ))}
          <tr className="flex flex-wrap justify-between border-b border-customRed-100">
            <td colSpan="2" className="text-left py-3 pl-4 font-medium">
              Salaire brute
            </td>
            <td className="text-right py-3 px-4 font-medium text-customRed-900">
              {formatedSlaireBruteValue}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  React.useEffect(() => {
    let mount = true

    if (mount) {
      dispatch(setBulletinDePaie({ indemnite: [] }))
    }

    return () => {
      mount = false
    }
  }, [dispatch])

  React.useEffect(() => {
    let mount = true
    if (salaireBruteVal && mount) {
      dispatch(setSelectedEmployeSalaireBrut(salaireBruteVal))
      dispatch(setBulletinDePaie({ salaireBrute: salaireBruteVal }))
    }
    if (hsni130Value) {
      if (mount) {
        dispatch(setHsni130Value(hsni130Value))
      }
    }
    if (hsni150Value && mount) {
      dispatch(setHsni150Value(hsni150Value))
    }

    if (hn30Value && mount) {
      dispatch(setBulletinDePaie({ hs30: hn30Value }))
    }
    if (hn50Value && mount) {
      dispatch(setBulletinDePaie({ hs50: hn50Value }))
    }

    return () => {
      mount = false
    }
  }, [salaireBruteVal, hsni130Value, hsni150Value, hn30Value, hn50Value, dispatch])

  return (
    <div>
      <CustomSection title={title} body={<Body />} />
    </div>
  )
}

export default SalaireBrut
