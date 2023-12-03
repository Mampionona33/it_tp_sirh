import React from 'react'
import CustomSection from '../../components/CustomSection'
import { Form } from 'react-router-dom'

const DeclarationCnaps = () => {
  const Body = () => {
    return (
      <>
        <div className="flex">Declaration cnaps</div>
      </>
    )
  }
  return (
    <>
      <CustomSection body={<Body />} title="déclaration nominative de salaires" />
    </>
  )
}

export default DeclarationCnaps
