import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllEmployees } from 'src/redux/employees/employeesAction'
import CustomPagination from '../CustomPagination'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import MoreButtonMenu from '../MoreButtonMenu'

const TableEmployeeDataTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.employeesList.list)

  // recuperation list employé
  useEffect(() => {
    let mount = true
    if (mount) {
      dispatch(fetchAllEmployees())
    }
    return () => (mount = false)
  }, [dispatch])

  const pageSizeOptions = [5, 10, 15, 20, 25, 30]
  const columnHelper = createColumnHelper()
  console.log(data)

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => {
          return (
            <div className="px-6 py-3 flex gap-2">
              <input
                type="checkbox"
                name="id"
                checked={info.row.getIsSelected()}
                onChange={info.row.getToggleSelectedHandler()}
              />
              <label className="visually-hidden" htmlFor="id">
                {info.getValue()}
              </label>
            </div>
          )
        },

        header: ({ table }) => (
          <div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="matriculeHead"
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
              />
              <label className="visually-hidden" htmlFor="matriculeHead">
                id
              </label>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('matricule', {
        cell: (info) => info.getValue(),
        header: () => 'matricule',
      }),
      columnHelper.accessor('name', {
        cell: (info) => {
          const nom = info.row.original.nom
          const prenom = info.row.original.prenom
          return `${prenom} ${nom}`
        },
        header: () => 'Nom et Prénom',
      }),
      columnHelper.accessor('cin', {
        cell: (info) => info.getValue(),
        header: () => 'cin',
      }),
      columnHelper.accessor('adresse', {
        cell: (info) => info.getValue(),
        header: () => 'adresse',
      }),
      columnHelper.accessor('dateEmbauche', {
        cell: (info) => format(new Date(info.getValue()), 'dd MMM yyyy'),
        header: () => "date d'ambauche",
      }),
      columnHelper.accessor('numCnaps', {
        cell: (info) => info.getValue(),
        header: () => 'N° de sécurité sociale',
      }),
      columnHelper.accessor('poste', {
        cell: (info) => info.getValue(),
        header: () => 'Fonction',
      }),
      columnHelper.accessor('cadre', {
        cell: (info) => (info.getValue() ? 'Oui' : ''),
        header: () => 'cadre',
      }),
      columnHelper.accessor('id', {
        header: () => 'action',
        cell: (info) => (
          <div className="flex">
            <MoreButtonMenu
              items={[
                // { path: `/employee/modifier/${info.getValue()}`, label: 'Modifier' },
                // { path: `/employee/supprimer/${info.getValue()}`, label: 'Supprimer' },
                { path: `/employees/fiche/${info.getValue()}`, label: 'Fiche employé' },
              ]}
            />
          </div>
        ),
      }),
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto ">
        <thead className="text-sm uppercase text-gray-700 dark:text-gray-400 bg-stone-200">
          {headerGroups.length > 0 &&
            headerGroups.map((headerGroup, key) => (
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
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr
                key={`row_${rowIndex}`}
                className={`border-y border-customRed-100 ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td key={`cell_${rowIndex}_${cellIndex}`} className="px-6 py-2 text-sm">
                    {cell.column.columnDef.cell(cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
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
  )
}

export default TableEmployeeDataTable
