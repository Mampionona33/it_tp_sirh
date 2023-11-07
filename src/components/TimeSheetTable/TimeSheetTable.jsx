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
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isMonday,
  isSunday,
  isSaturday,
  isDate,
  setDefaultOptions,
  isThursday,
} from 'date-fns'
import CustomPagination from '../CustomPagination'
import MonthYearPicker from './MonthYearPicker'
import TimeSheetTablePagination from './TimeSheetTablePagination'
import { fr } from 'date-fns/locale'
import { info } from 'autoprefixer'
import { useDispatch, useSelector } from 'react-redux'
import {
  setTotalHNormal,
  setTotalHdim,
  setTotalHferier,
  setTotalHs130,
  setTotalHs150,
  setTotalHs30,
  setTotalHs50,
  setTotalHsJour,
  setTotalHsni130,
  setTotalHsni150,
} from 'src/redux/employeHours/employeHoursReducer'

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
  const dispatch = useDispatch()

  setDefaultOptions({ locale: fr })

  const columns = [
    // Colonne pour la date
    columnHelper.accessor('date', {
      cell: (info) => format(parseISO(info.getValue()), 'dd/MM/yyyy'),
      header: () => 'Date',
    }),

    // colonne pour afficher le jour
    columnHelper.accessor('jour', {
      cell: (info) => (
        <span className="capitalize">{format(parseISO(info.row.original.date), 'EEEE')}</span>
      ),
      header: () => 'Jour',
    }),

    // Colonne pour les heures normales jour
    columnHelper.accessor('normalHours', {
      cell: (info) => {
        if (!isSunday(new Date(info.row.original.date))) {
          return info.row.original.regularHoursDay && info.row.original.regularHoursDay
        }
      },
      header: () => 'HN',
    }),

    // heures supplémentaires
    columnHelper.accessor('overtimeHoursDay', {
      cell: (info) => {
        if (!isSunday(new Date(info.row.original.date)) && !info.row.original.holidayHours) {
          if (
            info.row.original.overtimeHoursDay ||
            info.row.original.regularNightHours ||
            info.row.original.occasionalNightHours
          ) {
            return (
              info.row.original.overtimeHoursDay +
              info.row.original.regularNightHours +
              info.row.original.occasionalNightHours
            )
          }
        }
      },

      header: () => 'HS',
    }),

    // colonne HS130
    columnHelper.accessor('hs130', {
      cell: (info) => {
        if (isMonday(new Date(info.row.original.date))) {
          const weekStartDate = new Date(info.row.original.date)

          const weekEndDate = new Date(weekStartDate)
          weekEndDate.setDate(weekEndDate.getDate() + 6)

          const weekStartISO = format(weekStartDate, 'yyyy-MM-dd')
          const weekEndISO = format(weekEndDate, 'yyyy-MM-dd')

          const weekTotal = data.filter((row) => row.date >= weekStartISO && row.date <= weekEndISO)

          const hs130 = weekTotal.reduce((total, item) => {
            // Vérifier si l'heure de vacances est nulle avant de l'inclure dans le calcul
            if (!item.holidayHours) {
              return (
                total + item.overtimeHoursDay + item.occasionalNightHours + item.regularNightHours
              )
            }
            return total
          }, 0)

          return hs130 >= 8 ? 8 : hs130
        }
        return null
      },
      header: () => 'HS 130%',
    }),

    // colonne HS150
    columnHelper.accessor('hs150', {
      cell: (info) => {
        if (isMonday(new Date(info.row.original.date))) {
          const weekStartDate = new Date(info.row.original.date)

          const weekEndDate = new Date(weekStartDate)
          weekEndDate.setDate(weekEndDate.getDate() + 6)

          const weekStartISO = format(weekStartDate, 'yyyy-MM-dd')
          const weekEndISO = format(weekEndDate, 'yyyy-MM-dd')

          // Filter and sum the overtimeHoursDay for rows within the current week, excluding hours for holidays
          const hs150 = data
            .filter((row) => row.date >= weekStartISO && row.date <= weekEndISO)
            .reduce((total, item) => {
              // Vérifier si l'heure de vacances est nulle avant de l'inclure dans le calcul
              if (!item.holidayHours) {
                return (
                  total + item.overtimeHoursDay + item.occasionalNightHours + item.regularNightHours
                )
              }
              return total
            }, 0)

          return hs150 >= 8 ? hs150 - 8 : null
        }
        return null
      },
      header: () => 'HS 150%',
    }),

    // Colonne pour travail de nuit habituelles "agent de nuit" x30%
    columnHelper.accessor('hsn30', {
      cell: (info) => {
        if (!isSunday(new Date(info.row.original.date)) && !info.row.original.holidayHours) {
          return info.row.original.regularNightHours && info.row.original.regularNightHours
        }
      },
      header: () => 'HSN 30%',
    }),

    // Colonne pour travail de nuit occasionnelles x50%
    columnHelper.accessor('hs50', {
      cell: (info) => {
        return info.row.original.occasionalNightHours &&
          !isSunday(new Date(info.row.original.date)) &&
          !info.row.original.holidayHours
          ? info.row.original.occasionalNightHours
          : null
      },
      header: () => 'HS 50%',
    }),

    // Colonne pour travail dimanche
    columnHelper.accessor('hdim', {
      cell: (info) => {
        if (isSunday(new Date(info.row.original.date))) {
          const result =
            info.row.original.regularHoursDay +
            info.row.original.regularNightHours +
            info.row.original.overtimeHoursDay +
            info.row.original.occasionalNightHours
          return result
        }
      },
      header: () => 'Hdim',
    }),
    // Colonne pour les heures de jour férié (holidayHours)
    columnHelper.accessor('holidayHours', {
      cell: (info) => {
        if (info.getValue() && !isSunday(new Date(info.row.original.date))) {
          const hferier =
            info.row.original.holidayHours +
            info.row.original.regularNightHours +
            info.row.original.overtimeHoursDay +
            info.row.original.occasionalNightHours
          return hferier
        }
      },
      header: () => 'Hférié',
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
    // getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows

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

  const calculateTotal = () => {
    const total = {
      regularHoursDay: 0,
      overtimeHoursDay: 0,
      regularNightHours: 0,
      holidayHours: 0,
      occasionalNightHours: 0,
      sundayHours: 0,
      hs130: 0,
      hs150: 0,
    }

    let weeklyOvertimeHours = 0

    data.forEach((item, index) => {
      if (item.holidayHours) {
        total.holidayHours +=
          item.holidayHours +
          item.overtimeHoursDay +
          item.regularNightHours +
          item.occasionalNightHours
      } else if (!isSunday(new Date(item.date))) {
        total.regularNightHours += item.regularNightHours || 0
        total.overtimeHoursDay += item.overtimeHoursDay
        total.overtimeHoursDay += item.occasionalNightHours
        total.overtimeHoursDay += item.regularNightHours
        total.regularHoursDay += item.regularHoursDay || 0
        total.occasionalNightHours += item.occasionalNightHours || 0

        if (isMonday(new Date(item.date)) || index === 0) {
          weeklyOvertimeHours = 0
        }

        weeklyOvertimeHours += item.overtimeHoursDay
        weeklyOvertimeHours += item.occasionalNightHours
        weeklyOvertimeHours += item.regularNightHours

        if (isSaturday(new Date(item.date)) || index === data.length - 1) {
          total.hs130 += Math.min(weeklyOvertimeHours, 8)
          total.hs150 += Math.max(weeklyOvertimeHours - 8, 0)
        }
      } else {
        // Calcul des heures du dimanche
        total.sundayHours +=
          item.regularHoursDay +
          item.overtimeHoursDay +
          item.regularNightHours +
          item.occasionalNightHours
      }
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

    let isSundayStarted = false

    data.forEach((element, index) => {
      const currentDate = new Date(element.date)
      const isLastDayOfMonth = index === data.length - 1
      const hsValue = element.overtimeHoursDay || 0

      if (!isSundayStarted && currentDate.getDate() === 1) {
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

    return { total: hs, weeklyDetails: weeklyHsDetails }
  }

  const calculateHSNI = (data) => {
    let hsni130 = 0
    let hsni150 = 0
    let totalHS = 0
    let hsni = 0

    for (const entry of data) {
      totalHS += entry.regularNightHours + entry.occasionalNightHours + entry.overtimeHoursDay
    }

    hsni = totalHS - 20

    if (hsni >= 20) {
      hsni130 = 18
      hsni150 = 2
    } else {
      hsni130 = hsni
    }

    return { hsni130, hsni150 }
  }

  const { total: detailHs, weeklyDetails } = calculateHSDetails()

  React.useEffect(() => {
    let mount = true

    if (data.length > 0) {
      if (mount) {
        const newTotal = calculateTotal()
        dispatch(setTotalHNormal(newTotal.regularHoursDay))
        dispatch(setTotalHs130(newTotal.hs130))
        dispatch(setTotalHs150(newTotal.hs150))
        dispatch(setTotalHs50(newTotal.occasionalNightHours))
        dispatch(setTotalHs30(newTotal.regularNightHours))
        dispatch(setTotalHdim(newTotal.sundayHours))
        dispatch(setTotalHferier(newTotal.holidayHours))

        const newTotalHsni = calculateHSNI(data)
        dispatch(setTotalHsni130(newTotalHsni.hsni130))
        dispatch(setTotalHsni150(newTotalHsni.hsni150))
      }
    }

    return () => {
      mount = false
    }
  }, [data])

  const Total = () => {
    const header = [
      'Date',
      '',
      'HN',
      'HS',
      'HS 130%',
      'HS 150%',
      'HS 30%',
      'HS 50%',
      'Hdim',
      'Hférié',
    ]
    return (
      <>
        <tr className="px-6 py-3 border-x border-x-customRed-100 w-1/6 min-w-1/6 bg-gray-200">
          {header.map((item, key) => {
            return (
              <td className="px-6 py-2 border-x border-x-customRed-100 font-medium" key={key}>
                {item}
              </td>
            )
          })}
        </tr>
        <tr className="font-medium bg-customBlue-200 border-b border-customRed-900">
          <td className="px-6 py-3">Total</td>
          <td className="px-6 py-3"></td>
          <td className="px-6 py-3">
            {total.regularHoursDay !== 0 && total.regularHoursDay.toString().padStart(2, '0')}
          </td>
          <td className="px-6 py-3">
            {total.overtimeHoursDay !== 0 && total.overtimeHoursDay.toString().padStart(2, '0')}
          </td>
          <td className="px-6 py-3">
            {total.hs130 !== 0 && total.hs130.toString().padStart(2, '0')}
          </td>
          <td className="px-6 py-3">
            {total.hs150 !== 0 && total.hs150.toString().padStart(2, '0')}
          </td>
          <td className="px-6 py-3">
            {total.regularNightHours !== 0 && total.regularNightHours.toString().padStart(2, '0')}
          </td>
          <td className="px-6 py-3">
            {total.occasionalNightHours !== 0 &&
              total.occasionalNightHours.toString().padStart(2, '0')}
          </td>
          <td className="px-6 py-3">
            {total.sundayHours !== 0 && total.sundayHours.toString().padStart(2, '0')}
          </td>
          <td className="px-6 py-3">
            {total.holidayHours !== 0 && total.holidayHours.toString().padStart(2, '0')}
          </td>
        </tr>
      </>
    )
  }

  return (
    <>
      <div className="border shadow-sm  ">
        <div className="flex flex-row flex-wrap bg-customRed-900 gap-4 px-4 py-2 text-white">
          <div className="flex-grow">
            <h5 className="text-2xl font-semibold mb-2">Heures travaillées</h5>
          </div>
          <div>
            <MonthYearPicker selectedDate={new Date()} onDateChange={handleDateChange} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full max-h-full xl:table-fixed lg:table-auto bg-white text-gray-800 dark:text-stone-200 ">
            <thead className="text-xs  text-gray-700 dark:text-gray-400 bg-gray-100">
              {headerGroups.map((headerGroup, key) => (
                <tr key={`headerRow_${key}`} className="w-full">
                  {headerGroup.headers.map((header, headerIndex) => (
                    <th
                      scope="col"
                      className="px-6 py-3 border-x border-x-customRed-100 w-1/6 min-w-1/6"
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
              {rows.map((row, rowIndex) => (
                <tr
                  key={`row_${rowIndex}`}
                  className={`border-y border-customRed-100 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    const currentColumn = cell.column.id
                    const cellValue = cell.column.columnDef.cell(cell.getContext())

                    if (!(currentColumn === 'hs130' || currentColumn === 'hs150')) {
                      return (
                        <td
                          key={`cell_${rowIndex}_${cellIndex}`}
                          className="px-6 py-2 border-x border-customRed-100 "
                        >
                          {cellValue && currentColumn !== 'jour'
                            ? cell.column.columnDef
                                .cell(cell.getContext())
                                .toString()
                                .padStart(2, '0')
                            : cellValue}
                        </td>
                      )
                    } else {
                      if (isMonday(new Date(row.original.date))) {
                        return (
                          <td
                            rowSpan={6}
                            key={`cell_${rowIndex}_${cellIndex}`}
                            className="px-6 py-2 border-x border-customRed-100 "
                          >
                            {cell.column.columnDef.cell(cell.getContext()) &&
                              cell.column.columnDef
                                .cell(cell.getContext())
                                .toString()
                                .padStart(2, '0')}
                          </td>
                        )
                      }
                      if (isSunday(new Date(row.original.date))) {
                        return (
                          <td
                            key={`cell_${rowIndex}_${cellIndex}`}
                            className="px-6 py-2 border-x border-customRed-100 "
                          >
                            {cell.column.columnDef.cell(cell.getContext())}
                          </td>
                        )
                      }
                    }
                  })}
                </tr>
              ))}

              {/* Total */}
              {rows.length > 0 ? (
                <Total />
              ) : (
                <tr>
                  <td colSpan="10" className="text-lg font-medium p-4">
                    Aucune donnée trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

TimeSheetTable.propTypes = {
  id: PropTypes.string,
}

export default TimeSheetTable
