import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch, useSelector } from 'react-redux'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import { cotisastions } from 'src/db/db'

const SalaireNet = () => {
  const title = 'Salaire net'
  const salaireBrut = useSelector((state) => state.selectedEmploye.salaireBrut)
  const selectedEmployeHours = useSelector((state) => state.selectedEmploye)
  const cnaps = cotisastions.filter((item) => item.id === 1)
  const ostie = cotisastions.filter((item) => item.id === 2)
  const hsni130Value = selectedEmployeHours.hsni130Value
  const hsni150Value = selectedEmployeHours.hsni150Value

  const soustotal1 = salaireBrut - (cnaps[0].value + ostie[0].value)

  const baseIrsa = soustotal1 - (hsni130Value + hsni150Value)
  const imposableArrondi = Math.floor(baseIrsa / 100) * 100

  const irsaParTranche = soustotal1 - imposableArrondi

  const isTranche0 = (imposableArrondi) => {
    return imposableArrondi <= 350000
  }

  const isTranche1 = (imposableArrondi) => {
    return imposableArrondi >= 350001 && imposableArrondi <= 400000
  }

  const isTranche2 = (imposableArrondi) => {
    return imposableArrondi >= 400001 && imposableArrondi <= 500000
  }

  const isTranche3 = (imposableArrondi) => {
    return imposableArrondi >= 500001 && imposableArrondi <= 600000
  }

  const calculIrsaTranche = (irsaArrondi) => {
    let irsa = 0

    if (isTranche0(irsaArrondi)) {
      irsa = 0
    } else if (isTranche1(irsaArrondi)) {
      irsa = (irsaArrondi - 350000) * 0.05
    } else if (isTranche2(irsaArrondi)) {
      irsa = 50000 * 0.05 + (irsaArrondi - 400000) * 0.1
    } else if (isTranche3(irsaArrondi)) {
      irsa = 50000 * 0.05 + 100000 * 0.1 + (irsaArrondi - 500000) * 0.15
    } else {
      irsa = 50000 * 0.05 + 100000 * 0.1 + 100000 * 0.15 + (irsaArrondi - 600000) * 0.2
    }

    return irsa >= 2000 ? irsa : 2000
  }

  const irsaAPayer = calculIrsaTranche(imposableArrondi)

  const data = [
    {
      title: 'Salaire brut :',
      value: <span className="font-medium">{formatAriaryMga(salaireBrut)}</span>,
    },
    {
      title: 'CNAPS :',
      value: `${formatAriaryMga(cnaps[0].value)}`,
    },
    {
      title: 'OSTIE :',
      value: `${formatAriaryMga(ostie[0].value)}`,
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
      title: 'IRSA par tranche',
      value: `${formatAriaryMga(irsaParTranche)}`,
    },
  ]

  const Body = () => {
    return (
      <>
        <table className="table-auto">
          <tbody>
            {data.map((item, index) => (
              <tr className="border-b border-customRed-100" key={index}>
                <td className="text-left py-3 pl-4 font-medium">{item.title}</td>
                <td className="text-left py-3 pl-8 pr-8 text-right">{item.value}</td>
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
