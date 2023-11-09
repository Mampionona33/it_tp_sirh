import React from 'react'
import CustomSection from 'src/components/CustomSection'

const SalaireNetAPayer = () => {
  const title = 'Salaire net à payer'

  const Body = () => {
    return (
      <>
        <div>Body</div>
      </>
    )
  }

  return (
    <>
      <div>
        <CustomSection title={title} body={<Body />} />
      </div>
    </>
  )
}

export default SalaireNetAPayer
