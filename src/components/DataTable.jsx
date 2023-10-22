import React, { useEffect, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { CCard, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilChevronLeft,
  cilChevronRight,
  cilChevronDoubleRight,
  cilChevronDoubleLeft,
} from '@coreui/icons'
import PropTypes from 'prop-types'
import { Table, Button } from 'react-bootstrap'
import { DebounceInput } from 'react-debounce-input'

function DataTable({ title, data, columns, exportCsvBtn, importCsvBtn }) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, rowSelection },
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
    <CCard className="">
      <div className="d-flex flex-wrap bd-highlight mb-3 gap-1 p-2">
        <h5 className="card-title me-auto p-2 bd-highlight">{title}</h5>
        <DebounceInput
          value={globalFilter || ''}
          onChange={(e) => {
            const value = e.target.value
            setGlobalFilter(String(value))
          }}
          className="flex p-2 shadow-sm rounded border border-block"
          placeholder="Search all columns..."
        />
        {importCsvBtn ? (
          <Button className="p-2 bd-highlight" variant="success" size="sm">
            Import CSV
          </Button>
        ) : null}
        {exportCsvBtn ? (
          <Button className="p-2 bd-highlight" variant="info" size="sm">
            Export CSV
          </Button>
        ) : null}
      </div>

      <div>
        <Table responsive striped bordered hover>
          <thead className="table-dark">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="capitalize" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header(header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{cell.column.columnDef.cell(cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="flex justify-center p-2">
          <div className="flex flex-wrap items-center gap-2">
            <CButton
              size="sm"
              color="secondary"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <CIcon size="sm" icon={cilChevronDoubleLeft} title="Download file" />
            </CButton>

            <CButton
              size="sm"
              color="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <CIcon size="sm" icon={cilChevronLeft} title="Download file" />
            </CButton>

            <CButton
              size="sm"
              color="secondary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <CIcon size="sm" icon={cilChevronRight} title="Download file" />
            </CButton>

            <CButton
              size="sm"
              color="secondary"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <CIcon size="sm" icon={cilChevronDoubleRight} title="Download file" />
            </CButton>
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
      </div>
    </CCard>
  )
}

DataTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  exportCsvBtn: PropTypes.bool,
  importCsvBtn: PropTypes.bool,
}

DataTable.defaultProp = {
  exportCsvBtn: false,
  importCsvBtn: false,
}

export default DataTable
