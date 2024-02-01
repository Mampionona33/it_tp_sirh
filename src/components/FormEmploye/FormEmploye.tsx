import React, { useEffect } from 'react'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat/FormResiliationContrat'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { resetFormEmploye, setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import employeService from '@src/services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import {
  createEmployee,
  fetchAllEmployees,
  updateEmployee,
} from '@src/redux/employees/employeesAction'
import Loading from '../loadings/Loading'
import { resetListEmployees } from '@src/redux/employees/employeesReducer'
import { CAlert } from '@coreui/react'
import useFetchSalarie from '@src/hooks/useFetchSalarie'

interface IFormEmploye {
  id?: string | number
}

const FormEmploye: React.FC<IFormEmploye> = ({ id }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [notification, setNotification] = React.useState({
    type: '',
    message: '',
  })

  const formEmploye = useAppSelector((state) => state.formEmploye)

  const { salarie, isError, errors, isLoading } = useFetchSalarie(id)

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
          // navigate('/employees/list')
          setNotification({
            type: 'success',
            message: 'Employe ajoute avec succes',
          })
          dispatch(resetFormEmploye())
        }
      } else {
        // const updateEmploye = await employeService.update(formEmploye.id, requestData)
        const updateEmploye = await dispatch(
          updateEmployee({ id: formEmploye.id, data: requestData }),
        )
        if (updateEmploye.meta.requestStatus === 'fulfilled') {
          // dispatch(resetListEmployees())
          // navigate('/employees/list')
          setNotification({
            type: 'success',
            message: 'Employe modifie avec succes',
          })
        }
      }
      // navigate('/employees/list')
    } catch (error) {
      setNotification({
        type: 'danger',
        message: 'Une erreur est survenue',
      })
      throw error
    }
  }

  const handleReset = (ev: React.FormEvent) => {
    ev.preventDefault()
    dispatch(resetFormEmploye())
  }

  useEffect(() => {
    if (salarie) {
      dispatch(setFormEmploye(salarie))
    }
  }, [salarie, dispatch])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {notification.type && <CAlert color={notification.type}>{notification.message}</CAlert>}
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
            {formEmploye && formEmploye.id && <FormResiliationContrat />}
          </div>
        </>
      </div>
    </>
  )
}

export default FormEmploye
