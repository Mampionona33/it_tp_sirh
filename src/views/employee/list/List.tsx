// @ts-nocheck

import React, { useEffect, useMemo } from 'react'
import ButtonLink from '@src/components/buttons/ButtonLink'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '@src/components/loadings/Loading'
import { CAlert } from '@coreui/react'
import useFetchListEmploye from '@src/hooks/useFetchListEmploye'
import CustomCAlert from '@src/components/CustomAlert'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import ReusableTablePagination from '@src/components/ReusableTable/ReusableTablePagination'
import { DebounceInput } from 'react-debounce-input'

interface IDataWithActions extends IEmploye {
  actions?: React.FC[]
}

const List = () => {
  const { data, error, isError, isLoading, isFetching, refetch } = useFetchListEmploye()
  const fomatError = useErrorFormatter()
  const dispatch = useAppDispatch()
  const pageSizeOptions = [10, 15, 20, 25, 30]
  const [globalFilter, setGlobalFilter] = React.useState('')
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
      globalFilter,
    },
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  const handleClickButtonAdd = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault()
    dispatch(resetFormEmploye())
    navigate('/employees/ajout')
  }

  if (isFetching) {
    return <Loading />
  }
  if (isError) {
    return <CustomCAlert color="danger">{fomatError(error!)}</CustomCAlert>
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <div className="relative flex items-center w-full">
          <div className="relative">
            <DebounceInput
              value={globalFilter || ''}
              onChange={(e) => {
                const value = e.target.value
                setGlobalFilter(String(value))
              }}
              className="p-1 h-9 bg-white "
              placeholder="Rechercher"
            />
            {globalFilter && (
              <XMarkIcon
                className="cursor-pointer absolute right-1 top-1 outline-customRed-50 text-slate-500 hover:text-slate-900"
                onClick={() => setGlobalFilter('')}
                width={28}
                height={28}
              />
            )}
          </div>
        </div>
        <ButtonLink
          icon={<PlusIcon width={20} height={20} fontWeight={'bold'} />}
          to="/employees/ajout"
          onClick={handleClickButtonAdd}
        >
          Ajouter
        </ButtonLink>
      </div>

      <div className="inline-block border border-black shadow-sm rounded-sm bg-white text-sm">
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
