import Page404 from '@src/views/pages/page404/Page404'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import MainHeader from './MainHeader'
import InfoPersoEmploye from './InfoPersoEmploye'

const FormEmploye = () => {
  const { id } = useParams()
  const listSalarie = useSelector((state: any) => state.employeesList.list)

  const isSalarieExist = () => {
    return listSalarie.some((salarie) => salarie.id.toString() === id)
  }

  console.log(id)
  console.log(listSalarie)

  return (
    <>
      <div>
        {isSalarieExist() ? (
          <>
            <div className="bg-white flex flex-col py-11">
              <MainHeader />
              <InfoPersoEmploye />
            </div>
          </>
        ) : (
          <Page404 />
        )}
      </div>
    </>
  )
}

export default FormEmploye
