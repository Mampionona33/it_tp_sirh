import React, { useMemo } from 'react'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import ButtonLink from '@src/components/buttons/ButtonLink'
import ReusableTable from '@src/components/ReusableTable/ReusableTable'

const GestionPaie: React.FC = () => {
  const listeEmploye = useAppSelector((store) => store.employeesList.list)
  const actifEmployes = listeEmploye.filter(
    (employe: IEmploye) => employe.actif === EnumBoolean.OUI,
  )
  //   formatage des colonnes
  const columnHelper = createColumnHelper<IEmploye>()

  const cols = useMemo<ColumnDef<IEmploye>[]>(
    () => [
      columnHelper.accessor('matricule', {
        cell: (info) => info.getValue(),
        header: () => 'Matricule',
      }),
      columnHelper.accessor('nom', {
        cell: (info) => info.getValue(),
        header: () => 'Nom',
      }),
      columnHelper.accessor('prenom', {
        cell: (info) => info.getValue(),
        header: () => 'Prenom',
      }),
      columnHelper.accessor('id', {
        cell: (info) => (
          <div className="flex justify-center">
            <ButtonLink to={`historique/${info.getValue()}`}>Historique paie</ButtonLink>
          </div>
        ),
        header: () => <div className="text-center">Action</div>,
      }),
    ],
    [columnHelper],
  )

  return (
    <div>
      <div>
        <ReusableTable data={actifEmployes} columns={cols} searchBar pagination />
      </div>
    </div>
  )
}

export default GestionPaie
