import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import FormEmploye from '@src/components/FormEmploye/FormEmploye'
import Page404 from '@src/views/pages/page404/Page404'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import Loading from '@src/components/loadings/Loading'
import useFetchListEmploye from '@src/hooks/useFetchListEmploye'
import { CAlert } from '@coreui/react'
import useErrorFormatter from '@src/hooks/useErrorFormatter'

const Fiche: React.FC = () => {
  const { id } = useParams()
  // const { list: listEmploye, loading: loadingList } = useAppSelector((store) => store.employeesList)
  const { data: listEmploye, error, isError, isLoading, refetch } = useFetchListEmploye()
  const formEmploye = useAppSelector((store) => store.formEmploye)
  const dispatch = useAppDispatch()

  const isListEmployeExist = useCallback((): boolean => {
    let isExist = false
    if (listEmploye) {
      isExist = true
    }
    return isExist
  }, [listEmploye])

  const selectedEmploye =
    isListEmployeExist() &&
    listEmploye!.filter((employe) => employe.id === parseInt(String(id), 10))[0]

  const formatErrorMessage = useErrorFormatter()

  useEffect(() => {
    const setFormEmployeID = (employeeId: string | number): void => {
      if (id && !formEmploye.id) {
        const parsedEmployeeId = Number(employeeId)
        dispatch(setFormEmploye({ ...selectedEmploye, id: parsedEmployeeId }))
      }
    }
    if (id) {
      setFormEmployeID(id)
    }
  }, [id, formEmploye, dispatch, selectedEmploye])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <CAlert color="danger">{formatErrorMessage(error)}</CAlert>
  }

  console.log(id)

  const renderContent = (): JSX.Element => {
    return id ? <FormEmploye id={id} /> : <Page404 />
  }

  return <>{renderContent()}</>
}

export default Fiche
