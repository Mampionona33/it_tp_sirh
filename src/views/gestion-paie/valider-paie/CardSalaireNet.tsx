import CustomSection from '@src/components/CustomSection'
import React from 'react'

const CardSalaireNet = () => {
  const Body = () => {
    return (
      <div>
        <p>Body</p>
        <p>Body</p>
        <p>Body</p>
      </div>
    )
  }

  return <CustomSection title="Salaire Net" body={<Body />} />
}

export default CardSalaireNet
