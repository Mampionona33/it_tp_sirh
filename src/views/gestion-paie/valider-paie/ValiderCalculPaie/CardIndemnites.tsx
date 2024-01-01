import CustomSection from '@src/components/CustomSection'
import React from 'react'

const CardIndemnites = () => {
  const Body = () => {
    return (
      <div className="w-full text-sm">
        <div>Indemnités</div>
      </div>
    )
  }
  return <CustomSection title="Avantages" body={<Body />} />
}

export default CardIndemnites
