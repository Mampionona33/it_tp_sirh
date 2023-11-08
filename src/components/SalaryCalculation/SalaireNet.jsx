import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch, useSelector } from 'react-redux'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import { cotisastions } from 'src/db/db'

const SalaireNet = () => {
  const title = 'Salaire net'
  const salaireBrut = useSelector((state) => state.selectedEmploye.salaireBrut)
  const cnaps = cotisastions.filter((item) => item.id === 1)
  const ostie = cotisastions.filter((item) => item.id === 2)

  console.log(cnaps)

  const data = [
    {
      title: 'Salaire brut :',
      value: `${formatAriaryMga(salaireBrut)}`,
    },
    {
      title: 'CNAPS :',
      value: `${formatAriaryMga(cnaps[0].value)}`,
    },
    {
      title: 'OSTIE :',
      value: `${formatAriaryMga(ostie[0].value)}`,
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
                <td className="text-left py-3 pl-8 pr-8">{item.value}</td>
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
