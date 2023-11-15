import React, { useCallback, useEffect } from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch, useSelector } from 'react-redux'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import CalculIrsaAPayer from 'src/utils/CalculIrsaAPayer'
import { setIrsaValue } from 'src/redux/selectedEmploye/selectedEmployeReducer'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import useFetchCotisations from 'src/assets/hooks/useFetchCotisations'

const SalaireNet = () => {
  useFetchCotisations()
  const dispatch = useDispatch()
  const title = 'Salaire net'
  const retenue = useSelector((state) => state.bulletinDePaie.retenue)
  const salaireBrut = useSelector((state) => state.selectedEmploye.salaireBrut)
  const selectedEmployeHours = useSelector((state) => state.selectedEmploye)
  const cotisations = useSelector((state) => state.cotisations.liste)

  // Calcul cnaps
  const cnapsVal = retenue.filter((ret) => ret.label === 'cnaps')
  const cnapsMontant = cnapsVal.length > 0 ? cnapsVal[0].montant : 0
  const cnapsData = cotisations.length > 0 ? cotisations.filter((cot) => cot.label === 'cnaps') : []
  // calcul ostie
  const ostieVal = retenue.filter((ret) => ret.label === 'ostie')
  const ostieMontant = ostieVal.length > 0 ? ostieVal[0].montant : 0
  const ostieData = cotisations.length > 0 ? cotisations.filter((cot) => cot.label === 'ostie') : []

  const calculateAndDispatch = useCallback(() => {
    const updatedRetenue = []

    cotisations.forEach((cot) => {
      const tauxVal = cot.taux
      const calculateMontant = salaireBrut * tauxVal
      const label = cot.label

      // Check if label is not already in the updatedRetenue array
      if (!updatedRetenue.some((ret) => ret.label === label)) {
        updatedRetenue.push({ label, taux: tauxVal, montant: calculateMontant })
      }
    })

    const modif = { retenue: updatedRetenue }
    dispatch(setBulletinDePaie(modif))
  }, [dispatch, retenue, cotisations, salaireBrut])

  const loadCotisationLables = useCallback(() =>
    cotisations.map((cot) => cot.label).map((item) => item),
  )

  useEffect(() => {
    let mount = true

    if (mount && salaireBrut) {
      calculateAndDispatch()
    }

    return () => {
      mount = false
    }
  }, [salaireBrut])

  const hsni130Value = selectedEmployeHours.hsni130Value
  const hsni150Value = selectedEmployeHours.hsni150Value

  const soustotal1 = salaireBrut - (cnapsMontant + ostieMontant)

  const baseIrsa = soustotal1 - (hsni130Value + hsni150Value)
  const imposableArrondi = Math.floor(baseIrsa / 100) * 100

  const irsaCalculate = new CalculIrsaAPayer(imposableArrondi)
  const irsaApayer = irsaCalculate.irsaValue

  const salaireNet = imposableArrondi - irsaApayer

  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }
    return true
  }

  React.useEffect(() => {
    let mount = true
    if (irsaApayer) {
      if (mount) {
        dispatch(setIrsaValue(irsaApayer))
      }
    }
    if (salaireNet && mount) {
      dispatch(setBulletinDePaie(salaireNet))
    }
    return () => {
      mount = false
    }
  }, [irsaApayer, salaireNet, dispatch])

  const data = [
    {
      title: 'Salaire brut :',
      value: <span className="font-medium">{formatAriaryMga(salaireBrut)}</span>,
    },
    {
      title: 'CNAPS :',
      value: `${formatAriaryMga(cnapsMontant)}`,
    },
    {
      title: 'OSTIE :',
      value: `${formatAriaryMga(ostieMontant)}`,
    },
    {
      title: '',
      value: `${formatAriaryMga(soustotal1)}`,
    },
    {
      title: 'HSNI 130',
      value: `${formatAriaryMga(hsni130Value)}`,
    },
    {
      title: 'HSNI 150',
      value: `${formatAriaryMga(hsni150Value)}`,
    },
    {
      title: 'Base IRSA',
      value: `${formatAriaryMga(baseIrsa)}`,
    },
    {
      title: 'Imposable arrondi',
      value: `${formatAriaryMga(imposableArrondi)}`,
    },
    {
      title: 'IRSA à payer',
      value: <span className="font-medium">{formatAriaryMga(irsaApayer)}</span>,
    },
    {
      title: 'Salaire net',
      value: <span className="font-medium text-customRed-900">{formatAriaryMga(salaireNet)}</span>,
    },
  ]

  const Body = () => {
    return (
      <>
        <table className="table-auto">
          <tbody>
            {data.map((item, index) => (
              <tr
                className="flex flex-wrap justify-between border-b border-customRed-100"
                key={index}
              >
                <td className="text-left py-3 px-4 font-medium">{item.title}</td>
                <td className="py-3 pl-8 px-4 text-right">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <div>
        <CustomSection title={title} body={<Body />} />
      </div>
    </>
  )
}

export default SalaireNet
