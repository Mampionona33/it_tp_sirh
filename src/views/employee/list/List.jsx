import React, { useState } from 'react'
import DataTable from 'src/components/DataTable/DataTable'
import { CRow, CCol } from '@coreui/react'
import { createColumnHelper } from '@tanstack/react-table'
// import { employees } from 'src/db/db'
import MoreButtonMenu from 'src/components/MoreButtonMenu'
import EmployeeService from 'src/services/EmployeeService'

const List = () => {
  const columnHelper = createColumnHelper()
  const [employees, setEmployees] = useState([])

  const modalImportCsvField = [
    {
      type: 'file',
      placeholder: "Importer une liste d'employées.",
      required: true,
      accept: '.csv',
    },
  ]

  React.useEffect(() => {
    let mount = true
    if (mount) {
      EmployeeService.getAll()
        .then((resp) => setEmployees(resp.data))
        .catch((err) => console.log(err))
    }
    return () => {
      mount = false
    }
  }, [])

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
              <label className="visually-hidden" htmlFor="id">
                {info.getValue()}
              </label>
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
          const nom = info.row.original.nom
          const prenom = info.row.original.prenom
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
            <MoreButtonMenu
              items={[
                { path: `/employee/modifier/${info.getValue()}`, label: 'Modifier' },
                { path: `/employee/supprimer/${info.getValue()}`, label: 'Supprimer' },
                { path: `/employees/fiche/${info.getValue()}`, label: 'Fiche employé' },
              ]}
            />
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
          title="Liste employés"
          data={employees}
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
