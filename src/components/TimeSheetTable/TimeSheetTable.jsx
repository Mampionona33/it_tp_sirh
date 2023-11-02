import React, { useState, useEffect } from 'react'
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
import { format, parseISO, startOfWeek, endOfWeek, isMonday, isSunday, isSaturday } from 'date-fns'
import CustomPagination from '../CustomPagination'
import MonthYearPicker from './MonthYearPicker'

const TimeSheetTable = (props) => {
  const columnHelper = createColumnHelper()
  const pageSizeOptions = [5, 10, 15, 20, 25, 30, 31]
  const [data, setData] = useState([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const defaultStartDate = isMonday(new Date()) ? new Date() : startOfWeek(new Date())
  const defaultEndDate = isSunday(new Date()) ? new Date() : endOfWeek(new Date())
  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)

  const columns = [
    // Colonne pour la date
    columnHelper.accessor('date', {
      cell: (info) => format(parseISO(info.getValue()), 'dd/MM/yyyy'),
      header: () => 'Date',
    }),
    // Colonne pour les heures normales
    columnHelper.accessor('normalHours', {
      cell: (info) =>
        info.row.original.normalHours && info.row.original.normalHours.toString().padStart(2, '0'),
      header: () => 'Heure normale',
    }),
    // Colonne pour les heures supplémentaires (overtimeHours)
    columnHelper.accessor('overtimeHours', {
      cell: (info) =>
        info.row.original.overtimeHours &&
        info.row.original.overtimeHours.toString().padStart(2, '0'),
      header: () => 'Heures supplémentaires',
    }),
    // Colonne pour les heures de nuit (nightShiftHours)
    columnHelper.accessor('nightShiftHours', {
      cell: (info) =>
        info.row.original.nightShiftHours &&
        info.row.original.nightShiftHours.toString().padStart(2, '0'),
      header: () => 'Travail de nuit',
    }),
    // Colonne pour les heures de jour férié (holidayHours)
    columnHelper.accessor('holidayHours', {
      cell: (info) =>
        info.row.original.holidayHours &&
        info.row.original.holidayHours.toString().padStart(2, '0'),
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

  const filterDataByDate = (currentFilter) => {
    const currentDate = currentFilter || new Date()
    const filteredData = employeeHours.filter((employHours) => {
      const employDate = new Date(employHours.date)
      return (
        employHours.employee.id == props.id &&
        employDate.getMonth() === currentDate.getMonth() &&
        employDate.getFullYear() === currentDate.getFullYear()
      )
    })
    setData(filteredData)
  }

  React.useEffect(() => {
    let mount = true

    if (props.id && employeeHours) {
      if (mount) {
        filterDataByDate()
      }
    }

    return () => {
      mount = false
    }
  }, [employeeHours, props.id])

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
        // pageSize: 5,
      },
    }))
  }, [table])

  const handleDateChange = (newDate) => {
    filterDataByDate(newDate)
  }

  const calculateColumnSum = (columnName) => {
    let result = 0
    if (columnName) {
      result = data.length > 0 && data.reduce((total, item) => total + (item[columnName] || 0), 0)
    }
    return result
  }

  // Calculate sums for columns (excluding the "Date" column)
  const columnSums = columns.map((column) => {
    if (column.accessorKey !== 'date') {
      return calculateColumnSum(column.accessorKey)
    }
    return null
  })

  const calculateTotal = () => {
    const total = {
      normalHours: 0,
      overtimeHours: 0,
      nightShiftHours: 0,
      holidayHours: 0,
    }

    data.forEach((item) => {
      total.normalHours += item.normalHours || 0
      total.overtimeHours += item.overtimeHours || 0
      total.nightShiftHours += item.nightShiftHours || 0
      total.holidayHours += item.holidayHours || 0
    })

    return total
  }
  const total = calculateTotal()

  const calculateHSDetails = () => {
    const hs = {
      hs130: 0,
      hs150: 0,
    }

    let currentWeekStartDate = null
    let weeklyOvertimeHours = 0
    const weeklyHsDetails = []

    data.sort((a, b) => new Date(a.date) - new Date(b.date))

    let isSundayStarted = false // Utilisé pour détecter le début du mois le dimanche

    data.forEach((element, index) => {
      const currentDate = new Date(element.date)
      const isLastDayOfMonth = index === data.length - 1
      console.log(currentDate)
      const hsValue = element.overtimeHours || 0

      if (!isSundayStarted && currentDate.getDate() === 1) {
        // Si le mois commence un jour autre que le dimanche, démarrez dès le dimanche précédent.
        const previousSunday = new Date(currentDate)
        previousSunday.setDate(currentDate.getDate() - 1)
        currentWeekStartDate = previousSunday
        isSundayStarted = true
      }

      if (isMonday(currentDate)) {
        currentWeekStartDate = currentDate
        weeklyOvertimeHours = 0
      }

      if (currentWeekStartDate) {
        weeklyOvertimeHours += hsValue

        if (isSunday(currentDate) || isLastDayOfMonth) {
          weeklyHsDetails.push({
            hs130: weeklyOvertimeHours <= 8 ? weeklyOvertimeHours : 8,
            hs150: weeklyOvertimeHours > 8 ? weeklyOvertimeHours - 8 : 0,
          })
        }
      }
    })

    console.log(weeklyHsDetails)
    return { total: hs, weeklyDetails: weeklyHsDetails }
  }

  const { total: detailHs, weeklyDetails } = calculateHSDetails()

  return (
    <>
      <div className="border shadow-sm overflow-hidden">
        <div className="flex flex-row flex-wrap bg-customRed-900 gap-4 px-4 py-2 text-white">
          <div className="flex-grow">
            <h5 className="text-2xl font-semibold mb-2">Heures travaillées</h5>
          </div>
          <div>
            <MonthYearPicker selectedDate={new Date()} onDateChange={handleDateChange} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white text-gray-800 dark:text-stone-200">
            <thead className="text-xs uppercase text-gray-700 dark:text-gray-400 bg-gray-100">
              {headerGroups.map((headerGroup, key) => (
                <tr key={`headerRow_${key}`}>
                  {headerGroup.headers.map((header, headerIndex) => (
                    <th
                      scope="col"
                      className="px-6 py-3 border-b border-customRed-900"
                      key={`header_${header.id}_${headerIndex}`}
                    >
                      {header.isPlaceholder ? null : (
                        <>{header.column.columnDef.header(header.getContext())}</>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.length > 0 ? (
                <tr className="font-medium border-b border-customRed-900">
                  <td className="px-6 py-3">Total</td>
                  <td className="px-6 py-3">{total.normalHours}</td>
                  <td className="px-6 py-3">{total.overtimeHours}</td>
                  <td className="px-6 py-3">{total.nightShiftHours}</td>
                  <td className="px-6 py-3">{total.holidayHours}</td>
                </tr>
              ) : (
                <>
                  <tr className="">
                    <td className="text-lg font-medium p-4">Aucune donnée trouvée</td>
                  </tr>
                </>
              )}
              {rows.map((row, rowIndex) => (
                <>
                  <tr
                    key={`row_${rowIndex}`}
                    className={`border-y border-customRed-100 ${
                      rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <td key={`cell_${rowIndex}_${cellIndex}`} className="px-6 py-2">
                        {cell.column.columnDef.cell(cell.getContext())}
                      </td>
                    ))}
                  </tr>

                  {isSunday(new Date(row.original.date)) && (
                    <>
                      <tr>
                        <td>HS 130%</td>
                        <td>{detailHs.hs130}</td>
                      </tr>
                      <tr>
                        <td>HS 150%</td>
                        <td>{detailHs.hs150}</td>
                      </tr>
                    </>
                  )}
                </>
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
                defaultPageSize={31}
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
