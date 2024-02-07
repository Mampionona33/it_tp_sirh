import React, { useEffect, useMemo } from 'react'
import { resetBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import { resetParametreCalendrier } from 'src/redux/parametreCalendrier/parametreCalendrierReducer'
import { fetchAllMouvementSalaire } from 'src/redux/mouvementSalaire/mouvementSalaireAction'
import ButtonLink from '@src/components/buttons/ButtonLink'
import ReusableTable from '@src/components/ReusableTable/ReusableTable'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { resetFormEmploye, setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { fetchAllEmployees } from '@src/redux/employees/employeesAction'
import { useNavigate } from 'react-router-dom'
import Loading from '@src/components/loadings/Loading'
import { CAlert } from '@coreui/react'
import useFetchListEmploye from '@src/hooks/useFetchListEmploye'

interface IDataWithActions extends IEmploye {
  actions?: React.FC[]
}

const HeaderComponents: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleClickButtonAdd = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault()
    dispatch(resetFormEmploye())
    navigate('/employees/ajout')
  }

  return (
    <>
      <ButtonLink
        icon={<PlusIcon width={20} height={20} fontWeight={'bold'} />}
        to="/employees/ajout"
        onClick={handleClickButtonAdd}
      >
        Ajouter
      </ButtonLink>
    </>
  )
}

const List = () => {
  const dispatch = useAppDispatch()
  // const {
  //   list: data,
  //   loading: loadingList,
  //   error: errorLoadingList,
  // } = useAppSelector((store) => store.employeesList)

  const { data, error, isError, isLoading, refetch } = useFetchListEmploye()

  const formattedData: IDataWithActions[] = useMemo(() => {
    return data && data.length > 0
      ? data
          .filter((item: any) => item.actif === 'oui')
          .map((item: any) => ({
            ...item,
            fullName: `${item.nom} ${item.prenom}`,
          }))
      : []
  }, [data])

  useEffect(() => {
    let mount = true
    const fetchData = async () => {
      if (mount && dispatch) {
        dispatch(resetBulletinDePaie())
        dispatch(resetParametreCalendrier())
        dispatch(fetchAllMouvementSalaire())
        dispatch(resetFormEmploye())
        // try {
        //   const res = await dispatch(fetchAllEmployees())
        //   if (res.meta.requestStatus === 'fulfilled') {
        //     // console.log(res)
        //   }
        // } catch (error) {
        //   throw error
        // }
      }
    }

    fetchData()

    return () => {
      mount = false
    }
  }, [dispatch])

  const columnHelper = createColumnHelper<IDataWithActions>()

  const cols = useMemo<ColumnDef<IDataWithActions>[]>(
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
      columnHelper.accessor('actions', {
        cell: (info) => (
          <div className="flex justify-center">
            <ButtonLink to={`/employees/fiche/${info.row.original.id}`}>Détails</ButtonLink>
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

  if (isError) {
    return <CAlert color="danger">{error.message}</CAlert>
  }

  return (
    <>
      {/* <TableEmployee /> */}
      {/* {errorLoadingList && <CAlert color="danger">{errorLoadingList.message}</CAlert>} */}
      <ReusableTable
        data={formattedData}
        columns={cols}
        title="Liste des employés"
        searchBar
        pagination
        headerComponents={<HeaderComponents />}
      />
    </>
  )
}

export default List
