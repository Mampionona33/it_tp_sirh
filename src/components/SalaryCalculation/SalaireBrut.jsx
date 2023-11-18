import React, { useMemo } from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector, useDispatch } from 'react-redux'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
// import {
//   setHsni130Value,
//   setHsni150Value,
//   setSelectedEmployeSalaireBrut,
// } from 'src/redux/selectedEmploye/selectedEmployeReducer'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import CalculPai from 'src/utils/CalculPaie'

const SalaireBrut = () => {
  const dispatch = useDispatch()
  const title = 'Salaire brut'
  const selecteEmploy = useSelector((state) => state.bulletinDePaie.salarie)
  const isCadre = selecteEmploy.cadre
  const salaireDeBase = useSelector((state) => state.bulletinDePaie.salaireDeBase)
  const hsni130 = useSelector((state) => state.bulletinDePaie.hsni130)
  const hsni150 = useSelector((state) => state.bulletinDePaie.hsni150)
  const totalHs130 = useSelector((state) => state.bulletinDePaie.totalHs130)
  const totalHs150 = useSelector((state) => state.bulletinDePaie.totalHs150)
  const totalHs30 = useSelector((state) => state.bulletinDePaie.totalHs30)
  const totalHs50 = useSelector((state) => state.bulletinDePaie.totalHs50)
  const totalHDim = useSelector((state) => state.bulletinDePaie.totalHDim)
  const retenuSalaire = useSelector((state) => state.bulletinDePaie.retenuSalaire)

  const totalPrimeEtAvantage = useSelector((state) => state.bulletinDePaie.totalPrimeEtAvantage)
  const totalDeduction = useSelector((state) => state.bulletinDePaie.totalDeduction)

  // console.log(totalPrimeEtAvantage)
  // console.log(totalDeduction)

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
    calc.setIsCadre(isCadre)
    calc.setTotalRetenuSalarie(totalDeduction)
    return calc
  }, [
    totalDeduction,
    isCadre,
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
  const hn30_ = calculPaie.getHn30()
  const hn50_ = calculPaie.getHn50()
  const hdim_ = calculPaie.getHDim()
  const salaireBrut_ = calculPaie.getSalaireBrut()
  const cnaps_ = calculPaie.getCnaps()
  const omsi_ = calculPaie.getOmsi()
  const irsaArrondi = calculPaie.getBaseIrsaArrondi()
  const salaireNet = calculPaie.getSalaireNet()

  const baseIrsa = useMemo(() => {
    return calculPaie.getBaseIrsa()
  }, [calculPaie])

  const baseCnaps = useMemo(() => {
    return calculPaie.getBaseCnaps()
  }, [calculPaie])

  const plafondSME = calculPaie.getPlafondSME()
  const tauxCnaps = calculPaie.getTauxCnaps()
  const tauxOmsi = calculPaie.getTauxOmsi()
  const irsaAPayer = calculPaie.getIrsaAPayer()

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
  const formatedHn30Value = formatAriaryMga(hn30_)
  const formatedHn50Value = formatAriaryMga(hn50_)
  const formatedHdimValue = formatAriaryMga(hdim_)
  const formatedSlaireBruteValue = formatAriaryMga(salaireBrut_)
  const formatedSalaireBase = formatAriaryMga(salaireDeBase)
  const formatedPrimeEtAvantage = formatAriaryMga(totalPrimeEtAvantage)
  const formatedRetenue = formatAriaryMga(totalDeduction)

  const data = [
    {
      title: 'HSNI 130% :',
      hours: `${hsni130}`,
      value: `${formatedHsni130Value}`,
    },
    {
      title: 'HSNI 150% :',
      hours: `${hsni150}`,
      value: `${formatedHsni150Value}`,
    },
    {
      title: 'HSI 130% :',
      hours: `${totalHs130 - hsni130}`,
      value: `${formatedHsi130Value}`,
    },
    {
      title: 'HSI 150% :',
      hours: `${totalHs150 - hsni150}`,
      value: `${formatedHsi150Value}`,
    },
    {
      title: 'HN 30% :',
      hours: `${totalHs30}`,
      value: `${formatedHn30Value}`,
    },
    {
      title: 'HN 50% :',
      hours: `${totalHs50}`,
      value: `${formatedHn50Value}`,
    },
    {
      title: 'Hdim% :',
      hours: `${totalHDim}`,
      value: `${formatedHdimValue}`,
    },
  ]

  const Body = () => {
    return (
      <>
        <div className="grid grid-cols-2   ">
          <div className="col-span-2">
            <div className="grid grid-cols-3  ">
              <div className="font-medium p-3 border-b align-middle border-customRed-100">
                Salaire de base:
              </div>
              <div className="col-span-2 text-right p-3 border-b align-middle border-customRed-100">
                {formatedSalaireBase}
              </div>

              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="font-medium p-3   border-b align-middle border-customRed-100">
                    {item.title}
                  </div>
                  <div className="text-center p-3   border-b align-middle border-customRed-100">
                    {item.hours.toString().padStart(2, '0')} H
                  </div>
                  <div className="text-right p-3  border-b align-middle border-customRed-100">
                    {item.value}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-2">
              <div className="font-medium p-3 border-b  align-middle border-customRed-100">
                Primes et avantages:
              </div>
              <div className="text-right  p-3 border-b align-middle border-customRed-100">
                {formatedPrimeEtAvantage}
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-2">
              <div className="font-medium p-3 border-b  align-middle border-customRed-100">
                Retenues:
              </div>
              <div className="text-right  p-3 border-b align-middle border-customRed-100">
                {formatedRetenue}
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-2">
              <div className="font-medium p-3 align-middle">Salaire brute:</div>
              <div className="text-right font-medium p-3 align-middle text-customRed-900">
                {formatedSlaireBruteValue}
              </div>
            </div>
          </div>
        </div>
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

    if (hn30_ && mount) {
      dispatch(setBulletinDePaie({ valeurHs30: hn30_ }))
    }
    if (hn50_ && mount) {
      dispatch(setBulletinDePaie({ valeurHs50: hn50_ }))
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
    if (irsaArrondi && mount) {
      dispatch(setBulletinDePaie({ irsaArrondi: irsaArrondi }))
    }
    if (irsaAPayer && mount) {
      dispatch(setBulletinDePaie({ irsaAPayer: irsaAPayer }))
    }
    if (salaireNet && salaireNet) {
      dispatch(setBulletinDePaie({ salaireNet: salaireNet }))
    }

    if (baseIrsa && mount) {
      dispatch(setBulletinDePaie({ baseIrsa: baseIrsa }))
    }

    if (irsaArrondi && mount) {
      const baseIrsaObjectIndex = retenuSalaire.findIndex((ret) => ret.label === 'irsa')

      if (baseIrsaObjectIndex === -1) {
        dispatch(
          setBulletinDePaie({
            retenuSalaire: [...retenuSalaire, { label: 'irsa', montant: irsaArrondi }],
          }),
        )
      }
    }

    if (mount && cnaps_ && baseCnaps && tauxCnaps) {
      const cnapsObjectIndex = retenuSalaire.findIndex((ret) => ret.label === 'cnaps')

      if (cnapsObjectIndex === -1) {
        dispatch(
          setBulletinDePaie({
            retenuSalaire: [
              ...retenuSalaire,
              { base: baseCnaps, taux: tauxCnaps, label: 'cnaps', montant: cnaps_ },
            ],
          }),
        )
      }
    }

    return () => {
      mount = false
    }
  }, [
    retenuSalaire,
    salaireNet,
    salaireBrut_,
    tauxCnaps,
    tauxOmsi,
    hsni130_,
    plafondSME,
    hsni150_,
    hn30_,
    hn50_,
    dispatch,
    cnaps_,
    baseIrsa,
    baseCnaps,
    irsaAPayer,
    omsi_,
    irsaArrondi,
  ])

  return (
    <div>
      <CustomSection title={title} body={<Body />} />
    </div>
  )
}

export default SalaireBrut
