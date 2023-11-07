import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector } from 'react-redux'
import CardInfo from 'src/components/CardInfo'

const GrossWages = () => {
  const employeeTotalHours = useSelector((state) => state.employeHours)
  const title = 'Salaire brute'
  const body = 'body'

  const Body = () => {
    return (
      <>
        <CardInfo title={'info 1'} body={'body info'} />
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

export default GrossWages
