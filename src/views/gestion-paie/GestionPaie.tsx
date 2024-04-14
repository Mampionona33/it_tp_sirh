import React, { useEffect } from 'react'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import {
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import ButtonLink from '@src/components/buttons/ButtonLink'
import { resetBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import Loading from '@src/components/loadings/Loading'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import useFetchListEmploye from '@src/hooks/useFetchListEmploye'
import CustomCAlert from '@src/components/CustomAlert'
import { fuzzyFilter } from '@src/components/ReusableTable/fuzzyFunctions'
import { getSortedRowModel } from '@tanstack/react-table'
import { getFacetedMinMaxValues } from '@tanstack/react-table'
import { ColumnFiltersState } from '@tanstack/react-table'
import { VisibilityState } from '@tanstack/react-table'
import ReusableTableToggleColumnVisibilityAll from '@src/components/ReusableTable/ReusableTableToggleColumnVisibilityAll'
import ReusableTableToggleColumnVisibilityOneByOne from '@src/components/ReusableTable/ReusableTableToggleColumnVisibilityOneByOne'
import ReusableTablePagination from '@src/components/ReusableTable/ReusableTablePagination'
import { flexRender } from '@tanstack/react-table'
import ReusableTableGlobalFilter from '@src/components/ReusableTable/ReusableTableGlobalFilter'
import ReusableTableColumnFilter from '@src/components/ReusableTable/ReusableTableColumnFilter'

const GestionPaie: React.FC = () => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    matricule: true,
    nom: true,
    prenom: true,
    num_cin: false,
    titre_poste: false,
    departement: false,
    date_embauche: false,
  })
  const pageSizeOptions = [10, 15, 20, 25, 30]

  const fomatError = useErrorFormatter()
  const dispatch = useAppDispatch()

  const { data, error, isError, isLoading } = useFetchListEmploye()

  useEffect(() => {
    dispatch(resetBulletinDePaie())
    if (data) {
      console.log(data)
    }
  }, [dispatch, data])
  //   formatage des colonnes

  const columnHelper = createColumnHelper<IEmploye>()

  React.useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

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
    columnHelper.accessor('id', {
      cell: (info) => (
        <div className="flex justify-center">
          <ButtonLink to={`historique/${info.getValue()}`}>Historique paie</ButtonLink>
        </div>
      ),
      header: () => <div className="text-center">Action</div>,
      enableHiding: false,
      enableColumnFilter: false,
    }),
  ]

  const table = useReactTable({
    data: data || [],
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

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <CustomCAlert color="danger">{fomatError(error!)}</CustomCAlert>
  }

  return (
    <div className="p-2 flex flex-col gap-2 overflow-auto">
      <ReusableTableGlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
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

export default GestionPaie
