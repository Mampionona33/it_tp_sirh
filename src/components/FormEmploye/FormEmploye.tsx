import React from 'react'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import employeService from '@src/services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const FormEmploye = () => {
  const navigate = useNavigate()
  const dispacth = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    try {
      const requestData = {
        ...formEmploye,
        salaire_de_base: parseFloat(String(formEmploye.salaire_de_base)),
      }
      console.log(requestData)
      // const createEmploye = await employeService.create(requestData)
      // if (createEmploye.status === 201) {
      //   dispacth(resetFormEmploye())
      //   navigate('/employees/list')
      // }
    } catch (error) {
      throw error
    }
  }

  const handleReset = (ev: React.FormEvent) => {
    ev.preventDefault()
    dispacth(resetFormEmploye())
  }

  return (
    <>
      <div>
        <>
          <div className="bg-white flex flex-col">
            <form action="" onSubmit={handleSubmit} onReset={handleReset}>
              <InfoPersoEmploye />
              <InfoPersoEnfantEmploye />
              <InfoPro />
              <InformationPaie />
              {/* <PrimeEtAvantageParMois /> */}
              <FormEmployeGroupButton />
            </form>
            {formEmploye.id && <FormResiliationContrat />}
          </div>
        </>
      </div>
    </>
  )
}

export default FormEmploye
