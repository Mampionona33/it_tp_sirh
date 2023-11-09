import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector } from 'react-redux'
import formatAriaryMga from 'src/utils/formatAriaryMga'

const SalaireNetAPayer = () => {
  const title = 'Salaire net à payer'
  const salaireBrut = useSelector((state) => state.selectedEmploye.salaireBrut)

  const data = [
    {
      title: 'Salaire brut :',
      value: <span className="font-medium">{formatAriaryMga(salaireBrut)}</span>,
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
                <td className="py-3 pl-8 pr-4 text-right">{item.value}</td>
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

export default SalaireNetAPayer
