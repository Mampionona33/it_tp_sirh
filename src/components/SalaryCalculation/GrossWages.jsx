import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector } from 'react-redux'

const GrossWages = () => {
  const employeeTotalHours = useSelector((state) => state.employeHours)
  const title = 'Salaire brute'
  const selecteEmploy = useSelector((state) => state.selectedEmploye.employe)

  console.log(employeeTotalHours)

  const data = [
    {
      title: 'HSNI 130% :',
      hours: `${employeeTotalHours.hsni130}`,
      value: `100000 Ar`,
    },
    {
      title: 'HSNI 150% :',
      hours: `${employeeTotalHours.hsni150}`,
      value: `100000 Ar`,
    },
    {
      title: 'HSI 130% :',
      hours: `${employeeTotalHours.totalHs130 - employeeTotalHours.hsni130}`,
      value: `100000 Ar`,
    },
    {
      title: 'HSI 150% :',
      hours: `${employeeTotalHours.totalHs150 - employeeTotalHours.hsni150}`,
      value: `100000 Ar`,
    },
    {
      title: 'HN 30% :',
      hours: `${employeeTotalHours.totalHs30}`,
      value: `3000000 Ar`,
    },
    {
      title: 'HN 50% :',
      hours: `${employeeTotalHours.totalHs50}`,
      value: `1500 Ar`,
    },
    {
      title: 'Hdim% :',
      hours: `${employeeTotalHours.totalHdim}`,
      value: `10000 Ar`,
    },
  ]

  const Body = () => {
    return (
      <table className="table-auto">
        <tbody>
          <tr className="border-b border-customRed-100">
            <td colSpan="2" className="text-left py-3 pl-4 font-medium">
              Salaire de base
            </td>
            <td className="text-right py-3 pr-4 font-medium">{selecteEmploy.salaireBase} Ar</td>
          </tr>
          {data.map((item, index) => (
            <tr className="border-b border-customRed-100" key={index}>
              <td className="text-left py-3 pl-4 font-medium">{item.title}</td>
              <td className="text-left py-3 pl-8 pr-8">
                {item.hours.toString().padStart(2, '0')} H
              </td>
              <td className="text-right py-3 pr-4">{item.value}</td>
            </tr>
          ))}
          <tr className="border-b border-customRed-100">
            <td colSpan="2" className="text-left py-3 pl-4 font-medium">
              Salaire brute
            </td>
            <td className="text-right py-3 pr-4 font-medium text-customRed-900">10000 Ar</td>
          </tr>
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
