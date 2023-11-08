import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch, useSelector } from 'react-redux'

const SalaireNet = () => {
  const title = 'Salaire net'
  const salaireBrut = useSelector((state) => state.selectedEmploye.salaireBrut)

  console.log(salaireBrut)

  const data = [
    {
      title: 'Salaire brut :',
      value: `${salaireBrut}`,
    },
  ]

  const Body = () => {
    return (
      <>
        <table>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.value}</td>
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
