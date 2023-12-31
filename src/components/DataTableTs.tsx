import React, { useEffect, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import {
  CCard,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilChevronLeft,
  cilChevronRight,
  cilChevronDoubleRight,
  cilChevronDoubleLeft,
} from '@coreui/icons'
// import PropTypes from 'prop-types'
import { Table, Button } from 'react-bootstrap'
import { DebounceInput } from 'react-debounce-input'

type DataTableProps = {
  title?: string
  data: any[]
  columns: any[]
  exportCsvBtn: boolean
  importCsvBtn: boolean
  onRowSelect?: (selectedRows: any) => void
  selectedRows: any[]
  modalExportCsvFields: TableModalFieldType[]
}

const DataTableTs: React.FC<DataTableProps> = ({
  title,
  data,
  columns,
  exportCsvBtn,
  importCsvBtn,
  onRowSelect,
  selectedRows,
  modalExportCsvFields,
}) => {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [rowSelection, setRowSelection] = useState<any>({})

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
    debugTable: true,
  })

  useEffect(() => {
    table.setState((prev: any) => ({
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
        {exportCsvBtn && modalExportCsvFields ? (
          <>
            <TableModal
              title="Export CSV"
              labelButtonShow="Export CSV"
              fields={modalExportCsvFields}
            />
          </>
        ) : null}
      </div>

      <div>
        <Table responsive striped bordered hover>
          <thead className="table-dark">
            {headerGroups.map((headerGroup, key) => (
              <tr key={`headerRow_${key}`}>
                {headerGroup.headers.map((header, headerIndex) => (
                  <th className="capitalize" key={`header_${header.id}_${headerIndex}`}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header(header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`row_${rowIndex}`}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td key={`cell_${rowIndex}_${cellIndex}`}>
                    {cell.column.columnDef.cell(cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
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

interface TableModalFieldType {
  type: string
  placeholder?: string
  required?: boolean
  accept?: string
}

type TableModalProps = {
  title: string
  body: string
  labelButtonShow: string
  variantButtonShow: string
  fields: TableModalFieldType[]
  handleSubmit: () => void
  dispatch: any
  initialValues: any[]
}

const TableModal: React.FC<TableModalProps> = ({
  title,
  body,
  labelButtonShow,
  variantButtonShow,
  fields,
  handleSubmit,
  dispatch,
  initialValues,
}) => {
  const [visible, setVisible] = useState(false)
  const [formValidate, setFormValidate] = useState(false)

  const handleSubmitModal = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    for (let index = 0; index < form.length; index++) {
      const element = form[index]
      if (element.tagName === 'INPUT') {
        console.log((element as HTMLInputElement).value)
      }
      if (element.tagName === 'SELECT') {
      }
    }

    // setFormValidate(true)
  }

  return (
    <>
      <CButton size="sm" onClick={() => setVisible(!visible)} variant={variantButtonShow}>
        {labelButtonShow}
      </CButton>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ScrollingLongContentExampleLabel"
      >
        <CForm validated={formValidate} onSubmit={handleSubmitModal}>
          <CModalHeader closeButton>
            <CModalTitle>{title}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {body ? body : null}
            {fields && fields.length > 0 ? (
              <div className="row">
                {fields.map((item, key) => (
                  <div className="col-md-6 " key={key}>
                    <label htmlFor={item.id} className="visually-hidden">
                      {item.placeholder}
                    </label>
                    {(() => {
                      switch (item.type) {
                        case 'text':
                        case 'password':
                        case 'email':
                        case 'file':
                          return (
                            <CFormInput
                              type={item.type}
                              className="form-control"
                              id={item.id}
                              placeholder={item.placeholder}
                              required={item.required}
                              label={item?.label}
                              accept={item?.accept}
                            />
                          )

                        default:
                          return null
                      }
                    })()}
                  </div>
                ))}
              </div>
            ) : null}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Annuler
            </CButton>
            <CButton type="submit">Valider</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default DataTableTs
