import React, { Children } from 'react'
import DataTableEmploye from '@components/TableListeEmploye/DataTableEmploye'
import { useSelector } from 'react-redux'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import TableHead from './TableHead'
import { PlusIcon } from '@heroicons/react/24/outline'
import ButtonLink from '../buttons/ButtonLink'

interface IDataWithActions extends IEmploye {
  actions?: React.FC[]
}

function TableListeEmploye({ actions }: { actions?: React.FC[] }): JSX.Element {
  const data = useSelector((state: any) => state.employeesList.list)

  /**
   * Pour assurer la stabilité des données dans la table,
   * il est nécessaire d'isoler les données à envoyer en les formatant
   * en dehors du composant TableEmployeeDataTable.
   * @tanstack/react-table ne gère pas efficacement les changements fréquents d'état.
   * Ainsi, les données sont formatées une fois et transmises en tant que propriétés (props)
   * pour maintenir la constance des données à l'intérieur de la table.
   */
  const formattedData: IDataWithActions[] =
    data && data.length > 0
      ? data.map((item: any) => ({
          ...item,
          fullName: `${item.nom} ${item.prenom}`,
          actions: actions,
        }))
      : []

  const HeaderComponents: React.FC = () => {
    return (
      <>
        <ButtonLink
          icon={<PlusIcon width={20} height={20} fontWeight={'bold'} />}
          to="/employees/ajout"
        >
          Ajouter
        </ButtonLink>
      </>
    )
  }

  return (
    <div>
      <DataTableEmploye
        data={formattedData}
        tableTitle="Liste des employés"
        headerComponents={<HeaderComponents />}
      />
    </div>
  )
}

export default TableListeEmploye
