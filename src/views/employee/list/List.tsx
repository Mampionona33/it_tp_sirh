// @ts-nocheck

import React from 'react'
import ButtonLink from '@src/components/buttons/ButtonLink'
import { PlusIcon } from '@heroicons/react/24/outline'
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getSortedRowModel,
} from '@tanstack/react-table'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { useNavigate } from 'react-router-dom'
import Loading from '@src/components/loadings/Loading'
import useFetchListEmploye from '@src/hooks/useFetchListEmploye'
import CustomCAlert from '@src/components/CustomAlert'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import ReusableTablePagination from '@src/components/ReusableTable/ReusableTablePagination'
import ReusableTableColumnFilter from '@src/components/ReusableTable/ReusableTableColumnFilter'
import { fuzzyFilter } from '@src/components/ReusableTable/fuzzyFunctions'
import ReusableTableGlobalFilter from '@src/components/ReusableTable/ReusableTableGlobalFilter'
import ReusableTableToggleColumnVisibilityOneByOne from '@src/components/ReusableTable/ReusableTableToggleColumnVisibilityOneByOne'
import ReusableTableToggleColumnVisibilityAll from '@src/components/ReusableTable/ReusableTableToggleColumnVisibilityAll'

const List = () => {
  const { data, error, isError, isFetching } = useFetchListEmploye()
  const fomatError = useErrorFormatter()
  const dispatch = useAppDispatch()
  const pageSizeOptions = [10, 15, 20, 25, 30]
  const [globalFilter, setGlobalFilter] = React.useState('')
  const columnHelper = createColumnHelper<IEmploye>()
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState({
    matricule: true,
    nom: true,
    prenom: true,
    num_cin: false,
    titre_poste: false,
    departement: false,
    date_embauche: false,
  })
  const navigate = useNavigate()

  const columns = [
    columnHelper.accessor('matricule', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Matricule</div>,
      enableHiding: false,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('nom', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Nom</div>,
      enableHiding: false,
      enableColumnFilter: false,
    }),
    columnHelper.accessor('prenom', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Prénom</div>,
      enableHiding: false,
      enableColumnFilter: false,
    }),
    columnHelper.accessor('num_cin', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">CIN</div>,
      enableHiding: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor('date_embauche', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Date d'embauche</div>,
      enableHiding: true,
      enableColumnFilter: false,
    }),
    columnHelper.accessor('departement', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Département</div>,
      enableHiding: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('titre_poste', {
      cell: (info) => info.getValue(),
      header: () => <div className="my-1">Poste</div>,
      enableHiding: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('actions', {
      cell: (info) => (
        <div className="flex justify-center">
          <ButtonLink to={`/employees/fiche/${info.row.original.id}`}>Détails</ButtonLink>
        </div>
      ),
      header: () => <div className="my-1">Action</div>,
      enableHiding: false,
      enableColumnFilter: false,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnVisibility,
      columnFilters,
      globalFilter,
    },
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
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
    <div className="p-2 flex flex-col gap-2 overflow-auto">
      <div className="flex flex-row justify-between items-center gap-2 flex-wrap">
        <ReusableTableGlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        <ButtonLink
          icon={<PlusIcon width={20} height={20} fontWeight={'bold'} />}
          to="/employees/ajout"
          onClick={handleClickButtonAdd}
        >
          Ajouter
        </ButtonLink>
      </div>

      <div className="inline-block border border-black shadow-sm rounded-sm bg-white text-sm">
        <ReusableTableToggleColumnVisibilityAll table={table} />
        <ReusableTableToggleColumnVisibilityOneByOne table={table} />
      </div>

      <table className="customTable">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div>
                      <ReusableTableColumnFilter column={header.column} table={table} />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>Aucun enregistrement</td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          )}
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
