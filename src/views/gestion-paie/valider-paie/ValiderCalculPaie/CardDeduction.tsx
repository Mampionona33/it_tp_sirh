import CustomSection from '@src/components/CustomSection'
import React from 'react'

const CardDeduction = () => {
  const Body = () => {
    return (
      <div className="w-full text-sm">
        <div>Déductions</div>
      </div>
    )
  }
  return <CustomSection title="Déductions" body={<Body />} />
}

export default CardDeduction
