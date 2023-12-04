import React from 'react'
import ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'

const DnsGen = () => {
  const handleExport = () => {
    const wb = new ExcelJS.Workbook()
    const wsEmployeur = wb.addWorksheet('EMPLOYER')

    // Classeur Employeur
    const row2WsEmployeur = wsEmployeur.getRow(2)
    const cellA2Employeur = row2WsEmployeur.getCell(1)
    cellA2Employeur.value = "RENSEIGNEMENTS SUR L'EMPLOYEUR :"

    const colBWsEmployeur = wsEmployeur.getColumn(2)
    colBWsEmployeur.width = 230
    colBWsEmployeur.values = [
      '',
      '',
      '',
      'N° MATRICULE',
      'RAISON SOCIALE',
      'N° NIF(nouveau)',
      'N° Téléphone',
      'ADRESSE',
      'Adresse email',
    ]

    wsEmployeur.eachRow((row, ronNmb) => {
      row.eachCell((cell, colNum) => {
        if (cell.value) {
          row.getCell(colNum).font = { name: 'Arial', size: 10 }
        }
      })
    })
    cellA2Employeur.font = { name: 'Arial', bold: true, underline: true, size: 10 }

    // Générer le fichier Excel
    wb.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' })
      FileSaver.saveAs(blob, 'NomDuFichier.xlsx')
    })
  }

  return (
    <div>
      <button
        className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200"
        onClick={handleExport}
      >
        Générer
      </button>
    </div>
  )
}

export default DnsGen
