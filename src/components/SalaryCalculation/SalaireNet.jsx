import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch, useSelector } from 'react-redux'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import { cotisastions } from 'src/db/db'
import IrsaAPayer from 'src/utils/calculIrsaAPayer'

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

  const irsaCalculate = new IrsaAPayer(imposableArrondi)
  const irsaApayer = irsaCalculate.irsaValue

  const salaireNet = imposableArrondi - irsaApayer

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
      title: 'IRSA à payer',
      value: `${formatAriaryMga(irsaApayer)}`,
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
