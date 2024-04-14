import { Column, HeaderContext, Table } from '@tanstack/react-table'
import React from 'react'

interface ReusableTableColonneVisibilityToggleProps<TData extends unknown> {
  table: Table<TData>
}

const ReusableTableColonneVisibilityToggle: React.FC<
  ReusableTableColonneVisibilityToggleProps<unknown>
> = ({ table }) => {
  return (
    <div className="inline-block border border-black shadow-sm rounded-sm bg-white text-sm">
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
      <div className="flex flex-wrap">
        {table.getAllLeafColumns().map((column: Column<unknown, unknown>) => {
          if (column.getCanHide()) {
            return (
              <div key={column.id} className="px-1 flex flex-col">
                <label className="inline-flex gap-1">
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  />
                  {column.columnDef.header &&
                    typeof column.columnDef.header === 'function' &&
                    column.columnDef.header({ table } as HeaderContext<unknown, unknown>)}
                </label>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default ReusableTableColonneVisibilityToggle
