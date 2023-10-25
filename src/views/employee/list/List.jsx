import React from 'react'
// import DataTable from '../../../components/DataTable'
import DataTable from 'src/components/DataTable'
import { CRow, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import { createColumnHelper } from '@tanstack/react-table'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import { Link } from 'react-router-dom'

import { employees } from 'src/db/db'

const List = () => {
  const employes = employees
  const columnHelper = createColumnHelper()

  const modalImportCsvField = [
    {
      type: 'file',
      placeholder: 'employess data',
      required: true,
      accept: '.csv',
    },
  ]

  const modalAddFields = [
    {
      type: 'text',
      placeholder: 'Nom',
    },
  ]

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => {
          return (
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="id"
                checked={info.row.getIsSelected()}
                onChange={info.row.getToggleSelectedHandler()}
              />
              <label htmlFor="id">{info.getValue()}</label>
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
          const { prenom, nom } = info.getValue()
          return `${prenom} ${nom}`
        },
        header: () => 'Nom et Prénom',
      }),
      columnHelper.accessor('cin', {
        cell: (info) => info.getValue(),
        header: () => 'cin',
      }),
      columnHelper.accessor('email', {
        cell: (info) => info.getValue(),
        header: () => 'email',
      }),
      columnHelper.accessor('post', {
        cell: (info) => info.getValue(),
        header: () => 'post',
      }),
      columnHelper.accessor('telephone', {
        cell: (info) => info.getValue(),
        header: () => 'telephone',
      }),
      columnHelper.accessor('manager', {
        cell: (info) => info.getValue(),
        header: () => 'manager',
      }),
      columnHelper.accessor('id', {
        header: () => 'action',
        cell: (info) => (
          <div>
            <CDropdown variant="btn-group" direction="center" className="">
              <CDropdownToggle className="bg-transparent border-0 text-dark rounded-circle">
                <CIcon size="sm" icon={cilOptions} title="more options" />
              </CDropdownToggle>
              <CDropdownMenu className="rounded-0">
                <CDropdownItem component="button">
                  <Link
                    to={`/employee/modifier/${info.getValue()}`}
                    className="btn btn-link text-decoration-none text-reset"
                  >
                    Modifier
                  </Link>
                </CDropdownItem>
                <CDropdownItem component="button">
                  <Link
                    to={`/employee/supprimer/${info.getValue()}`}
                    className="btn btn-link text-decoration-none text-reset"
                  >
                    Supprimer
                  </Link>
                </CDropdownItem>
                <CDropdownItem component="button">
                  <Link
                    to={`/employee/fiche/${info.getValue()}`}
                    className="btn btn-link text-decoration-none text-reset"
                  >
                    Fiche employé
                  </Link>
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        ),
      }),
    ],
    [columnHelper],
  )

  return (
    <CRow>
      <CCol xs={12}>
        <DataTable
          title="List employés"
          data={employes}
          columns={columns}
          exportCsvBtn
          importCsvBtn
          modalAddFields={modalAddFields}
          colorButtonShowModalImport="success"
          modalImportCsvField={modalImportCsvField}
        />
      </CCol>
    </CRow>
  )
}

export default List
