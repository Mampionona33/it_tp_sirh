import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector } from 'react-redux'
import CardInfo from 'src/components/CardInfo'

const GrossWages = () => {
  const employeeTotalHours = useSelector((state) => state.employeHours)
  const title = 'Salaire brute'

  const data = [
    {
      title: 'HSNI 130%:',
      hours: `${employeeTotalHours.hsni130} Heures`,
      value: `100000 Ar`,
    },
    {
      title: 'HSNI 150%:',
      hours: `${employeeTotalHours.hsni150} Heures`,
      value: `100000 Ar`,
    },
    {
      title: 'HSI 130%:',
      hours: `${employeeTotalHours.totalHs130 - employeeTotalHours.hsni130} Heures`,
      value: `100000 Ar`,
    },
    {
      title: 'HSI 150%:',
      hours: `${employeeTotalHours.totalHs150 - employeeTotalHours.hsni150} Heures`,
      value: `100000 Ar`,
    },
    {
      title: 'HN 30%:',
      hours: `${employeeTotalHours.totalHs30} Heures`,
      value: `3000000 Ar`,
    },
    {
      title: 'HN 50%:',
      hours: `${employeeTotalHours.totalHs50} Heures`,
      value: `1500 Ar`,
    },
    {
      title: 'Hdim%:',
      hours: `${employeeTotalHours.totalHdim} Heures`,
      value: `10000 Ar`,
    },
  ]

  const Body = () => {
    return (
      <table className="table-auto">
        <tbody>
          <tr>
            <td colSpan="2" className="text-left pl-8">
              Salaire de base
            </td>
            <td className="text-right pr-8">10000 Ar</td>
          </tr>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="text-left pl-8">{item.title}</td>
              <td className="text-left pl-8 pr-8">{item.hours}</td>
              <td className="text-right pr-8">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <CustomSection title={title} body={<Body />} />
    </div>
  )
}

export default GrossWages
