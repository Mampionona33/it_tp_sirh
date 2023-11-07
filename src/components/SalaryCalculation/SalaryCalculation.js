import React from 'react'
import { useSelector } from 'react-redux'
import GrossWages from 'src/components/SalaryCalculation/GrossWages'

const SalaryCalculation = () => {
  const employeeTotalHours = useSelector((state) => state.employeHours)

  if (employeeTotalHours) {
    console.log(employeeTotalHours)
  }

  return (
    <>
      <div>
        <GrossWages />
      </div>
    </>
  )
}

export default SalaryCalculation
