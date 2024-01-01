import formatAriaryMga from '@src/utils/formatAriaryMga'
import React from 'react'

interface IRowProps {
  cell1?: string
  cell2?: string | number
  cell3?: string | number
  className?: string
  cell1ClassName?: string
  cell2ClassName?: string
  cell3ClassName?: string
}

/**
 * Renders a row of cells in a card.
 *
 * @param {IRowProps} props - The properties for the row.
 * @param {React.ReactNode} props.cell1 - The content of the first cell.
 * @param {React.ReactNode} props.cell2 - The content of the second cell.
 * @param {React.ReactNode} props.cell3 - The content of the third cell.
 * @param {string} props.className - The CSS class for the row.
 * @param {string} props.cell1ClassName - The CSS class for the first cell.
 * @param {string} props.cell2ClassName - The CSS class for the second cell.
 * @param {string} props.cell3ClassName - The CSS class for the third cell.
 * @returns {React.ReactElement} The rendered row component.
 */
const CardRow = ({
  cell1,
  cell2,
  cell3,
  className,
  cell1ClassName,
  cell2ClassName,
  cell3ClassName,
}: IRowProps) => {
  const rowClasses = `grid p-2 ${className || ''} ${!cell2 ? 'grid-cols-2' : 'grid-cols-3'}`
  const cell1Classes = `flex ${cell1ClassName || ''}`
  const cell2Classes = `flex justify-center ${cell2ClassName || ''}`
  const cell3Classes = `flex justify-end ${cell3ClassName || ''}`

  return (
    <div className={rowClasses}>
      <div className={cell1Classes}>{cell1}</div>
      {cell2 && <div className={cell2Classes}>{cell2}</div>}
      <div className={cell3Classes}>{formatAriaryMga(cell3)}</div>
    </div>
  )
}

export default CardRow
