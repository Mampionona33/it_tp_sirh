import React, { useMemo } from 'react'
// import { Root as IEmploye } from '@src/interfaces/interfaceEmploye'
import { Root as IEmploye } from '@interfaces/interfaceEmploye'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import CustomPagination from '../CustomPagination'

interface DataTableEmployeProps {
  data: IEmploye[]
}

const DataTableEmploye: React.FC<DataTableEmployeProps> = ({ data }) => {
  const columnHelper = createColumnHelper()
  const pageSizeOptions = [5, 10, 15, 20, 25, 30]

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => {
          const cellValue = info.getValue() as string
          return (
            <div className="px-6 py-3 justify-center flex gap-2">
              <input
                type="checkbox"
                name="id"
                checked={info.row.getIsSelected()}
                onChange={info.row.getToggleSelectedHandler()}
              />
              <label className="visually-hidden" htmlFor="id">
                {cellValue}
              </label>
            </div>
          )
        },

        header: ({ table }) => (
          <div>
            <div className="flex gap-2 justify-center">
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
        header: () => 'Matricule',
      }),
      columnHelper.accessor('fullName', {
        cell: (info) => info.getValue(),
        header: () => 'Nom et prénom',
      }),
      columnHelper.accessor('titre_poste', {
        cell: (info) => info.getValue(),
        header: () => 'Fonction',
      }),
    ],
    [columnHelper],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="w-full table-auto ">
          <thead className="text-sm uppercase text-gray-700 dark:text-gray-400 bg-stone-200">
            {headerGroups.length > 0 &&
              headerGroups.map((headerGroup, key) => (
                <tr key={`headerRow_${key}`}>
                  {headerGroup.headers.map((header, headerIndex) => (
                    <th
                      scope="col"
                      className="px-6 py-3"
                      key={`header_${header.id}_${headerIndex}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : typeof header.column.columnDef.header === 'function'
                        ? header.column.columnDef.header(header.getContext())
                        : null}
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
                      {typeof cell.column.columnDef.cell === 'function'
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.column.columnDef.cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-lg font-medium p-4">
                  Aucune donnée trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default DataTableEmploye
