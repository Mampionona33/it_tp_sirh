import React, { useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { CCard } from '@coreui/react'
import PropTypes from 'prop-types'
import { Table, Button } from 'react-bootstrap'

const DataTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  useEffect(() => {
    table.setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageIndex: 0, // Index initial de la page
        pageSize: 5, // Taille de la page initiale
      },
    }))
  }, [table])

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows

  return (
    <CCard className="p-5">
      <div>
        <Table responsive striped bordered hover>
          <thead className="table-dark">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="capitalize" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="h-2" />
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </Button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[5, 6, 7, 8, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <div>{table.getRowModel().rows.length} Rows</div> */}
        {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
      </div>
    </CCard>
  )
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
}

export default DataTable
