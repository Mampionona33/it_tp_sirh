import React, { useRef } from 'react'
import MainHeader from './MainHeader'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat'
import employeService from '@src/services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { IEnfantEmploye } from '@src/interfaces/interfaceEmploye'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

const FormEmploye = () => {
  const navigate = useNavigate()
  const dispacth = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    try {
      console.log(formEmploye)
      // dispacth(resetFormEmploye())
      // const createEmploye = await employeService.create(employeData)
      // if (createEmploye.status === 201) {
      //   navigate('/employees/list')
      // }
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <div>
        <>
          <div className="bg-white flex flex-col py-11">
            <form action="" onSubmit={handleSubmit}>
              <MainHeader />
              <InfoPersoEmploye />
              <InfoPersoEnfantEmploye />
              <InfoPro />
              <InformationPaie />
              {/* <PrimeEtAvantageParMois /> */}
              <FormEmployeGroupButton />
            </form>
            <FormResiliationContrat />
          </div>
        </>
      </div>
    </>
  )
}

export default FormEmploye
