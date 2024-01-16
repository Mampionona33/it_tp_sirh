import React from 'react'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat/FormResiliationContrat'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import employeService from '@src/services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import {
  createEmployee,
  fetchAllEmployees,
  updateEmployee,
} from '@src/redux/employees/employeesAction'
import Loading from '../loadings/Loading'
import { resetListEmployees } from '@src/redux/employees/employeesReducer'

interface IFormEmploye {
  id?: string | number
}

const FormEmploye: React.FC<IFormEmploye> = ({ id }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const formEmploye = useAppSelector((state) => state.formEmploye)
  const { loading } = useAppSelector((state) => state.employeesList)

  const isEmployeExist = (): boolean => {
    return formEmploye.id !== null
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    try {
      const requestData = {
        ...formEmploye,
        salaire_de_base: parseFloat(String(formEmploye.salaire_de_base)),
      }
      if (!isEmployeExist()) {
        const createEmploye = await dispatch(createEmployee(requestData))
        if (createEmploye.meta.requestStatus === 'fulfilled') {
          navigate('/employees/list')
        }
      } else {
        // const updateEmploye = await employeService.update(formEmploye.id, requestData)
        const updateEmploye = await dispatch(
          updateEmployee({ id: formEmploye.id, data: requestData }),
        )
        if (updateEmploye.meta.requestStatus === 'fulfilled') {
          dispatch(resetListEmployees())
          navigate('/employees/list')
        }
      }
      // navigate('/employees/list')
    } catch (error) {
      throw error
    }
  }

  const handleReset = (ev: React.FormEvent) => {
    ev.preventDefault()
    dispatch(resetFormEmploye())
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
