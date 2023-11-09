import React from 'react'
import GrossWages from 'src/components/SalaryCalculation/GrossWages'
import SalaireNet from 'src/components/SalaryCalculation/SalaireNet'
import SalaireNetAPayer from 'src/components/SalaryCalculation/SalaireNetAPayer'
import PrimeEtAvantage from './PrimeEtAvantage'

const SalaryCalculation = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="container mx-auto">
          <PrimeEtAvantage />
        </div>
        <div className="flex flex-wrap justify-evenly columns-3 gap-4">
          <GrossWages />
          <SalaireNet />
          <SalaireNetAPayer />
        </div>
      </div>
    </>
  )
}

export default SalaryCalculation
