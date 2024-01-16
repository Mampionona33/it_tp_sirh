import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import FormEmploye from '@src/components/FormEmploye/FormEmploye'
import Page404 from '@src/views/pages/page404/Page404'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import Loading from '@src/components/loadings/Loading'

const Fiche: React.FC = () => {
  const { id } = useParams()
  const { list: listEmploye, loading: loadingList } = useAppSelector((store) => store.employeesList)
  const formEmploye = useAppSelector((store) => store.formEmploye)
  const dispatch = useAppDispatch()

  const isValidID = useCallback((): boolean => {
    if (id && listEmploye.length > 0) {
      return listEmploye.some((item) => String(item.id) === String(id))
    }
    return false
  }, [id, listEmploye])

  const selectedEmploye = listEmploye.filter((employe) => employe.id === parseInt(id, 10))[0]

  useEffect(() => {
    const setFormEmployeID = (employeeId: string | number): void => {
      if (isValidID() && !formEmploye.id) {
        const parsedEmployeeId = Number(employeeId)
        dispatch(setFormEmploye({ ...selectedEmploye, id: parsedEmployeeId }))
      }
    }
    if (id) {
      setFormEmployeID(id)
    }
  }, [id, formEmploye, isValidID, dispatch, selectedEmploye])

  if (loadingList === 'loading') {
    return <Loading />
  }

  const renderContent = (): JSX.Element => {
    return isValidID() ? <FormEmploye id={id} /> : <Page404 />
  }

  return <>{renderContent()}</>
}

export default Fiche
