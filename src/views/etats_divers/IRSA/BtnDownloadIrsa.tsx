import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { IBtnDownloadIrsaProps } from '@src/interfaces/interfaceBtnDownloadIrsaProps'
import React from 'react'
import ExcelJS from 'exceljs'

const BtnDownloadIrsa = ({ data }: IBtnDownloadIrsaProps) => {
  console.log(data)
  const workBook = new ExcelJS.Workbook()
  const sheetSaisie = workBook.addWorksheet('Saisie')

  return (
    <div>
      <ButtonWithIcon
        className="w-24"
        label="Télécharger"
        disabled={!data}
        variant={ButtonWithIconVariant.Secondary}
      />
    </div>
  )
}

export default BtnDownloadIrsa
