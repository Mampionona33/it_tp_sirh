import CustomSection from '@src/components/CustomSection'
import React from 'react'

const CardAvantages = () => {
  const Body = () => {
    return (
      <div className="w-full text-sm">
        <div>Avantages</div>
      </div>
    )
  }
  return <CustomSection title="Avantages" body={<Body />} />
}

export default CardAvantages
