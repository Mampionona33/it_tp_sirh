import Page404 from '@src/views/pages/page404/Page404'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import MainHeader from './MainHeader'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import PrimeEtAvantageParMois from './PrimeEtAvantageParMois'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat'

const FormEmploye = () => {
  const { id } = useParams()
  const listSalarie = useSelector((state: any) => state.employeesList.list)

  const isSalarieExist = () => {
    return listSalarie.some((salarie) => salarie.id.toString() === id)
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    console.log(ev.target)
  }

  return (
    <>
      <div>
        {isSalarieExist() ? (
          <>
            <form action="" onSubmit={handleSubmit}>
              <div className="bg-white flex flex-col py-11">
                <MainHeader />
                <InfoPersoEmploye />
                <InfoPersoEnfantEmploye />
                <InfoPro />
                <InformationPaie />
                <PrimeEtAvantageParMois />
                <FormEmployeGroupButton />
                <FormResiliationContrat />
              </div>
            </form>
          </>
        ) : (
          <Page404 />
        )}
      </div>
    </>
  )
}

export default FormEmploye
