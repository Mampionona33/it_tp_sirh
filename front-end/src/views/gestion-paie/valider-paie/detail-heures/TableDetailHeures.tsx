import React from 'react'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { fuzzyFilter } from '@src/components/ReusableTable/fuzzyFunctions'

interface ITableDetailHeuresProps<T extends object> {
  data: T[]
  columns: ColumnDef<T, any>[]
}

const TableDetailHeures = <T extends object>({ data, columns }: ITableDetailHeuresProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  })

  const totalColumns = table.getHeaderGroups().reduce((acc, headerGroup) => {
    return acc + headerGroup.headers.length
  }, 0)

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-customRed-900">
                  {table.getHeaderGroups().map((headerGroupe) => (
                    <tr key={headerGroupe.id}>
                      {headerGroupe.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row, index) => {
                      return (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td className="text-center font-medium py-2 border" colSpan={totalColumns}>
                        Aucune donnée trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableDetailHeures
