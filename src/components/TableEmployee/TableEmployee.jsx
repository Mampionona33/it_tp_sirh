import React from 'react'
import { TableEmployeeHeader } from './TableEmployeeHeader'
import TableEmployeeDataTable from './TableEmployeeDataTable'

export default function TableEmployee() {
  return (
    <div className="border shadow-sm overflow-hidden">
      <div>
        <TableEmployeeHeader />
        <TableEmployeeDataTable />
      </div>
    </div>
  )
}
