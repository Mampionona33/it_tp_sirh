import React from 'react'
import { ITableHeadProps } from './TableHeadInterface'

const TableHead: React.FC<ITableHeadProps> = ({ title, children }) => {
  return (
    <div>
      <h1 className="text-lg ">{title}</h1>
      <div>{children}</div>
    </div>
  )
}

export default TableHead
