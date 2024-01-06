import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import TableEmployee from 'src/components/TableEmployee/TableEmployee'
import { fetchAllEmployees } from 'src/redux/employees/employeesAction'
import {
  resetBulletinDePaie,
  setBulletinDePaie,
} from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import { resetParametreCalendrier } from 'src/redux/parametreCalendrier/parametreCalendrierReducer'
import { fetchAllMouvementSalaire } from 'src/redux/mouvementSalaire/mouvementSalaireAction'
import TableListeEmploye from '@components/TableListeEmploye/TableListeEmploye'
import { Link } from 'react-router-dom'
import ButtonLink from '@src/components/buttons/ButtonLink'
import ReusableTable from '@src/components/ReusableTable/ReusableTable'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

interface IDataWithActions extends IEmploye {
  actions?: React.FC[]
}

const List = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((store) => store.employeesList.list)
  const [localData, setLocalData] = useState<IDataWithActions[]>([])

  const formattedData: IDataWithActions[] =
    data && data.length > 0
      ? data
          .filter((item: any) => item.actif === 'oui')
          .map((item: any) => ({
            ...item,
            fullName: `${item.nom} ${item.prenom}`,
          }))
      : []

  useEffect(() => {
    let mount = true
    const fetchData = async () => {
      if (mount && dispatch) {
        dispatch(resetBulletinDePaie())
        dispatch(resetParametreCalendrier())
        dispatch(fetchAllMouvementSalaire())
        dispatch(resetFormEmploye())

        try {
          // const response = await dispatch(fetchAllEmployees())
          // console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchData()

    return () => {
      mount = false
    }
  }, [dispatch])

  // useEffect(() => {
  //   setLocalData(
  //     data
  //       ?.filter((item: any) => item.actif === 'oui')
  //       .map((item: any) => ({
  //         ...item,
  //         fullName: `${item.nom} ${item.prenom}`,
  //       })) || [],
  //   )
  // }, [data])

  const HeaderComponents: React.FC = () => {
    return (
      <>
        <ButtonLink
          icon={<PlusIcon width={20} height={20} fontWeight={'bold'} />}
          to="/employees/ajout"
        >
          Ajouter
        </ButtonLink>
      </>
    )
  }
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

  return (
    <>
      {/* <TableEmployee /> */}
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
