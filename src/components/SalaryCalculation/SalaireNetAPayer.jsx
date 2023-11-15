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
  const retenue = useSelector((state) => state.bulletinDePaie.retenue)
  const cnaps = retenue.find((ret) => ret.label === 'cnaps')
  const ostie = retenue.find((ret) => ret.label === 'ostie')
  const cnapsBase = cnaps && cnaps.base
  const ostieBase = ostie && ostie.base

  const salaireNetAPayer = salaireBrut + irsaValue + cnapsBase + ostieBase + (primeEtAvantage || 0)

  const data = [
    {
      title: 'Salaire brut :',
      value: `${formatAriaryMga(salaireBrut)}`,
    },
    {
      title: 'CNAPS :',
      value: `${formatAriaryMga(cnapsBase)}`,
    },
    {
      title: 'OSTIE :',
      value: `${formatAriaryMga(ostieBase)}`,
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
          <tr className="flex flex-wrap justify-between border-b border-customRed-100" key={index}>
            <td className="text-left py-3 px-4 font-medium">{item.title}</td>
            <td className="py-3 px-4 text-right">{item.value}</td>
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
