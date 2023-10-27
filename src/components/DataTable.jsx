import React, { useEffect, useState } from 'react'
import CustomPagination from 'src/components/CustomPagination'
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
  CTooltip,
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
    <div className="border shadow-sm overflow-hidden">
      <div className="flex flex-row flex-wrap bg-indigo-900 gap-4 px-4 py-2 text-white">
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
              <TableModal title="Export CSV" iconButtonShow="save" />
            </>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white text-gray-800 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 bg-gray-100">
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
            {rows.map((row, rowIndex) => (
              <tr key={`row_${rowIndex}`}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td key={`cell_${rowIndex}_${cellIndex}`} className="px-6 py-2">
                    {cell.column.columnDef.cell(cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
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
  toolTip,
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
      <div className="p-10">
        <div className="group relative w-max">
          <button
            className={`flex items-center justify-center font-medium text-${colorBgButtonShow} border-transparent hover:border-b hover:border-${colorBgButtonShow}`}
            onClick={() => setVisible(!visible)}
          >
            <span className="material-icons-outlined">{iconButtonShow}</span>
            {labelButtonShow}
          </button>
          {toolTip ? (
            <span className="pointer-events-none absolute -top-7 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100">
              This is a button.
            </span>
          ) : null}
        </div>
      </div>

      {/* {toolTip ? (
        <CTooltip content={toolTip} placement="top">
          <button
            className={`flex items-center justify-center font-medium text-${colorBgButtonShow} border-transparent hover:border-b hover:border-${colorBgButtonShow}`}
            onClick={() => setVisible(!visible)}
          >
            <span className="material-icons-outlined">{iconButtonShow}</span>
            {labelButtonShow}
          </button>
        </CTooltip>
      ) : (
        <button
          className={`flex items-center justify-center font-medium text-${colorBgButtonShow} border-transparent hover:border-b hover:border-${colorBgButtonShow}`}
          onClick={() => setVisible(!visible)}
        >
          <span className="material-icons-outlined">{iconButtonShow}</span>
          {labelButtonShow}
        </button>
      )} */}

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
                  <div className="col-sm " key={key}>
                    <label htmlFor={item.id} className="">
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
  toolTip: PropTypes.string,
}

export default DataTable
