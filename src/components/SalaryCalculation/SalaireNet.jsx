import React, { useEffect } from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch, useSelector } from 'react-redux'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import { cotisastions } from 'src/db/db'
import CalculIrsaAPayer from 'src/utils/CalculIrsaAPayer'
import { setIrsaValue } from 'src/redux/selectedEmploye/selectedEmployeReducer'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'

const SalaireNet = () => {
  const dispatch = useDispatch()
  const title = 'Salaire net'
  const retenue = useSelector((state) => state.bulletinDePaie.retenue)
  const salaireBrut = useSelector((state) => state.selectedEmploye.salaireBrut)
  const selectedEmployeHours = useSelector((state) => state.selectedEmploye)
  const cnaps = salaireBrut / 100
  const ostie = salaireBrut / 100
  const hsni130Value = selectedEmployeHours.hsni130Value
  const hsni150Value = selectedEmployeHours.hsni150Value

  const soustotal1 = salaireBrut - (cnaps + ostie)

  const baseIrsa = soustotal1 - (hsni130Value + hsni150Value)
  const imposableArrondi = Math.floor(baseIrsa / 100) * 100

  const irsaCalculate = new CalculIrsaAPayer(imposableArrondi)
  const irsaApayer = irsaCalculate.irsaValue

  const salaireNet = imposableArrondi - irsaApayer

  // useEffect(() => {
  //   let isMounted = true

  //   if (isMounted && salaireBrut && retenue) {
  //     const updatedRetenue = retenue.map((item) =>
  //       (item.label === 'cnaps' || item.label === 'ostie') && item.base !== salaireBrut / 100
  //         ? { ...item, base: salaireBrut * item.base }
  //         : item,
  //     )

  //     // Vérifiez si retenue a changé avant de déclencher l'action
  //     if (!arraysAreEqual(retenue, updatedRetenue)) {
  //       dispatch(setBulletinDePaie({ retenue: updatedRetenue }))
  //     }
  //   }

  //   return () => {
  //     isMounted = false
  //   }
  // }, [dispatch, retenue, salaireBrut])

  // Add a function to check if arrays are equal

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
      value: `${formatAriaryMga(cnaps)}`,
    },
    {
      title: 'OSTIE :',
      value: `${formatAriaryMga(ostie)}`,
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
