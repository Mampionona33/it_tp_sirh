import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const FormEmploye = () => {
  const { id } = useParams()
  const listSalarie = useSelector((state: any) => state.employeesList.list)

  console.log(id)
  console.log(listSalarie)

  return (
    <>
      <div>Form employe</div>
    </>
  )
}

export default FormEmploye
