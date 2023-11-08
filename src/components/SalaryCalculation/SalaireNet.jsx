import React from 'react'
import CustomSection from 'src/components/CustomSection'

const SalaireNet = () => {
  const title = 'Salaire net'

  const Body = () => {
    return (
      <>
        <div>Body</div>
      </>
    )
  }

  return (
    <>
      <CustomSection title={title} body={<Body />} />
    </>
  )
}

export default SalaireNet
