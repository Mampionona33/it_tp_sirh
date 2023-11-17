import React from 'react'
import DataTable from 'src/components/DataTable/DataTable'
import { CRow, CCol } from '@coreui/react'
import { createColumnHelper } from '@tanstack/react-table'
import MoreButtonMenu from 'src/components/MoreButtonMenu'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllEmployees } from 'src/redux/employees/employeesAction'
import { resetBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'

const List = () => {
  const dispatch = useDispatch()
  const columnHelper = createColumnHelper()
  const employees = useSelector((state) => state.employeesList.list)

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
    if (mount && dispatch) {
      dispatch(fetchAllEmployees())
      dispatch(resetBulletinDePaie())
    }
    return () => {
      mount = false
    }
  }, [dispatch])

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
      columnHelper.accessor('poste', {
        cell: (info) => info.getValue(),
        header: () => 'poste',
      }),
      columnHelper.accessor('telephone', {
        cell: (info) => info.getValue(),
        header: () => 'telephone',
      }),
      columnHelper.accessor('cadre', {
        cell: (info) => (info.getValue() ? 'Oui' : ''),
        header: () => 'cadre',
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
          data={employees ? employees : []}
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
