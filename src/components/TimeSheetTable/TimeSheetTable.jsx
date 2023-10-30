import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import { employeeHours } from 'src/db/db'
import { format, parseISO } from 'date-fns'

const TimeSheetTable = (props) => {
  const columnHelper = createColumnHelper()

  const data = employeeHours ? employeeHours : []

  const columns = [
    // Colonne pour la date
    columnHelper.accessor('date', {
      cell: (info) => format(parseISO(info.getValue()), 'dd/MM/yyyy'),
      header: () => 'Date',
    }),
    // Colonne pour les heures normales
    columnHelper.accessor('normalHours', {
      cell: (info) => info.row.original.normalHours,
      header: () => 'Normal Hours',
    }),
    // Colonne pour les heures supplémentaires (overtimeHours)
    columnHelper.accessor('overtimeHours', {
      cell: (info) => info.row.original.overtimeHours,
      header: () => 'Overtime Hours',
    }),
    // Colonne pour les heures de nuit (nightShiftHours)
    columnHelper.accessor('nightShiftHours', {
      cell: (info) => info.row.original.nightShiftHours,
      header: () => 'Night Shift Hours',
    }),
    // Colonne pour les heures de jour férié (holidayHours)
    columnHelper.accessor('holidayHours', {
      cell: (info) => info.row.original.holidayHours,
      header: () => 'Holiday Hours',
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
    state: {
      sorting,
    },
  })

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white text-gray-800 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 bg-gray-100">
            {headerGroups.map((headerGroup, key) => (
              <tr key={`headerRow_${key}`}>
                {headerGroup.headers.map((header, headerIndex) => (
                  <th scope="col" className="px-6 py-3" key={`header_${header.id}_${headerIndex}`}>
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
    </>
  )
}

TimeSheetTable.propTypes = {
  id: PropTypes.string,
}

export default TimeSheetTable
