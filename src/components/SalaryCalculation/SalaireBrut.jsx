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
  const hsi130 = useSelector((state) => state.bulletinDePaie.hsi130)
  const hsni150 = useSelector((state) => state.bulletinDePaie.hsni150)
  const hsi150 = useSelector((state) => state.bulletinDePaie.hsi150)
  const totalHs130 = useSelector((state) => state.bulletinDePaie.totalHs130)
  const totalHs150 = useSelector((state) => state.bulletinDePaie.totalHs150)
  const totalHs30 = useSelector((state) => state.bulletinDePaie.totalHs30)
  const totalHs50 = useSelector((state) => state.bulletinDePaie.totalHs50)
  const totalHDim = useSelector((state) => state.bulletinDePaie.totalHDim)
  const retenuSalaire = useSelector((state) => state.bulletinDePaie.retenuSalaire)
  const totalHs = useSelector((state) => state.bulletinDePaie.totalHs)

  const totalPrimeEtAvantage = useSelector((state) => state.bulletinDePaie.totalPrimeEtAvantage)
  const totalDeduction = useSelector((state) => state.bulletinDePaie.totalDeduction)

  const calculPaie = useMemo(() => {
    const calc = new CalculPai()
    calc.setSalaireDeBase(salaireDeBase * 1)
    calc.setTauxHoraire(173.33)
    calc.setHsni130(hsni130 * 1)
    calc.setHsni150(hsni150 * 1)
    calc.setTotalHs130(totalHs130 * 1)
    calc.setTotalHs(totalHs * 1)
    calc.setTotalHs150(totalHs150 * 1)
    calc.setTotalHn30(totalHs30 * 1)
    calc.setTotalHn50(totalHs50 * 1)
    calc.setTotalHDim(totalHDim * 1)
    calc.setTotalAjoutSalaire(totalPrimeEtAvantage * 1)
    calc.setIsCadre(isCadre)
    calc.setTotalRetenuSalarie(totalDeduction * 1)
    return calc
  }, [
    totalHs,
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
  const salaireNet_ = calculPaie.getSalaireNet()
  const salaireNetAPayer_ = calculPaie.getSalaireNetAPayer()

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
      hours: `${hsi130}`,
      value: `${formatedHsi130Value}`,
    },
    {
      title: 'HSI 150% :',
      hours: `${hsi150}`,
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
        <div className="flex flex-col">
          {/* First Element */}
          <div className="sm:grid sm:grid-cols-2">
            <div className="font-medium p-3 border-b align-middle border-customRed-100">
              Salaire de base:
            </div>
            <div className="text-right p-3 border-b align-middle border-customRed-100">
              {formatedSalaireBase}
            </div>
          </div>

          {/* Subsequent Elements */}
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {/* Alternating background colors in mobile mode */}
              <div
                className={`sm:grid sm:bg-transparent sm:grid-cols-3 ${
                  index % 2 === 0 ? 'mobile:bg-gray-100' : 'mobile:bg-white'
                }`}
              >
                <div className="font-medium p-3 border-b align-middle border-customRed-100">
                  {item.title}
                </div>
                <div className="sm:text-center text-right p-3 border-b align-middle border-customRed-100">
                  {item.hours.toString().padStart(2, '0')} H
                </div>
                <div className="text-right p-3 border-b align-middle border-customRed-100">
                  {item.value}
                </div>
              </div>
            </React.Fragment>
          ))}
          <div className="sm:grid sm:grid-cols-2">
            <div className="font-medium p-3 border-b align-middle border-customRed-100">
              Primes et avantages:
            </div>
            <div className="text-right p-3 border-b align-middle border-customRed-100">
              {formatedPrimeEtAvantage}
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-2">
            <div className="font-medium p-3 border-b align-middle border-customRed-100">
              Retenues:
            </div>
            <div className="text-right p-3 border-b align-middle border-customRed-100">
              {formatedRetenue}
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-2">
            <div className="font-medium p-3 border-b align-middle border-customRed-100">
              Salaire brute:
            </div>
            <div className="text-right p-3 font-semibold  text-customRed-900 border-b align-middle border-customRed-100">
              {formatedSlaireBruteValue}
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
    if (mount && salaireNet_) {
      dispatch(setBulletinDePaie({ salaireNet: salaireNet_ }))
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
    if (omsi_ && mount) {
      dispatch(setBulletinDePaie({ omsi: omsi_ }))
      if (tauxOmsi) {
        const omsiObjectIndex = retenuSalaire.findIndex(
          (ret) => ret.label === 'Retenue sur organisme sanitaire',
        )

        if (omsiObjectIndex === -1) {
          dispatch(
            setBulletinDePaie({
              retenuSalaire: [
                ...retenuSalaire,
                { taux: tauxOmsi, label: 'Retenue sur organisme sanitaire', montant: omsi_ },
              ],
            }),
          )
        }
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

    if (mount && salaireNetAPayer_) {
      dispatch(setBulletinDePaie({ salaireNetAPayer: salaireNetAPayer_ }))
    }

    return () => {
      mount = false
    }
  }, [
    salaireNetAPayer_,
    retenuSalaire,
    salaireNet_,
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
