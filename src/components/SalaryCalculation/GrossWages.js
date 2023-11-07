import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector } from 'react-redux'

const GrossWages = () => {
  const employeeTotalHours = useSelector((state) => state.employeHours)
  const title = 'Salaire brute'

  return (
    <>
      <div>
        <CustomSection title={title} />
      </div>
    </>
  )
}

export default GrossWages
