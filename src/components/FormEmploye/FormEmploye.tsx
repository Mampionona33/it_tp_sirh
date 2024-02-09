import React, { useCallback, useEffect } from 'react'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat/FormResiliationContrat'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { resetFormEmploye, setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { useNavigate } from 'react-router-dom'
import Loading from '../loadings/Loading'
import { CAlert } from '@coreui/react'
import useFetchSalarie from '@src/hooks/useFetchSalarie'
import useMutateSalarie from '@src/hooks/useMutateSalarie'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import formEmployeSchema from '@src/schema/formEmployeSchema'
import { IEmploye } from '@src/interfaces/interfaceEmploye'

interface IFormEmploye {
  id?: string | number
}

const FormEmploye: React.FC<IFormEmploye> = ({ id }) => {
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
    data: salarie,
    isError: errorFetchSalarie,
    error: errorsFetchSalarie,
    isLoading: isLoadingSalarie,
  } = useFetchSalarie(id)

  const isEmployeExist = useCallback((): boolean => {
    return formEmploye.id !== null
  }, [formEmploye.id])

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
  } = useForm<IEmploye>({ resolver: zodResolver(formEmployeSchema) })

  const submitForm = async (): Promise<void> => {
    console.log('formEmploye', formEmploye)
    const requestData = {
      ...formEmploye,
      salaire_de_base: parseFloat(String(formEmploye.salaire_de_base)),
    }

    await mutateSalarie({ id, data: requestData })
  }

  const handleMutationSuccess = useCallback(() => {
    if (isSuccessMutateSalarie) {
      if (isEmployeExist()) {
        setNotification({
          type: 'success',
          message: 'Employe modifie avec succes',
        })
      } else {
        dispatch(resetFormEmploye())
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
    console.log(formEmploye)
  }, [formEmploye])

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

  if (isIdleMutateSalarie) {
    if (isErrorMutateSalarie) {
      return <CAlert color="danger">Erreur lors de la creation/modification</CAlert>
    }
  }

  return (
    <>
      <div>
        <>
          <div className="bg-white flex flex-col">
            <form
              action=""
              onSubmit={handleSubmit(async () => {
                await submitForm()
              })}
            >
              <InfoPersoEmploye register={register} formErrors={formErrors && formErrors} />
              <InfoPersoEnfantEmploye />
              <InfoPro register={register} formErrors={formErrors && formErrors} />
              <InformationPaie register={register} formErrors={formErrors && formErrors} />
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
