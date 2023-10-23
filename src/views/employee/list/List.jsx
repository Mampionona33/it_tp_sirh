import React from 'react'
// import DataTable from '../../../components/DataTable'
import DataTable from 'src/components/DataTable'
import { CRow, CCol, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import { createColumnHelper } from '@tanstack/react-table'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import employesData from './employesData.json'

const List = () => {
  const employes = employesData
  const columnHelper = createColumnHelper()

  const modalImportCsvField = [
    {
      type: 'file',
      placeholder: 'employess data',
      required: true,
      accept: '.csv',
    },
  ]

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('matricule', {
        cell: (info) => {
          return (
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="matricule"
                checked={info.row.getIsSelected()}
                onChange={info.row.getToggleSelectedHandler()}
              />
              <label htmlFor="matricule">{info.getValue()}</label>
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
              <label htmlFor="matriculeHead">Matricule</label>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('name', {
        cell: (info) => {
          const { lastname, firstname } = info.getValue()
          return `${lastname} ${firstname}`
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
      columnHelper.accessor('matricule', {
        header: () => 'action',
        cell: (info) => (
          <div>
            <CDropdown variant="btn-group" direction="center">
              <CDropdownToggle className="bg-transparent border-0 text-dark rounded-circle">
                <CIcon size="sm" icon={cilOptions} title="more options" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href={`/employee/modifier/${info.row.id}`}>Modifier</CDropdownItem>
                <CDropdownItem href={`/employee/supprimer/${info.row.id}`}>Supprimer</CDropdownItem>
                <CDropdownItem href={`/employee/details/${info.row.id}`}>
                  Fiche employé
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
          colorButtonShowModalImport="success"
          modalImportCsvField={modalImportCsvField}
        />
      </CCol>
    </CRow>
  )
}

export default List
