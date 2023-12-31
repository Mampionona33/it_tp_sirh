import formatAriaryMga from '@src/utils/formatAriaryMga'
import React from 'react'

interface IRowProps {
  cell1?: string
  cell2?: string | number
  cell3?: string | number
  className?: string
}
const CardRow = ({ cell1, cell2, cell3, className }: IRowProps) => {
  const rowClasses = `grid grid-cols-3 p-2 ${className || ''}`

  return (
    <div className={rowClasses}>
      <div className="flex">{cell1}</div>
      <div className="flex justify-center">{cell2}</div>
      <div className="flex justify-end">{cell3 && formatAriaryMga(cell3)}</div>
    </div>
  )
}
export default CardRow
