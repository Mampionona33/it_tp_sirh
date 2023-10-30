import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { employeeHours } from 'src/db/db'
import { format, parseISO } from 'date-fns'
import CustomPagination from '../CustomPagination'

const TimeSheetTable = (props) => {
  const columnHelper = createColumnHelper()
  const pageSizeOptions = [5, 10, 15, 20, 25, 30, 31]
  // const data = employeeHours ? employeeHours : []
  const [data, setData] = useState([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = [
    // Colonne pour la date
    columnHelper.accessor('date', {
      cell: (info) => format(parseISO(info.getValue()), 'dd/MM/yyyy'),
      header: () => 'Date',
    }),
    // Colonne pour les heures normales
    columnHelper.accessor('normalHours', {
      cell: (info) => info.row.original.normalHours,
      header: () => 'Heure normale',
    }),
    // Colonne pour les heures supplémentaires (overtimeHours)
    columnHelper.accessor('overtimeHours', {
      cell: (info) => info.row.original.overtimeHours,
      header: () => 'Heures supplémentaires',
    }),
    // Colonne pour les heures de nuit (nightShiftHours)
    columnHelper.accessor('nightShiftHours', {
      cell: (info) => info.row.original.nightShiftHours,
      header: () => 'Travail de nuit',
    }),
    // Colonne pour les heures de jour férié (holidayHours)
    columnHelper.accessor('holidayHours', {
      cell: (info) => info.row.original.holidayHours,
      header: () => 'Travail de jour férié',
    }),
  ]

  const defaultSorting = [
    {
      id: 'date',
      asc: true,
    },
  ]

  const [sorting, setSorting] = useState(defaultSorting)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows

  React.useEffect(() => {
    table.setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageIndex: 0,
        pageSize: 5,
      },
    }))
  }, [table])

  React.useEffect(() => {
    let mount = true

    if (props.id) {
      const employeHours = employeeHours.filter(
        (employHours) => employHours.employee.id == props.id,
      )
      if (mount) {
        setData(employeHours)
      }
    }

    return () => {
      mount = false
    }
  }, [props.id, employeeHours])

  return (
    <>
      <div className="border shadow-sm overflow-hidden">
        <div className="flex flex-row flex-wrap bg-customRed-900 gap-4 px-4 py-2 text-white">
          <div className="flex-grow">
            <h5 className="text-2xl font-semibold mb-2">Heures travaillées</h5>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white text-gray-800 dark:text-gray-400">
            <thead className="text-sm uppercase text-gray-700 dark:text-gray-400 bg-gray-100">
              {headerGroups.map((headerGroup, key) => (
                <tr key={`headerRow_${key}`}>
                  {headerGroup.headers.map((header, headerIndex) => (
                    <th
                      scope="col"
                      className="px-6 py-3"
                      key={`header_${header.id}_${headerIndex}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : header.column.columnDef.header(header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`row_${rowIndex}`}>
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td key={`cell_${rowIndex}_${cellIndex}`} className="px-6 py-2">
                      {cell.column.columnDef.cell(cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-100 overflow-auto py-2 px-4">
          <div className="flex justify-center  p-2 mt-2">
            <div className="flex flex-wrap items-center gap-2">
              <CustomPagination
                pageIndex={table.getState().pagination.pageIndex}
                pageCount={table.getPageCount()}
                goToPage={table.setPageIndex}
                nextPage={table.nextPage}
                previousPage={table.previousPage}
                canNextPage={table.getCanNextPage()}
                canPreviousPage={table.getCanPreviousPage()}
                pageSizeOptions={pageSizeOptions}
                setPageSize={table.setPageSize}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

TimeSheetTable.propTypes = {
  id: PropTypes.string,
}

export default TimeSheetTable
