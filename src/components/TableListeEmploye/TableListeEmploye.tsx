import React from 'react'
import DataTableEmploye from '@components/TableListeEmploye/DataTableEmploye'
import { useSelector } from 'react-redux'
import { IEmploye } from '@src/interfaces/interfaceEmploye'

interface IDataWithActions extends IEmploye {
  actions?: React.FC[]
}

function TableListeEmploye({ actions }: { actions?: React.FC[] }): JSX.Element {
  const data = useSelector((state: any) => state.employeesList.list)

  const formattedData: IDataWithActions[] =
    data && data.length > 0
      ? data.map((item: any) => ({
          ...item,
          fullName: `${item.nom} ${item.prenom}`,
          actions: actions,
        }))
      : []

  return (
    <div>
      <DataTableEmploye data={formattedData} />
    </div>
  )
}

export default TableListeEmploye
