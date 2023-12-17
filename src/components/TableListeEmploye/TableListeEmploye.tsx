import React from 'react'
import DataTableEmploye from '@components/TableListeEmploye/DataTableEmploye'
import { useSelector } from 'react-redux'

function TableListeEmploye(): JSX.Element {
  const data = useSelector((state: any) => state.employeesList.list)
  console.log(data)

  const formattedData =
    data && data.length > 0
      ? data.map((item: any) => ({
          ...item,
          fullName: `${item.nom} ${item.prenom}`,
        }))
      : []

  return (
    <div>
      <div>Table liste employé</div>
      <DataTableEmploye data={formattedData} />
    </div>
  )
}

export default TableListeEmploye
