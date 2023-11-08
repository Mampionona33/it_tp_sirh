import React from 'react'
import GrossWages from 'src/components/SalaryCalculation/GrossWages'
import SalaireNet from 'src/components/SalaryCalculation/SalaireNet'
import PropTypes from 'prop-types'

const SalaryCalculation = () => {
  return (
    <>
      <div className="columns-2">
        <GrossWages />
        <SalaireNet />
      </div>
    </>
  )
}

export default SalaryCalculation
