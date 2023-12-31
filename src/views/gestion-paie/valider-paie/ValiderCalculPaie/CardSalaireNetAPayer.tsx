import CustomSection from '@src/components/CustomSection'
import React from 'react'

const CardSalaireNetAPayer = () => {
  const Body = () => {
    return (
      <div>
        <p>Body</p>
      </div>
    )
  }

  return <CustomSection title="Salaire net à payer" body={<Body />} />
}

export default CardSalaireNetAPayer
