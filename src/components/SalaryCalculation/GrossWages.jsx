import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector, useDispatch } from 'react-redux'

const GrossWages = () => {
  const dispatch = useDispatch()
  const employeeTotalHours = useSelector((state) => state.employeHours)
  const title = 'Salaire brut'
  const selecteEmploy = useSelector((state) => state.selectedEmploye.employe)

  const tauxHoraire = selecteEmploy.salaireBase / 173.33
  const salaireDeBase = selecteEmploy.salaireBase

  const calculHs = (heures, majoration) => {
    let valeur = 0
    valeur = (tauxHoraire * heures * majoration) / 100
    return valeur
  }
  const hsni130Value = calculHs(employeeTotalHours.hsni130, 130)
  const hsni150Value = calculHs(employeeTotalHours.hsni150, 150)
  const hsi130Value = calculHs(employeeTotalHours.totalHs130 - employeeTotalHours.hsni130, 130)
  const hsi150Value = calculHs(employeeTotalHours.totalHs150 - employeeTotalHours.hsni150, 150)
  const hn30Value = calculHs(employeeTotalHours.totalHs30, 30)
  const hn50Value = calculHs(employeeTotalHours.totalHs50, 50)
  const hdimValue = calculHs(employeeTotalHours.totalHdim, 100)

  const salaireBruteVal =
    hsni130Value +
    hsni150Value +
    hsi130Value +
    hsi150Value +
    hn30Value +
    hn50Value +
    hdimValue +
    selecteEmploy.salaireBase

  const formatToMoney = (number) => {
    return new Intl.NumberFormat('fr', {
      style: 'currency',
      currency: 'MGA',
      currencyDisplay: 'narrowSymbol',
    }).format(number)
  }

  const formatedHsni130Value = formatToMoney(hsni130Value)
  const formatedHsni150Value = formatToMoney(hsni150Value)
  const formatedHsi130Value = formatToMoney(hsi130Value)
  const formatedHsi150Value = formatToMoney(hsi150Value)
  const formatedHn30Value = formatToMoney(hn30Value)
  const formatedHn50Value = formatToMoney(hn50Value)
  const formatedHdimValue = formatToMoney(hdimValue)
  const formatedSlaireBruteValue = formatToMoney(salaireBruteVal)
  const formatedSalaireBase = formatToMoney(salaireDeBase)

  const data = [
    {
      title: 'HSNI 130% :',
      hours: `${employeeTotalHours.hsni130}`,
      value: `${formatedHsni130Value}`,
    },
    {
      title: 'HSNI 150% :',
      hours: `${employeeTotalHours.hsni150}`,
      value: `${formatedHsni150Value}`,
    },
    {
      title: 'HSI 130% :',
      hours: `${employeeTotalHours.totalHs130 - employeeTotalHours.hsni130}`,
      value: `${formatedHsi130Value}`,
    },
    {
      title: 'HSI 150% :',
      hours: `${employeeTotalHours.totalHs150 - employeeTotalHours.hsni150}`,
      value: `${formatedHsi150Value}`,
    },
    {
      title: 'HN 30% :',
      hours: `${employeeTotalHours.totalHs30}`,
      value: `${formatedHn30Value}`,
    },
    {
      title: 'HN 50% :',
      hours: `${employeeTotalHours.totalHs50}`,
      value: `${formatedHn50Value}`,
    },
    {
      title: 'Hdim% :',
      hours: `${employeeTotalHours.totalHdim}`,
      value: `${formatedHdimValue}`,
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
            <td className="text-right py-3 pr-4 font-medium">{formatedSalaireBase}</td>
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
            <td className="text-right py-3 pr-4 font-medium text-customRed-900">
              {formatedSlaireBruteValue}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  React.useEffect(() => {
    let mount = true
    if (salaireDeBase) {
    }
    return () => {
      mount = false
    }
  }, [salaireDeBase])

  return (
    <div>
      <CustomSection title={title} body={<Body />} />
    </div>
  )
}

export default GrossWages
