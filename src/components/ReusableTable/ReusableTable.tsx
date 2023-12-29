import React from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { DebounceInput } from 'react-debounce-input'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ReusableTablePagination from './ReusableTablePagination'

export interface IReusableTableProps<T extends object> {
  title?: string
  headerButtonsGroupe?: React.ReactNode[]
  data: T[]
  searchBar?: boolean
  pagination?: boolean
  headerComponents?: React.ReactNode[]
  columns: ColumnDef<T, any>[]
}

const ReusableTable = <T extends object>({
  data,
  columns,
  title,
  searchBar = false,
  pagination = false,
  headerComponents,
}: IReusableTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const pageSizeOptions = [5, 10, 15, 20, 25, 30]
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="flex flex-col">
        {(title || searchBar) && (
          <div className="overflow-x-auto sm:-mx-2 lg:-mx-4">
            <div className="inline-block min-w-full py-1 sm:px-2 lg:px-4">
              <div className="overflow-hidden p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex gap-3 justify-start items-start w-full">
                    {title && (
                      <div>
                        <h1 className="text-lg px-0">{title}</h1>
                      </div>
                    )}
                    {searchBar && (
                      <div className="relative flex items-center">
                        <DebounceInput
                          value={globalFilter || ''}
                          onChange={(e) => {
                            const value = e.target.value
                            setGlobalFilter(String(value))
                          }}
                          className="p-1 h-9 sm:w-full w-[63vw] "
                          placeholder="Rechercher"
                        />
                        {globalFilter && (
                          <XMarkIcon
                            className="cursor-pointer absolute outline-customRed-50 text-slate-500 hover:text-slate-900 right-1 top-1"
                            onClick={() => setGlobalFilter('')}
                            width={28}
                            height={28}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end items-start flex-wrap">{headerComponents}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-2 lg:-mx-4">
            <div className="inline-block min-w-full py-1 sm:px-2 lg:px-4">
              <div className="overflow-hidden p-2">
                <table className="min-w-full">
                  <thead className="border-b bg-customRed-900">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} className="px-2 py-1 text-sm font-medium text-white">
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-customRed-25'}`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            className="whitespace-nowrap px-2 py-1 text-sm font-light text-gray-900"
                            key={cell.id}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {pagination && (
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-2 lg:-mx-4">
              <div className="inline-block min-w-full py-1 sm:px-2 lg:px-4">
                <div className="overflow-hidden p-2">
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
                    defaultPageSize={5}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReusableTable
