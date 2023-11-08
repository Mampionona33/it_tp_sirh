import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch, useSelector } from 'react-redux'

const SalaireNet = () => {
  const title = 'Salaire net'
  const salaireBrut = useSelector((state) => state.selectedEmploye.salaireBrut)

  console.log(salaireBrut)

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

export default SalaireNet
