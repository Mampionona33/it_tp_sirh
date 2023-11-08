import React from 'react'
import GrossWages from 'src/components/SalaryCalculation/GrossWages'
import SalaireNet from 'src/components/SalaryCalculation/SalaireNet'
import PrimeEtAvantage from './PrimeEtAvantage'

const SalaryCalculation = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-evenly columns-2">
          <GrossWages />
          <SalaireNet />
        </div>
        <div className="flex">
          <PrimeEtAvantage />
        </div>
      </div>
    </>
  )
}

export default SalaryCalculation
