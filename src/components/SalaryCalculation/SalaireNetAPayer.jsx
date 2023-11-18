import React from 'react'
import { useSelector } from 'react-redux'
import CustomSection from 'src/components/CustomSection'
import formatAriaryMga from 'src/utils/formatAriaryMga'

const SalaireNetAPayer = () => {
  const title = 'Salaire net à payer'
  const salaireNet = useSelector((state) => state.bulletinDePaie.salaireNet)
  const irsaValue = useSelector((state) => state.selectedEmploye.irsaValue)

  const data = [
    {
      title: 'Salaire net',
      value: `${formatAriaryMga(salaireNet)}`,
    },
    {
      title: 'Avance',
      // value: `${formatAriaryMga(cnapsBase)}`,
    },
    {
      title: 'Allocation familiale',
      // value: `${formatAriaryMga(ostieBase)}`,
    },
    {
      title: 'Salaire net à payer :',
      // value: (
      //   // <span className="font-medium text-customRed-900">{formatAriaryMga(salaireNetAPayer)}</span>
      // ),
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
