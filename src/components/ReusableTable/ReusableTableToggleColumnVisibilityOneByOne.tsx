import { Column, HeaderContext, Table } from '@tanstack/react-table'
import React from 'react'

interface ReusableTableToggleColumnVisibilityOneByOneProps<TData extends unknown> {
  table: Table<TData>
}

const ReusableTableToggleColumnVisibilityOneByOne: React.FC<
  ReusableTableToggleColumnVisibilityOneByOneProps<unknown>
> = ({ table }) => {
  return (
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
  )
}

export default ReusableTableToggleColumnVisibilityOneByOne
