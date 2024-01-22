import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import ButtonLink from '@src/components/buttons/ButtonLink'
import ReusableTable from '@src/components/ReusableTable/ReusableTable'
import { resetBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import Loading from '@src/components/loadings/Loading'
import { CAlert } from '@coreui/react'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import { useQuery } from '@tanstack/react-query'
import employeService from '@src/services/EmployeeService'
import { AxiosError } from 'axios'
import { setListEmployees } from '@src/redux/employees/employeesReducer'

const GestionPaie: React.FC = () => {
  const errorMessageFormatter = useErrorFormatter()

  const dispatch = useAppDispatch()

  const {
    data,
    isLoading,
    isError,
    error: errorLoadingListEmployee,
  } = useQuery({
    queryKey: ['employes'],
    queryFn: async () => {
      try {
        const list = await employeService.getAll()
        if (list) {
          dispatch(
            setListEmployees({
              list: Object.values(list),
              loading: 'success',
              error: null,
            }),
          )
        }
        return list
      } catch (error) {
        dispatch(
          setListEmployees({
            list: [],
            loading: 'failed',
            error: error as AxiosError,
          }),
        )
        throw error
      }
    },
  })

  const actifEmployes = useMemo(() => {
    let result: IEmploye[] = []

    if (data) {
      result = Object.values(data).filter(
        (employe: IEmploye) => employe.actif === EnumBoolean.OUI,
      ) as IEmploye[]
    }

    return result
  }, [data])

  useEffect(() => {
    dispatch(resetBulletinDePaie())
  }, [dispatch])
  //   formatage des colonnes
  const columnHelper = createColumnHelper<IEmploye>()

  const cols = useMemo<ColumnDef<IEmploye>[]>(
    () => [
      columnHelper.accessor('matricule', {
        cell: (info) => info.getValue(),
        header: () => <div className="my-1">Matricule</div>,
      }),
      columnHelper.accessor('nom', {
        cell: (info) => info.getValue(),
        header: () => 'Nom',
      }),
      columnHelper.accessor('prenom', {
        cell: (info) => info.getValue(),
        header: () => 'Prenom',
      }),
      columnHelper.accessor('id', {
        cell: (info) => (
          <div className="flex justify-center">
            <ButtonLink to={`historique/${info.getValue()}`}>Historique paie</ButtonLink>
          </div>
        ),
        header: () => <div className="text-center">Action</div>,
      }),
    ],
    [columnHelper],
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      {isError && (
        <CAlert color="danger">
          {errorMessageFormatter(errorLoadingListEmployee as AxiosError)}
        </CAlert>
      )}
      {data && (
        <div>
          <ReusableTable data={actifEmployes} columns={cols} searchBar pagination />
        </div>
      )}
    </div>
  )
}

export default GestionPaie
