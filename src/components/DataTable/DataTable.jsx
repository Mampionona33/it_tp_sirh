import React, { useEffect, useState } from 'react'
import CustomPagination from 'src/components/CustomPagination'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import PropTypes from 'prop-types'
import { DebounceInput } from 'react-debounce-input'
import TableModal from './TableModal'

function DataTable({
  title,
  data,
  columns,
  exportCsvBtn,
  importCsvBtn,
  modalImportCsvField,
  modalAddFields,
  colorButtonShowModalImport,
  colorButtonShowModalAdd,
}) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = React.useState({})
  const pageSizeOptions = [5, 10, 15, 20, 25, 30]

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, rowSelection },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: false,
  })

  useEffect(() => {
    table.setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageIndex: 0,
        pageSize: 5,
      },
    }))
  }, [table])

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows

  return (
    <div className="border shadow-sm overflow-hidden">
      <div className="flex flex-row flex-wrap bg-customRed-900 gap-4 px-4 py-2 text-white">
        <div className="flex-grow">
          <h5 className="text-2xl font-semibold mb-2">{title}</h5>
        </div>
        <div className="flex-grow-0 flex-shrink-0 flex">
          <DebounceInput
            value={globalFilter || ''}
            onChange={(e) => {
              const value = e.target.value
              setGlobalFilter(String(value))
            }}
            className="p-2 text-black "
            placeholder="Rechercher"
          />
        </div>
        <div className="flex-grow-0 flex-shrink-0 ml-auto flex gap-2">
          {modalAddFields && modalAddFields.length > 0 ? (
            <>
              <TableModal
                title="Ajouter"
                toolTip="Ajouter une ligne"
                iconButtonShow="add"
                fields={modalAddFields}
                colorButtonShowModalImport={colorButtonShowModalAdd && colorButtonShowModalAdd}
              />
            </>
          ) : null}
          {importCsvBtn ? (
            <>
              <TableModal
                iconButtonShow="download"
                toolTip="Importer"
                title="Import CSV"
                fields={modalImportCsvField}
                colorButtonShowModalImport={
                  colorButtonShowModalImport && colorButtonShowModalImport
                }
              />
            </>
          ) : null}
          {exportCsvBtn ? (
            <>
              <TableModal title="Export CSV" iconButtonShow="save" toolTip="Enregistrer" />
            </>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white text-gray-800 dark:text-gray-400">
          <thead className="text-sm uppercase text-gray-700 dark:text-gray-400 bg-stone-200">
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
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={`row_${rowIndex}`}
                  className={`border-y border-customRed-100 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td key={`cell_${rowIndex}_${cellIndex}`} className="px-6 py-2">
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
  )
}

DataTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  exportCsvBtn: PropTypes.bool,
  importCsvBtn: PropTypes.bool,
  selectedRows: PropTypes.array,
  onRowSelect: PropTypes.func,
  modalAddFields: PropTypes.array,
  modalImportCsvField: PropTypes.array,
  colorButtonShowModalImport: PropTypes.string,
  colorButtonShowModalAdd: PropTypes.string,
}

DataTable.defaultProps = {
  exportCsvBtn: false,
  importCsvBtn: false,
}

export default DataTable
