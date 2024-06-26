import { Table } from '@tanstack/react-table'
import React from 'react'

interface ReusableTableToggleColumnVisibilityAllProps<TData> {
  table: Table<TData>
}

const ReusableTableToggleColumnVisibilityAll = <TData,>({
  table,
}: ReusableTableToggleColumnVisibilityAllProps<TData>) => {
  return (
    <div className="px-1 border-b border-black">
      <label className="flex gap-1 flex-row">
        <input
          type="checkbox"
          checked={table.getIsAllColumnsVisible()}
          onChange={table.getToggleAllColumnsVisibilityHandler()}
        />
        {table.getIsAllColumnsVisible()
          ? 'Masquer toutes les colonnes'
          : 'Afficher toutes les colonnes'}
      </label>
    </div>
  )
}

export default ReusableTableToggleColumnVisibilityAll
