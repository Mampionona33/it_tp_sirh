import { useAppSelector } from '@src/hooks/useAppDispatch'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import { useParams } from 'react-router-dom'

const useEmployeeExists = (): boolean => {
  const { id } = useParams()
  const listEmploye = useAppSelector((store) => store.employeesList.list)

  const isEmployeeExist = (): boolean => {
    return (
      listEmploye &&
      listEmploye.length > 0 &&
      listEmploye.some((employe: IEmploye) => employe.id === Number(id))
    )
  }

  return isEmployeeExist()
}

export default useEmployeeExists
