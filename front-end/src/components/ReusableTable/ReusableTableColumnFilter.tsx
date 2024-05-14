import React from 'react'
import { Column, Table } from '@tanstack/react-table'
import { DebounceInput } from 'react-debounce-input'

interface ReusableTableColumnFilterProps {
  column: Column<any, unknown>
  table: Table<any>
}

const ReusableTableColumnFilter = ({ column, table }: ReusableTableColumnFilterProps) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column, firstValue],
  )
  if (!column.getCanFilter()) {
    return null // Si la colonne ne nécessite pas de filtre, retourne null
  }

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebounceInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
          }`}
          className="w-24 border shadow rounded-sm text-black px-2"
        />
        <DebounceInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
          }`}
          className="w-24 border shadow rounded-sm text-black px-2"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebounceInput
        type="text"
        value={typeof columnFilterValue === 'string' ? columnFilterValue : ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        placeholder={`Rechercher... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded-sm text-black px-2"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}

export default ReusableTableColumnFilter
