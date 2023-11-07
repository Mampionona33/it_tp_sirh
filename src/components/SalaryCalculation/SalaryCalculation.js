import React from 'react'
import { useSelector } from 'react-redux'

const SalaryCalculation = () => {
  const employeeTotalHours = useSelector((state) => state.employeHours)

  if (employeeTotalHours) {
    console.log(employeeTotalHours)
  }

  return (
    <>
      <div>SalaryCalculation</div>
    </>
  )
}

export default SalaryCalculation
