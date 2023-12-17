import React from 'react'
// import { Root as IEmploye } from '@src/interfaces/interfaceEmploye'
import { Root as IEmploye } from '@interfaces/interfaceEmploye'

interface DataTableEmployeProps {
  data: IEmploye | {}
}

const DataTableEmploye: React.FC<DataTableEmployeProps> = ({ data }) => {
  return (
    <div>
      <div>Data table liste employé</div>
    </div>
  )
}

export default DataTableEmploye
