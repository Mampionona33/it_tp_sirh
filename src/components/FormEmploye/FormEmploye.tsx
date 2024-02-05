import React, { useCallback, useEffect } from 'react'
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
import useMutateSalarie from '@src/hooks/useMutateSalarie'

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

  const {
    mutateAsync: mutateSalarie,
    isError: isErrorMutateSalarie,
    error: errorMutateSalarie,
    isSuccess: isSuccessMutateSalarie,
    isIdle: isIdleMutateSalarie,
    isPaused: isPausedMutateSalarie,
  } = useMutateSalarie()

  const {
    salarie,
    isError: errorFetchSalarie,
    errors: errorsFetchSalarie,
    isLoading: isLoadingSalarie,
  } = useFetchSalarie(id)

  const isEmployeExist = useCallback((): boolean => {
    return formEmploye.id !== null
  }, [formEmploye.id])

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    const requestData = {
      ...formEmploye,
      salaire_de_base: parseFloat(String(formEmploye.salaire_de_base)),
    }

    mutateSalarie({ id, data: requestData })
  }

  const handleMutationSuccess = useCallback(() => {
    if (isSuccessMutateSalarie) {
      if (isEmployeExist()) {
        setNotification({
          type: 'success',
          message: 'Employe modifie avec succes',
        })
      } else {
        dispatch(resetListEmployees())
        setNotification({
          type: 'success',
          message: 'Employe ajoute avec succes',
        })
      }
    }
  }, [dispatch, isEmployeExist, isSuccessMutateSalarie])

  const handleMutationError = useCallback(() => {
    if (isErrorMutateSalarie) {
      if (isEmployeExist()) {
        setNotification({
          type: 'danger',
          message: 'Une erreur est survenue lors de la modification',
        })
      } else {
        setNotification({
          type: 'danger',
          message: 'Une erreur est survenue lors de la creation',
        })
      }
    }
  }, [isErrorMutateSalarie, setNotification, isEmployeExist])

  useEffect(() => {
    if (isSuccessMutateSalarie || isErrorMutateSalarie) {
      handleMutationSuccess()
      handleMutationError()
    }
  }, [isSuccessMutateSalarie, isErrorMutateSalarie, handleMutationSuccess, handleMutationError])

  useEffect(() => {
    if (salarie) {
      dispatch(setFormEmploye(salarie))
    }
  }, [salarie, dispatch])

  if (isLoadingSalarie) {
    return <Loading />
  }

  if (errorFetchSalarie) {
    return <CAlert color="danger">Erreur lors de la recuperation du donnée salarie</CAlert>
  }

  return (
    <>
      <div>
        <>
          <div className="bg-white flex flex-col">
            <form action="" onSubmit={handleSubmit}>
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
      {notification.type && <CAlert color={notification.type}>{notification.message}</CAlert>}
    </>
  )
}

export default FormEmploye
