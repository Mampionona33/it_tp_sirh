import React from 'react'
import GrossWages from 'src/components/SalaryCalculation/GrossWages'
import SalaireNet from 'src/components/SalaryCalculation/SalaireNet'
import SalaireNetAPayer from 'src/components/SalaryCalculation/SalaireNetAPayer'
import PrimeEtAvantage from './PrimeEtAvantage'

const SalaryCalculation = () => {
  return (
    <>
      <div className="d-flex flex-column gap-4">
        <div className="d-flex justify-content-between columns-3">
          <PrimeEtAvantage />
        </div>
        <div className="d-flex justify-content-between flex-wrap columns-3 gap-4">
          <GrossWages />
          <SalaireNet />
          <SalaireNetAPayer />
        </div>
      </div>
    </>
  )
}

export default SalaryCalculation
