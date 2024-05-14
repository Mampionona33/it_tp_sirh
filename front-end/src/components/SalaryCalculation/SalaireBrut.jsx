import React, { useMemo } from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector, useDispatch } from 'react-redux'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import CalculateurPaie from 'src/utils/CalculateurPaie'

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
  const avance = useSelector((state) => state.bulletinDePaie.avance)
  const totalHFerie = useSelector((state) => state.bulletinDePaie.totalHFerie)

  const totalPrimeEtAvantage = useSelector((state) => state.bulletinDePaie.totalPrimeEtAvantage)
  const totalDeduction = useSelector((state) => state.bulletinDePaie.totalDeduction)

  const calculateurPaie = useMemo(() => {
    const calc = new CalculateurPaie(salaireDeBase)
    calc.setHsni130(hsni130)
    calc.setHsni150(hsni150)
    calc.setIsCadre(isCadre)
    calc.setHsi130(hsi130)
    calc.setHsi150(hsi150)
    calc.setTotalHDim(totalHDim)
    calc.setTotalDeduction(totalDeduction)
    calc.setTotalPrimeEtAvantage(totalPrimeEtAvantage)
    calc.setAvance(avance)
    calc.setTotalHFerie(totalHFerie)
    calc.setTotalHs30(totalHs30)
    calc.setTotalHs50(totalHs50)
    return calc
  }, [
    totalHs50 || 0,
    totalHs30 || 0,
    totalHFerie || 0,
    avance || 0,
    salaireDeBase || 0,
    isCadre,
    hsni130 || 0,
    totalPrimeEtAvantage || 0,
    totalDeduction || 0,
    hsni150 || 0,
    hsi130 || 0,
    hsi150 || 0,
    totalHDim || 0,
  ])

  const valHsni130 = calculateurPaie.getValHsni130()
  const valHFerie = calculateurPaie.getValHFerie()
  const valHsni150 = calculateurPaie.getValHsni150()
  const valHsi130 = calculateurPaie.getValHsi130()
  const valHsi150 = calculateurPaie.getValHsi150()
  const valHdim = calculateurPaie.getValHdim()
  const salaireBrut = calculateurPaie.getSalaireBrut()
  const baseCnaps = calculateurPaie.getBaseCnaps()
  const omsi = calculateurPaie.getOmsi()
  const cnaps = calculateurPaie.getValCnaps()
  const baseIrsa = calculateurPaie.getBaseIrsa()
  const baseIrsaArrondi = calculateurPaie.getBaseIrsaArrondi()
  const irsaAPayer = calculateurPaie.getIrsaAPayer()
  const salaireNet = calculateurPaie.getSalaireNet()
  const salaireNetAPayer = calculateurPaie.getSalaireNetAPayer()
  const plafondSME = calculateurPaie.getPlafondSME()
  const tauxCnaps = calculateurPaie.getTauxCnaps()
  const tauxOmsi = calculateurPaie.getTauxOmsi()
  const valHs30 = calculateurPaie.getValHs30()
  const valHs50 = calculateurPaie.getValHs50()

  const formatedHsni130Value = formatAriaryMga(valHsni130)
  const formatedHsni150Value = formatAriaryMga(valHsni150)
  const formatedHsi130Value = formatAriaryMga(valHsi130)
  const formatedHsi150Value = formatAriaryMga(valHsi150)
  const formatedHn30Value = formatAriaryMga(valHs30)
  const formatedHn50Value = formatAriaryMga(valHs50)
  const formatedHdimValue = formatAriaryMga(valHdim)
  const formatedSlaireBruteValue = formatAriaryMga(salaireBrut)
  const formatedSalaireBase = formatAriaryMga(salaireDeBase)
  const formatedPrimeEtAvantage = formatAriaryMga(totalPrimeEtAvantage)
  const formatedRetenue = formatAriaryMga(totalDeduction)
  const formatedValHFerie = formatAriaryMga(valHFerie)

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
      hours: `${Math.round(hsi130 * 100) / 100}`,
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
    {
      title: 'HFérié% :',
      hours: `${totalHFerie}`,
      value: `${formatedValHFerie}`,
    },
  ]

  const Body = () => {
    return (
      <>
        <div className="flex flex-col">
          {/* First Element */}
          <div className="sm:grid sm:grid-cols-2">
            <div className="font-medium px-4 py-2 border-b align-middle border-customRed-100">
              Salaire de base:
            </div>
            <div className="text-right px-4 py-2 border-b align-middle border-customRed-100">
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
                <div className="font-medium px-4 py-2 border-b align-middle border-customRed-100">
                  {item.title}
                </div>
                <div className="sm:text-center text-right px-4 py-2 border-b align-middle border-customRed-100">
                  {item.hours.toString().padStart(2, '0')} H
                </div>
                <div className="text-right px-4 py-2 border-b align-middle border-customRed-100">
                  {item.value}
                </div>
              </div>
            </React.Fragment>
          ))}
          <div className="sm:grid sm:grid-cols-2">
            <div className="font-medium px-4 py-2 border-b align-middle border-customRed-100">
              Primes et avantages:
            </div>
            <div className="text-right px-4 py-2 border-b align-middle border-customRed-100">
              {formatedPrimeEtAvantage}
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-2">
            <div className="font-medium px-4 py-2 border-b align-middle border-customRed-100">
              Retenues:
            </div>
            <div className="text-right px-4 py-2 border-b align-middle border-customRed-100">
              {formatedRetenue}
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-2">
            <div className="font-medium px-4 py-2 border-b align-middle border-customRed-100">
              Salaire brut:
            </div>
            <div className="text-right px-4 py-2 font-semibold  text-customRed-900 border-b align-middle border-customRed-100">
              {formatedSlaireBruteValue}
            </div>
          </div>
        </div>
      </>
    )
  }

  React.useEffect(() => {
    let mount = true
    if (salaireBrut && mount) {
      dispatch(setBulletinDePaie({ salaireBrut: salaireBrut }))
    }
    if (valHsni130) {
      if (mount) {
        dispatch(setBulletinDePaie({ valHsni130: valHsni130 }))
      }
    }
    if (valHsni150 && mount) {
      dispatch(setBulletinDePaie({ valHsni150: valHsni150 }))
    }
    if (plafondSME && mount) {
      dispatch(setBulletinDePaie({ plafondSME: plafondSME }))
    }
    if (cnaps && mount) {
      dispatch(setBulletinDePaie({ cnaps: cnaps }))
    }
    if (valHs30 && mount) {
      dispatch(setBulletinDePaie({ valHs30: valHs30 }))
    }
    if (valHs50 && mount) {
      dispatch(setBulletinDePaie({ valHs50: valHs50 }))
    }

    if (baseIrsaArrondi && mount) {
      dispatch(setBulletinDePaie({ baseIrsaArrondi: baseIrsaArrondi }))
    }
    if (irsaAPayer && mount) {
      dispatch(setBulletinDePaie({ irsaAPayer: irsaAPayer }))
    }
    if (mount && salaireNet) {
      dispatch(setBulletinDePaie({ salaireNet: salaireNet }))
    }

    if (baseIrsa && mount) {
      dispatch(setBulletinDePaie({ baseIrsa: baseIrsa }))
    }

    if (mount && valHFerie) {
      dispatch(setBulletinDePaie({ valHFerie: valHFerie }))
    }

    if (baseIrsaArrondi && mount) {
      const baseIrsaObjectIndex = retenuSalaire.findIndex((ret) => ret.label === 'irsa')

      if (baseIrsaObjectIndex === -1) {
        dispatch(
          setBulletinDePaie({
            retenuSalaire: [...retenuSalaire, { label: 'irsa', montant: baseIrsaArrondi }],
          }),
        )
      }
    }
    if (omsi && mount) {
      dispatch(setBulletinDePaie({ omsi: omsi }))
      if (tauxOmsi) {
        const omsiObjectIndex = retenuSalaire.findIndex(
          (ret) => ret.label === 'Retenue sur organisme sanitaire',
        )

        if (omsiObjectIndex === -1) {
          dispatch(
            setBulletinDePaie({
              retenuSalaire: [
                ...retenuSalaire,
                { taux: tauxOmsi, label: 'Retenue sur organisme sanitaire', montant: omsi },
              ],
            }),
          )
        }
      }
    }

    if (mount && cnaps && baseCnaps && tauxCnaps) {
      const cnapsObjectIndex = retenuSalaire.findIndex((ret) => ret.label === 'cnaps')

      if (cnapsObjectIndex === -1) {
        dispatch(
          setBulletinDePaie({
            retenuSalaire: [
              ...retenuSalaire,
              { base: baseCnaps, taux: tauxCnaps, label: 'cnaps', montant: cnaps },
            ],
          }),
        )
      }
    }

    if (mount && salaireNetAPayer) {
      dispatch(setBulletinDePaie({ salaireNetAPayer: salaireNetAPayer }))
    }

    return () => {
      mount = false
    }
  }, [
    valHs50,
    valHs30,
    valHFerie,
    retenuSalaire,
    tauxOmsi,
    salaireNetAPayer,
    dispatch,
    tauxCnaps,
    valHsi150,
    valHsni150,
    baseCnaps,
    omsi,
    salaireBrut,
    valHsni130,
    plafondSME,
    cnaps,
    baseIrsaArrondi,
    baseIrsa,
    irsaAPayer,
    salaireNet,
  ])

  return (
    <div>
      <CustomSection title={title} body={<Body />} />
    </div>
  )
}

export default SalaireBrut
