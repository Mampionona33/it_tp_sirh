import React from 'react'
import { Link } from 'react-router-dom'
import SalaireBrut from 'src/components/SalaryCalculation/SalaireBrut'
import SalaireNet from 'src/components/SalaryCalculation/SalaireNet'
import SalaireNetAPayer from 'src/components/SalaryCalculation/SalaireNetAPayer'
import PrimeEtAvantage from './PrimeEtAvantage'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'

const SalaryCalculation = () => {
  const selecteEmploy = useSelector((state) => state.selectedEmploye.employe)
  const id = selecteEmploy.id
  // console.log(id)
  return (
    <>
      <div className="d-flex flex-column gap-4">
        <div className="d-flex justify-content-between columns-3">
          <PrimeEtAvantage />
        </div>
        <div className="d-flex justify-content-between flex-wrap columns-3 gap-4">
          <SalaireBrut />
          <SalaireNet />
          <SalaireNetAPayer />
        </div>
        <div className="flex justify-end fixed top-[25%] p-1 right-0">
          <Link to={`/bulletin-de-paie/${id}`} className="btn btn-primary">
            <span className="flex items-center group">
              <DocumentTextIcon className="w-6 h-6" />
              <span className="ml-2 hidden group-hover:flex">Voir bulletin</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default SalaryCalculation
