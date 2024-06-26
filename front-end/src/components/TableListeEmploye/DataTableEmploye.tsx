import React, { useMemo } from 'react'
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { IDataTableEmploye, IDataWithActions } from './interfaceDataTableEmploy'

import { DebounceInput } from 'react-debounce-input'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import { fuzzyFilter } from '../ReusableTable/fuzzyFunctions'

interface ActionComponentProps {
  rowId: any
}
// test
const DataTableEmploye: React.FC<IDataTableEmploye> = ({ data, tableTitle, headerComponents }) => {
  const columnHelper = createColumnHelper<IDataWithActions>()
  const [globalFilter, setGlobalFilter] = React.useState('')

  const columns = useMemo<ColumnDef<IDataWithActions, any>[]>(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => {
          const cellValue = info.getValue() as string
          return (
            <div className="px-3 py-1 justify-center flex gap-2">
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
      columnHelper.accessor('actions', {
        cell: (info) => {
          const actionOriginal: any = info.row.original
          const actions = actionOriginal.actions ? actionOriginal.actions : []

          return (
            <div>
              {actions.map((ActionComponent: React.FC<ActionComponentProps>, index: number) => (
                <ActionComponent key={`action_${index}`} rowId={(info.row as any).original.id} />
              ))}
            </div>
          )
        },
        header: () => 'Actions',
      }),
    ],
    [columnHelper],
  )

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  })

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows

  return (
    <>
      {tableTitle && (
        <div className="w-full my-2">
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-3">
            <div className="flex gap-3 justify-start items-start w-full">
              <div>
                <h1 className="text-lg px-0">{tableTitle}</h1>
              </div>
              <div>
                <DebounceInput
                  value={globalFilter || ''}
                  onChange={(e) => {
                    const value = e.target.value
                    setGlobalFilter(String(value))
                  }}
                  className="p-1 h-9 sm:w-full w-[63vw] "
                  placeholder="Rechercher"
                />
              </div>
            </div>
            <div className="flex justify-end items-start flex-wrap">{headerComponents}</div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="w-full table-auto ">
          <thead className="text-sm uppercase  bg-customRed-200">
            {headerGroups.length > 0 &&
              headerGroups.map((headerGroup, key) => (
                <React.Fragment key={`headerGroup_${key}`}>
                  <tr key={`headerRow_${key}`}>
                    {headerGroup.headers.map((header, headerIndex) => {
                      if (header.id.toLowerCase() === 'actions') return ''

                      return (
                        <React.Fragment key={`header_${header.id}_${headerIndex}`}>
                          {header.column.id !== 'Actions' && (
                            <th
                              scope="col"
                              className="px-3 py-2 text-white"
                              key={`header_${header.id}_${headerIndex}`}
                            >
                              {header.isPlaceholder
                                ? null
                                : typeof header.column.columnDef.header === 'function'
                                ? header.column.columnDef.header(header.getContext())
                                : null}
                            </th>
                          )}
                        </React.Fragment>
                      )
                    })}
                    {rows.length > 0 && (rows[0] as any).original.actions && (
                      <th scope="col" className="px-3 py-2 text-white">
                        Actions
                      </th>
                    )}
                  </tr>
                </React.Fragment>
              ))}
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={`row_${rowIndex}`}
                  className={`border-y border-customRed-100 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                  }`}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    if (cell.getContext().column.id === 'actions' && !cell.getValue()) return null

                    return (
                      <td key={`cell_${rowIndex}_${cellIndex}`} className="px-3 py-1 text-sm">
                        {typeof cell.column.columnDef.cell === 'function'
                          ? cell.column.columnDef.cell(cell.getContext())
                          : cell.column.columnDef.cell}
                      </td>
                    )
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headerGroups[0].headers.length}
                  className="text-lg font-normal px-4 py-2 bg-white"
                >
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
