import React from 'react'
import { Link } from 'react-router-dom'
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
        <div className="inline-flex justify-end fixed top-[25%] p-1 right-0 ">
          <Link to="/bulletin-de-paiement" className="btn btn-primary">
            Voir le bulletin de paie
          </Link>
        </div>
      </div>
    </>
  )
}

export default SalaryCalculation
