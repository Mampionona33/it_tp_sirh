import React from 'react'
import DataTableEmploye from '@components/TableListeEmploye/DataTableEmploye'
import { useSelector } from 'react-redux'

function TableListeEmploye(): JSX.Element {
  const data = useSelector((state: any) => state.employeesList.list)
  console.log(data)
  return (
    <div>
      <div>Table liste employé</div>
      <DataTableEmploye data={data} />
    </div>
  )
}

export default TableListeEmploye
