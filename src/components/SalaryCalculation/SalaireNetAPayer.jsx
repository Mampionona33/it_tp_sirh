import React from 'react'
import { useSelector } from 'react-redux'
import CustomSection from 'src/components/CustomSection'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import { cotisastions } from 'src/db/db'

const SalaireNetAPayer = () => {
  const title = 'Salaire net à payer'
  const salaireBrut = useSelector((state) => state.selectedEmploye.salaireBrut)
  const irsaValue = useSelector((state) => state.selectedEmploye.irsaValue)
  const primeEtAvantage = useSelector((state) => state.selectedEmploye.primeEtAvantage)
  const cnaps = cotisastions.find((item) => item.id === 1)?.value || 0
  const ostie = cotisastions.find((item) => item.id === 2)?.value || 0

  const salaireNetAPayer = salaireBrut + irsaValue + cnaps + ostie + (primeEtAvantage || 0)

  const data = [
    {
      title: 'Salaire brut :',
      value: `${formatAriaryMga(salaireBrut)}`,
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
      title: 'IRSA :',
      value: `${formatAriaryMga(irsaValue)}`,
    },
    {
      title: 'Salaire net à payer :',
      value: (
        <span className="font-medium text-customRed-900">{formatAriaryMga(salaireNetAPayer)}</span>
      ),
    },
  ]

  const Body = () => (
    <table className="table-auto">
      <tbody>
        {data.map((item, index) => (
          <tr className="border-b border-customRed-100" key={index}>
            <td className="text-left py-3 pl-4 font-medium">{item.title}</td>
            <td className="py-3 pl-8 pr-4 text-right">{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div>
      <CustomSection title={title} body={<Body />} />
    </div>
  )
}

export default SalaireNetAPayer
