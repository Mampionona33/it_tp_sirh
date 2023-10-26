import React, { useEffect, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import ButtonExportCsv from 'src/components/ButtonExportCsv'
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
import PropTypes from 'prop-types'
import { Table, Button } from 'react-bootstrap'
import { DebounceInput } from 'react-debounce-input'

function DataTable({
  title,
  data,
  columns,
  exportCsvBtn,
  importCsvBtn,
  onRowSelect,
  selectedRows,
  modalImportCsvField,
  modalAddFields,
  colorButtonShowModalImport,
  colorButtonShowModalAdd,
}) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = React.useState({})

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
    <CCard className="rounded-0 border-none">
      {/* Table Header */}
      <div className="d-flex text-white flex-wrap bg-indigo-900 mb-2 pt-2 pb-2 px-4 gap-4 ">
        <h5 className="card-title me-auto p-2 bd-highlight">{title}</h5>
        <DebounceInput
          value={globalFilter || ''}
          onChange={(e) => {
            const value = e.target.value
            setGlobalFilter(String(value))
          }}
          className="flex p-2 text-black  border border-block"
          placeholder="Rechercher"
        />
        {modalAddFields && modalAddFields.length > 0 ? (
          <>
            <TableModal
              title="Ajouter"
              iconButtonShow="add"
              // labelButtonShow="Ajouter"
              // colorBgButtonShow={'red-600'}
              fields={modalAddFields}
              colorButtonShowModalImport={colorButtonShowModalAdd && colorButtonShowModalAdd}
            />
          </>
        ) : null}
        {importCsvBtn ? (
          <>
            <TableModal
              iconButtonShow="save"
              title="Import CSV"
              // labelButtonShow="Import CSV"
              fields={modalImportCsvField}
              // colorBgButtonShow={'red-600'}
              colorButtonShowModalImport={colorButtonShowModalImport && colorButtonShowModalImport}
            />
          </>
        ) : null}
        {exportCsvBtn ? (
          <>
            {/* <ButtonExportCsv /> */}
            <TableModal
              title="Export CSV"
              // labelButtonShow="Export CSV"
              iconButtonShow="download"
              // colorBgButtonShow={'red-600'}
              // fields={modalExportCsvFields}
            />
          </>
        ) : null}
      </div>
      {/* table */}
      <div className="flex overflow-auto flex-col">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            {headerGroups.map((headerGroup, key) => (
              <tr key={`headerRow_${key}`}>
                {headerGroup.headers.map((header, headerIndex) => (
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    key={`header_${header.id}_${headerIndex}`}
                  >
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
              <tr className="border-b border-gray-200 dark:border-gray-700" key={`row_${rowIndex}`}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td key={`cell_${rowIndex}_${cellIndex}`}>
                    {cell.column.columnDef.cell(cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center p-2 mt-2">
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

const TableModal = ({
  title,
  body,
  labelButtonShow,
  colorButtonShowModalImport,
  fields,
  handleSubmit,
  dispatch,
  initialValues,
  colorBgButtonShow,
  iconButtonShow,
}) => {
  const [visible, setVisible] = useState(false)
  const [formValidate, setFormValidate] = useState(false)

  const handleSubmitModal = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    for (let index = 0; index < form.length; index++) {
      const element = form[index]
      if (element.tagName === 'INPUT') {
        console.log(element.value)
      }
      if (element.tagName === 'SELECT') {
      }
    }

    // setFormValidate(true)
  }

  return (
    <>
      <button
        className={`flex items-center justify-center font-medium text-${colorBgButtonShow} border-transparent hover:border-b hover:border-${colorBgButtonShow}`}
        onClick={() => setVisible(!visible)}
      >
        <span className="material-icons-outlined">{iconButtonShow}</span>
        {labelButtonShow}
      </button>

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

export const tableModalAllowedFields = [
  'input',
  'select',
  'file',
  'password',
  'text',
  'email',
  'date',
  'number',
  'checkbox',
  'radio',
  'submit',
  'reset',
  'button',
  'hidden',
  'select',
  'optgroup',
  'time',
  'month',
]

const TableModalFieldType = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.oneOf(tableModalAllowedFields).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  accept: PropTypes.string,
  label: PropTypes.string,
})

TableModalFieldType.defaultProps = {
  required: false,
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

TableModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  labelButtonShow: PropTypes.string,
  colorBgButtonShow: PropTypes.string,
  colorButtonShowModalImport: PropTypes.string,
  fields: PropTypes.arrayOf(TableModalFieldType),
  handleSubmit: PropTypes.func,
  dispatch: PropTypes.any,
  initialValues: PropTypes.array,
  iconButtonShow: PropTypes.string,
}

export default DataTable
