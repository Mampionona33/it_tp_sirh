import React, { useState, useCallback, useEffect } from 'react'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isMonday,
  isSunday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  setDefaultOptions,
  parse,
} from 'date-fns'
import MonthYearPicker from './MonthYearPicker'
import { fr, enUS } from 'date-fns/locale'
import { useDispatch, useSelector } from 'react-redux'
import HeureService from 'src/services/HeureService'
import convertHumanDateToIso from 'src/utils/convertHumanDateToIso'

const TimeSheetTable = (props) => {
  const columnHelper = createColumnHelper()
  // const pageSizeOptions = [5, 10, 15, 20, 25, 30, 31]
  const dispatch = useDispatch()
  const salarie = useSelector((state) => state.bulletinDePaie.salarie)
  const travDeNuit = useSelector((state) => state.bulletinDePaie.salarie.travDeNuit)
  const isCadre = salarie.cadre || false
  const listDateDebutDateFin = useSelector(
    (state) => state.parametreCalendrier.listDateDebutDateFin,
  )
  const [data, setData] = useState([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const defaultStartDate = isMonday(new Date()) ? new Date() : startOfWeek(new Date())
  const defaultEndDate = isSunday(new Date()) ? new Date() : endOfWeek(new Date())

  // Définir la langue de date-fns en français
  setDefaultOptions({ locale: fr })

  const defaultSorting = [
    {
      id: 'date',
      asc: true,
    },
  ]

  const [sorting, setSorting] = useState(defaultSorting)

  const formatDataFromBackend = useCallback(
    (bakendData, id) => {
      const transFormedData = Array.from(bakendData).map((item) => {
        const parsedDate = parse(item.date, 'dd/MM/yyyy', new Date())

        let hs = null
        let hdim = null
        if (item.hs_de_dimanche && item.hs_de_dimanche > 0) {
          hdim = item.hs_de_dimanche
        }
        if (item.heure_normale && item.heure_de_travail) {
          hs = item.heure_de_travail - item.heure_normale
        }
        if (hs < 0) {
          hs = null
        } else {
          hs = Math.round(hs * 100) / 100
        }

        let hsNuitHabituel = 0
        let hsNuitOccasionnel = 0

        if (item.hs_de_nuit) {
          if (travDeNuit) {
            hsNuitHabituel = Math.round(item.hs_de_nuit * 100) / 100
          } else {
            hsNuitOccasionnel = Math.round(item.hs_de_nuit * 100) / 100
          }
        }

        return {
          employee: {
            id: id,
          },
          date: format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          regularHoursDay: item.heure_normale ? Math.round(item.heure_normale * 100) / 100 : 0,
          regularNightHours: hsNuitHabituel,
          occasionalNightHours: hsNuitOccasionnel,
          overtimeHoursDay: hs,
          hdim: hdim,
          holidayHours: item.hs_jours_feries ? Math.round(item.hs_jours_feries * 100) / 100 : 0,
        }
      })

      return transFormedData
    },
    [travDeNuit],
  )

  const filterDataByDate = useCallback(
    async (currentFilter) => {
      const matricul = salarie.matricule
      const currentDate = currentFilter ? currentFilter : new Date()
      // console.log(currentDate)
      const currentMonth = new Date(currentDate).getMonth() + 1
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1
      const currentYear = new Date(currentDate).getFullYear()

      // Récupérer le mois et l'année
      const selectedMonth = format(currentDate, 'MMM', { locale: enUS })
        .toLowerCase()
        .replace(/\./gi, '')

      // Récupérer les dates de début et de fin du mois sélectionné
      const { dateDebut, dateFin } =
        listDateDebutDateFin &&
        listDateDebutDateFin[selectedMonth] &&
        listDateDebutDateFin[selectedMonth]

      // Construire les dates de début et de fin en utilisant les informations récupérées
      const dateDebutFormatted = `${dateDebut}/${prevMonth.toString().padStart(2, '0')}/${
        currentYear - (currentMonth === 1 ? 1 : 0)
      }`
      const dateFinFormatted = `${dateFin}/${currentMonth
        .toString()
        .padStart(2, '0')}/${currentYear}`

      const startDate = '01/01/2023'
      const endDate = '06/01/2023'

      const heureService = new HeureService()
      try {
        if (matricul && salarie && salarie.id) {
          const resp = await heureService.getAll(matricul, dateDebutFormatted, dateFinFormatted)
          const transFormedData = formatDataFromBackend(resp, salarie.id)
          setData(transFormedData)

          // Ajouter le jour "01" à la date de fin avant de l'utiliser dans parseISO
          const parsedEndDate = convertHumanDateToIso(dateFinFormatted)
          return parsedEndDate
        }
      } catch (error) {
        console.log(error)
      }

      //   setData(filteredData)
    },
    [salarie, setData, listDateDebutDateFin, formatDataFromBackend],
  )

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
    columnHelper.accessor('regularHoursDay', {
      cell: (info) => {
        if (info.getValue() !== 0 && !isSunday(new Date(info.row.original.date))) {
          return info.getValue()
        }
        return null
      },
      header: () => 'HN',
    }),

    // heures supplémentaires
    columnHelper.accessor('overtimeHoursDay', {
      cell: (info) => {
        if (info.getValue() === 0) {
          return null
        }

        if (!isSunday(new Date(info.row.original.date)) && !info.row.original.holidayHours) {
          return isCadre ? null : info.getValue()
        }

        return null
      },
      header: () => 'HS',
    }),

    // colonne HS130
    // colonne HS130
    columnHelper.accessor('hs130', {
      cell: (info) => {
        if (isCadre || !isMonday(new Date(info.row.original.date))) return null

        const weekStartDate = new Date(info.row.original.date)
        const weekEndDate = new Date(weekStartDate)
        weekEndDate.setDate(weekEndDate.getDate() + 6)
        const weekStartISO = format(weekStartDate, 'yyyy-MM-dd')
        const weekEndISO = format(weekEndDate, 'yyyy-MM-dd')

        const weekTotal = data.filter((row) => row.date >= weekStartISO && row.date <= weekEndISO)

        const hs130 = weekTotal.reduce((total, item) => {
          if (!item.holidayHours) {
            return (
              total + item.overtimeHoursDay + item.occasionalNightHours + item.regularNightHours
            )
          }
          return total
        }, null)

        const result = hs130 >= 8 ? 8 : hs130 || null

        return result > 0 ? Math.round(result * 100) / 100 : null
      },
      header: () => 'HS 130%',
    }),

    // colonne HS150
    columnHelper.accessor('hs150', {
      cell: (info) => {
        if (isCadre || !isMonday(new Date(info.row.original.date))) return null

        const weekStartDate = new Date(info.row.original.date)
        const weekEndDate = new Date(weekStartDate)
        weekEndDate.setDate(weekEndDate.getDate() + 6)
        const weekStartISO = format(weekStartDate, 'yyyy-MM-dd')
        const weekEndISO = format(weekEndDate, 'yyyy-MM-dd')

        const hs150 = data
          .filter((row) => row.date >= weekStartISO && row.date <= weekEndISO)
          .reduce((total, item) => {
            if (!item.holidayHours) {
              return (
                total + item.overtimeHoursDay + item.occasionalNightHours + item.regularNightHours
              )
            }
            return Math.round(total * 100) / 100
          }, 0)

        return hs150 >= 8 ? Math.round((hs150 - 8) * 100) / 100 : null
      },
      header: () => 'HS 150%',
    }),

    // Colonne pour travail de nuit habituelles "agent de nuit" x30%
    columnHelper.accessor('hsn30', {
      cell: (info) => {
        if (!info.row.original.regularNightHours) {
          return null
        }
        return (
          !isSunday(new Date(info.row.original.date)) &&
          !info.row.original.holidayHours &&
          info.row.original.regularNightHours
        )
      },
      header: () => 'HSN 30%',
    }),

    // Colonne pour travail de nuit occasionnelles x50%
    columnHelper.accessor('hs50', {
      cell: (info) =>
        !isCadre &&
        info.row.original.occasionalNightHours &&
        !isSunday(new Date(info.row.original.date)) &&
        !info.row.original.holidayHours
          ? info.row.original.occasionalNightHours
          : null,
      header: () => 'HS 50%',
    }),

    // Colonne pour travail dimanche
    columnHelper.accessor('hdim', {
      cell: (info) => {
        if (isCadre) return null
        return info.getValue()
        // const sommeHs =
        //   info.row.original.regularHoursDay +
        //   info.row.original.regularNightHours +
        //   info.row.original.overtimeHoursDay +
        //   info.row.original.occasionalNightHours

        // return isSunday(new Date(info.row.original.date)) && sommeHs > 0
        //   ? Math.round(sommeHs * 100) / 100
        //   : null
      },
      header: () => 'Hdim',
    }),

    // Colonne pour les heures de jour férié (holidayHours)
    columnHelper.accessor('holidayHours', {
      cell: (info) => {
        if (isCadre) return null

        if (info.getValue() && !isSunday(new Date(info.row.original.date))) {
          return (
            info.row.original.holidayHours +
            info.row.original.regularNightHours +
            info.row.original.overtimeHoursDay +
            info.row.original.occasionalNightHours
          )
        }
      },
      header: () => 'Hférié',
    }),
  ]

  useEffect(() => {
    let mount = true
    if (salarie) {
      if (mount) {
        filterDataByDate()
      }
    }
    return () => {
      mount = false
    }
  }, [salarie, filterDataByDate])

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

  const handleDateChange = async (newDate) => {
    const endDate = await filterDataByDate(newDate)
    const dateSelectionne = format(new Date(endDate), 'MMM-dd', { locale: fr })
    dispatch(setBulletinDePaie({ dateSelectionne: dateSelectionne }))
  }

  const calculateTotal = useCallback(() => {
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
        total.regularNightHours += item.regularNightHours
        total.overtimeHoursDay += item.overtimeHoursDay
        total.overtimeHoursDay += item.occasionalNightHours
        total.overtimeHoursDay += item.regularNightHours
        total.regularHoursDay += item.regularHoursDay
        total.occasionalNightHours += item.occasionalNightHours

        if (isMonday(new Date(item.date)) || index === 0) {
          weeklyOvertimeHours = 0
        }
        weeklyOvertimeHours += item.overtimeHoursDay
        weeklyOvertimeHours += item.occasionalNightHours
        weeklyOvertimeHours += item.regularNightHours

        if (
          isSaturday(new Date(item.date)) ||
          (index === data.length - 1 && weeklyOvertimeHours > 0)
        ) {
          total.hs130 += Math.min(weeklyOvertimeHours, 8)
          total.hs150 += Math.max(weeklyOvertimeHours - 8, 0)
        }
      } else {
        // Calcul des heures du dimanche
        total.sundayHours += item.hdim
        // total.sundayHours +=
        //   item.regularHoursDay +
        //   item.overtimeHoursDay +
        //   item.regularNightHours +
        //   item.occasionalNightHours
      }
    })

    total.hs130 = Math.round(total.hs130 * 100) / 100
    total.hs150 = Math.round(total.hs150 * 100) / 100
    total.occasionalNightHours = Math.round(total.occasionalNightHours * 100) / 100
    total.overtimeHoursDay = Math.round(total.overtimeHoursDay * 100) / 100
    total.sundayHours = Math.round(total.sundayHours * 100) / 100

    if (isCadre) {
      total.holidayHours = 0
      total.hs130 = 0
      total.hs150 = 0
      total.occasionalNightHours = 0
      total.overtimeHoursDay = 0
      // total.regularHoursDay = 0
      total.regularNightHours = 0
      total.sundayHours = 0
    }

    return total
  }, [data, isCadre])

  const total = calculateTotal()

  const calculateHSNI = (data) => {
    let hsni130 = 0
    let hsni150 = 0
    let totalHS = 0

    // somme des heurs sup
    for (const entry of data) {
      totalHS += entry.regularNightHours + entry.occasionalNightHours + entry.overtimeHoursDay
    }

    if (totalHS >= 18) {
      hsni130 = 18
      hsni150 = 2
    } else {
      hsni130 = totalHS
    }

    return { hsni130, hsni150 }
  }

  // const { totals } = calculateHSDetails()

  React.useEffect(() => {
    let mount = true

    if (data.length > 0) {
      if (mount) {
        const newTotal = calculateTotal()

        const totalHn = newTotal.regularHoursDay
        const totalHFerie = newTotal.holidayHours
        const totalHs = newTotal.overtimeHoursDay
        const totalHs30 = Math.round(newTotal.regularNightHours * 100) / 100
        const totalHs50 = newTotal.occasionalNightHours
        const totalHDim = newTotal.sundayHours
        const totalHs130 = newTotal.hs130
        const hsni130 = totalHs >= 18 ? 18 : totalHs
        const hsi130 = totalHs >= 20 ? totalHs130 - 18 : 0
        const totalHs150 = newTotal.hs150
        const hsni150 = totalHs < 18 ? 0 : totalHs < 20 ? totalHs - 18 : 2

        const hsi150 =
          totalHs >= 18 && totalHs150 >= 2 ? totalHs150 - 2 : totalHs150 < 2 ? totalHs150 : 0

        dispatch(
          setBulletinDePaie({
            totalHs50: totalHs50,
            totalHs30: totalHs30,
            totalHn: totalHn,
            totalHs: totalHs,
            hsni130: hsni130,
            hsni150: hsni150,
            totalHs130: totalHs130,
            totalHs150: totalHs150,
            totalHFerie: totalHFerie,
            hsi130: hsi130,
            hsi150: hsi150,
            totalHDim: totalHDim,
          }),
        )
      }
    }

    return () => {
      mount = false
    }
  }, [data, calculateTotal, dispatch, isCadre])

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
            {total.overtimeHoursDay !== 0 &&
              total.overtimeHoursDay.toFixed(2).toString().padStart(2, '0')}
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
          <table className="w-full max-h-full table-fixe bg-white text-gray-800 dark:text-stone-200 ">
            <thead className="text-xs  text-gray-700 dark:text-gray-400 bg-gray-100">
              {headerGroups.map((headerGroup, key) => (
                <tr key={`headerRow_${key}`} className="w-full">
                  {headerGroup.headers.map((header, headerIndex) => (
                    <th
                      scope="col"
                      className="px-1 py-3 border-x border-x-customRed-100 w-10/100"
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
              {rows.map((row, rowIndex) => {
                const remainingRows = rows.length - rowIndex

                return (
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
                            className="px-1 py-2 border-x border-customRed-100"
                          >
                            {cellValue && currentColumn !== 'jour' && cellValue !== 0
                              ? cell.column.columnDef
                                  .cell(cell.getContext())
                                  .toString()
                                  .padStart(2, '0')
                              : cellValue}
                          </td>
                        )
                      } else {
                        // il faut verifier si la premiere ligne n'est pas lundi
                        // donc on fait la fusion des lignes suivant le jour
                        if (isTuesday(new Date(row.original.date)) && rowIndex === 0) {
                          return (
                            <td
                              rowSpan={5}
                              key={`cell_${rowIndex}_${cellIndex}`}
                              className="px-1 py-2 border-x border-customRed-100"
                            >
                              {cell.column.columnDef.cell(cell.getContext()) &&
                                cell.column.columnDef
                                  .cell(cell.getContext())
                                  .toString()
                                  .padStart(2, '0')}
                            </td>
                          )
                        }
                        if (isWednesday(new Date(row.original.date)) && rowIndex === 0) {
                          return (
                            <td
                              rowSpan={4}
                              key={`cell_${rowIndex}_${cellIndex}`}
                              className="px-1 py-2 border-x border-customRed-100"
                            >
                              {cell.column.columnDef.cell(cell.getContext()) &&
                                cell.column.columnDef
                                  .cell(cell.getContext())
                                  .toString()
                                  .padStart(2, '0')}
                            </td>
                          )
                        }
                        if (isThursday(new Date(row.original.date)) && rowIndex === 0) {
                          return (
                            <td
                              rowSpan={3}
                              key={`cell_${rowIndex}_${cellIndex}`}
                              className="px-1 py-2 border-x border-customRed-100"
                            >
                              {cell.column.columnDef.cell(cell.getContext()) &&
                                cell.column.columnDef
                                  .cell(cell.getContext())
                                  .toString()
                                  .padStart(2, '0')}
                            </td>
                          )
                        }
                        if (isFriday(new Date(row.original.date)) && rowIndex === 0) {
                          return (
                            <td
                              rowSpan={2}
                              key={`cell_${rowIndex}_${cellIndex}`}
                              className="px-1 py-2 border-x border-customRed-100"
                            >
                              {cell.column.columnDef.cell(cell.getContext()) &&
                                cell.column.columnDef
                                  .cell(cell.getContext())
                                  .toString()
                                  .padStart(2, '0')}
                            </td>
                          )
                        }
                        if (isMonday(new Date(row.original.date))) {
                          const rowspan = Math.min(remainingRows, 6)
                          return (
                            <td
                              rowSpan={rowspan}
                              key={`cell_${rowIndex}_${cellIndex}`}
                              className="px-1 py-2 border-x border-customRed-100"
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
                              className="px-1 py-2 border-x border-customRed-100"
                            >
                              {cell.column.columnDef.cell(cell.getContext())}
                            </td>
                          )
                        }
                        // Handle other days where you don't want to render cells for 'hs130' and 'hs150'
                        // return null
                      }
                    })}
                  </tr>
                )
              })}

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

export default TimeSheetTable
