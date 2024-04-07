// @ts-nocheck

import React, { useEffect, useMemo } from 'react'
import { resetBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import { resetParametreCalendrier } from 'src/redux/parametreCalendrier/parametreCalendrierReducer'
import { fetchAllMouvementSalaire } from 'src/redux/mouvementSalaire/mouvementSalaireAction'
import ButtonLink from '@src/components/buttons/ButtonLink'
import ReusableTable from '@src/components/ReusableTable/ReusableTable'
import { PlusIcon } from '@heroicons/react/24/outline'
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { resetFormEmploye, setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { fetchAllEmployees } from '@src/redux/employees/employeesAction'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '@src/components/loadings/Loading'
import { CAlert } from '@coreui/react'
import useFetchListEmploye from '@src/hooks/useFetchListEmploye'
import CustomCAlert from '@src/components/CustomAlert'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import ReusableTablePagination from '@src/components/ReusableTable/ReusableTablePagination'

interface IDataWithActions extends IEmploye {
  actions?: React.FC[]
}

const HeaderComponents: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const handleClickButtonAdd = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault()
    dispatch(resetFormEmploye())
    navigate('/employees/ajout')
  }

  React.useEffect(() => {
    console.log(location)
  }, [location])

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

// const List = () => {
//   const dispatch = useAppDispatch()
//   // const {
//   //   list: data,
//   //   loading: loadingList,
//   //   error: errorLoadingList,
//   // } = useAppSelector((store) => store.employeesList)

//   const { data, error, isError, isLoading, refetch } = useFetchListEmploye()

//   const formattedData: IDataWithActions[] = useMemo(() => {
//     return data && data.length > 0
//       ? data
//           .filter((item: any) => item.actif === 'oui')
//           .map((item: any) => ({
//             ...item,
//             fullName: `${item.nom} ${item.prenom}`,
//           }))
//       : []
//   }, [data])

//   useEffect(() => {
//     let mount = true
//     const fetchData = async () => {
//       if (mount && dispatch) {
//         dispatch(resetBulletinDePaie())
//         dispatch(resetParametreCalendrier())
//         // dispatch(fetchAllMouvementSalaire())
//         dispatch(resetFormEmploye())
//         // try {
//         //   const res = await dispatch(fetchAllEmployees())
//         //   if (res.meta.requestStatus === 'fulfilled') {
//         //     // console.log(res)
//         //   }
//         // } catch (error) {
//         //   throw error
//         // }
//       }
//     }

//     fetchData()

//     return () => {
//       mount = false
//     }
//   }, [dispatch])

//   const columnHelper = createColumnHelper<IDataWithActions>()

//   const cols = useMemo<ColumnDef<IDataWithActions>[]>(
//     () => [
//       columnHelper.accessor<string>('matricule', {
//         cell: (info) => info.getValue(),
//         header: () => <div className="my-1">Matricule</div>,
//       }),
//       columnHelper.accessor('nom', {
//         cell: (info) => info.getValue(),
//         header: () => 'Nom',
//       }),
//       columnHelper.accessor('prenom', {
//         cell: (info) => info.getValue(),
//         header: () => 'Prenom',
//       }),
//       columnHelper.accessor('actions', {
//         cell: (info) => (
//           <div className="flex justify-center">
//             <ButtonLink to={`/employees/fiche/${info.row.original.id}`}>Détails</ButtonLink>
//           </div>
//         ),
//         header: () => <div className="text-center">Action</div>,
//       }),
//     ],
//     [columnHelper],
//   )

//   if (isLoading) {
//     return <Loading />
//   }

//   if (isError) {
//     return <CAlert color="danger">{error!.message}</CAlert>
//   }

//   return (
//     <>
//       {/* <TableEmployee /> */}
//       {/* {errorLoadingList && <CAlert color="danger">{errorLoadingList.message}</CAlert>} */}
//       <ReusableTable
//         data={formattedData}
//         columns={cols}
//         title="Liste des employés"
//         searchBar
//         pagination
//         headerComponents={<HeaderComponents />}
//       />
//     </>
//   )
// }

const List = () => {
  const { data, error, isError, isLoading, isFetching, refetch } = useFetchListEmploye()
  const fomatError = useErrorFormatter()
  const pageSizeOptions = [10, 15, 20, 25, 30]
  const columnHelper = createColumnHelper<IEmploye>()
  const [columnVisibility, setColumnVisibility] = React.useState({
    matricule: true,
    nom: true,
    prenom: true,
    num_cin: false,
    titre_poste: false,
    departement: false,
    date_embauche: false,
  })

  React.useEffect(() => {
    if (data) {
      if (data) {
        console.log(data)
      }
    }
  }, [data])

  const columns = [
    columnHelper.accessor('matricule', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Matricule</div>,
      enableHiding: false,
    }),
    columnHelper.accessor('nom', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Nom</div>,
      enableHiding: false,
    }),
    columnHelper.accessor('prenom', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Prénom</div>,
      enableHiding: false,
    }),
    columnHelper.accessor('num_cin', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">CIN</div>,
      enableHiding: true,
    }),
    columnHelper.accessor('date_embauche', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Date d'embauche</div>,
      enableHiding: true,
    }),
    columnHelper.accessor('departement', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Département</div>,
      enableHiding: true,
    }),
    columnHelper.accessor('titre_poste', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Poste</div>,
      enableHiding: true,
    }),
    columnHelper.accessor('actions', {
      cell: (info) => (
        <div className="flex justify-center">
          <ButtonLink to={`/employees/fiche/${info.row.original.id}`}>Détails</ButtonLink>
        </div>
      ),
      header: () => <div className="my-1">Action</div>,
      enableHiding: false,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  if (isFetching) {
    return <Loading />
  }
  if (isError) {
    return <CAlert color="danger">{fomatError(error!)}</CAlert>
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="inline-block border border-black shadow-sm rounded-sm bg-white">
        <div className="px-1 border-b border-black">
          <label className="flex gap-1 flex-row">
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />
            Tous
          </label>
        </div>
        <div className="flex">
          {table.getAllLeafColumns().map((column) => {
            return (
              <div key={column.id} className="px-1 flex flex-col">
                <label className="inline-flex gap-1">
                  <input
                    {...{
                      type: 'checkbox',
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />
                  {column.columnDef.header()}
                </label>
              </div>
            )
          })}
        </div>
      </div>

      <table className="customTable">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      <ReusableTablePagination
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        goToPage={table.setPageIndex}
        nextPage={table.nextPage}
        previousPage={table.previousPage}
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        pageSizeOptions={pageSizeOptions}
        setPageSize={table.setPageSize}
        defaultPageSize={10}
      />
    </div>
  )
}

export default List
