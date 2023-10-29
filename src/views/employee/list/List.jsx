import React from 'react'
// import DataTable from '../../../components/DataTable'
import DataTable from 'src/components/DataTable/DataTable'
import { CRow, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import { createColumnHelper } from '@tanstack/react-table'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import { Link } from 'react-router-dom'
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'

import { employees } from 'src/db/db'
import MoreButtonMenu from 'src/components/MoreButtonMenu'

const List = () => {
  const employes = employees
  const columnHelper = createColumnHelper()

  const modalImportCsvField = [
    {
      type: 'file',
      placeholder: "Importer une liste d'employées.",
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
            <div className="px-6 py-3 flex gap-2">
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
          <div className="flex">
            <MoreButtonMenu />
            <CDropdown>
              <CDropdownToggle
                aria-expanded="false"
                className="flex bg-transparent border-0 text-dark clear-right rounded-circle "
              >
                {/* <CIcon size="sm" icon={cilOptions} title="more options" /> */}
                <EllipsisVerticalIcon className="w-5 h-5 clear-right" />
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
