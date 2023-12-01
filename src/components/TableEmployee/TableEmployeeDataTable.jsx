import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllEmployees } from 'src/redux/employees/employeesAction'
import CustomPagination from '../CustomPagination'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import PropTypes from 'prop-types'
import MoreButtonMenu from '../MoreButtonMenu'
import { DebounceInput } from 'react-debounce-input'
import CustomModal from '../CustomModal'
import FormInfoGalEmployee from '../FormInfoGalEmployee'
import EmployeeService from 'src/services/EmployeeService'

const TableEmployeeDataTable = ({ data }) => {
  const dispatch = useDispatch()
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const pageSizeOptions = [5, 10, 15, 20, 25, 30]
  const employeeService = EmployeeService

  // recuperation list employé
  useEffect(() => {
    let mount = true
    if (mount) {
      dispatch(fetchAllEmployees())
    }

    return () => (mount = false)
  }, [dispatch])

  const columnHelper = createColumnHelper()

  const columns = useMemo(
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
      columnHelper.accessor('fullName', {
        // Utilisez un nom de colonne unique
        cell: (info) => info.getValue(),
        header: () => 'Nom et Prénom',
      }),
      columnHelper.accessor('cin', {
        cell: (info) => info.getValue(),
        header: () => 'cin',
      }),
      columnHelper.accessor('adresse', {
        cell: (info) => info.getValue(),
        header: () => 'adresse',
      }),
      columnHelper.accessor('dateEmbauche', {
        cell: (info) => info.getValue(),
        header: () => "date d'ambauche",
      }),
      columnHelper.accessor('numCnaps', {
        cell: (info) => info.getValue(),
        header: () => 'N° de sécurité sociale',
      }),
      columnHelper.accessor('poste', {
        cell: (info) => info.getValue(),
        header: () => 'Fonction',
      }),
      columnHelper.accessor('cadre', {
        cell: (info) => info.getValue(),
        header: () => 'cadre',
      }),
      columnHelper.accessor('id', {
        header: () => 'action',
        cell: (info) => (
          <div className="flex">
            <MoreButtonMenu
              items={[
                // { path: `/employee/modifier/${info.getValue()}`, label: 'Modifier' },
                // { path: `/employee/supprimer/${info.getValue()}`, label: 'Supprimer' },
                { path: `/employees/fiche/${info.getValue()}`, label: 'Fiche employé' },
              ]}
            />
          </div>
        ),
      }),
    ],
    [columnHelper],
  )

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
    debugTable: false,
  })

  const headerGroups = table.getHeaderGroups()
  const rows = table.getRowModel().rows

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

  const handleAddEmployee = async (data) => {
    const nom = data.target.nom.value
    const prenom = data.target.prenom.value
    const cin = data.target.cin.value
    const adresse = data.target.adresse.value
    const dateEmbauche = data.target.dateEmbauche.value
    const numCnaps = data.target.numCnaps.value
    const poste = data.target.poste.value
    const cadre = data.target.cadre.value
    const matricule = data.target.matricule.value
    const sexe = data.target.sexe.value
    const email = data.target.email.value
    const cat = data.target.cat.value
    const enfant = data.target.enfant.value
    const salaireBase = data.target.salaireBase.value
    const telephone = data.target.telephone.value
    const travDeNuit = data.target.travDeNuit.value

    try {
      const res = await employeeService.addEmployee({
        nom: nom,
        prenom: prenom,
        cin: cin,
        adresse: adresse,
        dateEmbauche: dateEmbauche,
        numCnaps: numCnaps,
        poste: poste,
        cadre: cadre,
        email: email,
        matricule: matricule,
        sexe: sexe,
        cat: cat,
        enfant: enfant,
        salaireBase: salaireBase,
        telephone: telephone,
        travDeNuit: travDeNuit,
        status: 'active',
      })
      dispatch(fetchAllEmployees())
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <div className="flex flex-row flex-wrap w-full bg-customRed-900 gap-4 px-4 py-2 text-white">
        <div className="flex-grow">
          <h5 className="text-2xl font-semibold mb-2">Liste employée</h5>
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
          <CustomModal
            iconBtnActivation={'add'}
            totltipText="Ajouter employé"
            modalTitle="Ajouter employé"
            handleSubMission={(data) => handleAddEmployee(data)}
          >
            <FormInfoGalEmployee />
          </CustomModal>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full table-auto ">
          <thead className="text-sm uppercase text-gray-700 dark:text-gray-400 bg-stone-200">
            {headerGroups.length > 0 &&
              headerGroups.map((headerGroup, key) => (
                <tr key={`headerRow_${key}`}>
                  {headerGroup.headers.map((header, headerIndex) => (
                    <th
                      scope="col"
                      className="px-6 py-3"
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
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={`row_${rowIndex}`}
                  className={`border-y border-customRed-100 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td key={`cell_${rowIndex}_${cellIndex}`} className="px-6 py-2 text-sm">
                      {cell.column.columnDef.cell(cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-lg font-medium p-4">
                  Aucune donnée trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-100 overflow-auto py-2 px-4 w-full">
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
    </>
  )
}

TableEmployeeDataTable.propTypes = {
  data: PropTypes.array,
}

export default TableEmployeeDataTable
