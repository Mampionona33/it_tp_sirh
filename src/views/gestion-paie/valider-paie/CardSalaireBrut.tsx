import CustomSection from '@src/components/CustomSection'
import React from 'react'

const CardSalaireBrut = () => {
  const Body = () => {
    return (
      <div className="w-full">
        <p>Body</p>
        <p>Body</p>
        <p>Body</p>
        <p>Body</p>
        <p>Body</p>
      </div>
    )
  }

  return <CustomSection title="Salaire Brut" body={<Body />} />
}

export default CardSalaireBrut
