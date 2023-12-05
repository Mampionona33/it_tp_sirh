// import React, { Component } from 'react'
// import ExcelJS from 'exceljs'
// import * as FileSaver from 'file-saver'

// class DnsGen extends Component {
//   constructor(props) {
//     super(props)
//     this.handleExport = this.handleExport.bind(this)
//     this.wb = new ExcelJS.Workbook()
//   }

//   handleExport() {
//     // const wb = new ExcelJS.Workbook()
//     const wsEmployeur = this.wb.addWorksheet('EMPLOYER', {
//       properties: { tabColor: { argb: '00CCFF' } },
//     })

//     for (let i = 4; i <= 9; i++) {
//       wsEmployeur.mergeCells(`C${i}:F${i}`)
//       let colCDEF = wsEmployeur.getColumn(i)
//       colCDEF.width = 17
//       wsEmployeur.getCell(`C${i}`).border = {
//         top: { style: 'thin' },
//         left: { style: 'thin' },
//         bottom: { style: 'thin' },
//         right: { style: 'thin' },
//       }
//     }

//     const colCWsEmployeur = wsEmployeur.getColumn(3)
//     colCWsEmployeur.width = 17

//     const colAWsEmployeur = wsEmployeur.getColumn(1)
//     colAWsEmployeur.width = 5.5
//     colAWsEmployeur.values = [
//       null,
//       "RENSEIGNEMENTS SUR L'EMPLOYEUR :",
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       'COTISATIONS :',
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       'MOIS CONCERNES :',
//       null,
//       null,
//       'RECAPITULATION :',
//     ]

//     const colBWsEmployeur = wsEmployeur.getColumn(2)
//     colBWsEmployeur.width = 28.14
//     colBWsEmployeur.values = [
//       null,
//       null,
//       null,
//       'N° MATRICULE',
//       'RAISON SOCIALE',
//       'N° NIF(nouveau)',
//       'N° Téléphone',
//       'ADRESSE',
//       'Adresse email',
//       null,
//       null,
//       'Période et Année',
//       'Mode de paiemnt',
//       'Référence',
//       'Taux Employeur',
//       'Taux Travailleur',
//       null,
//       null,
//       null,
//       null,
//       null,
//       'Effectif mensuel (OBLIGATOIRE)',
//       'Totaux Salaires non plafonnés',
//       'Cotisations Employeur',
//       'Cotisations travailleurs',
//       null,
//       null,
//       null,
//       null,
//       '** Reporter ci-dessus les totaux obtenus dans les onglets Mois 1, 2 et 3.',
//     ]

//     wsEmployeur.eachRow((row, rowNum) => {
//       row.eachCell((cell, colNum) => {
//         if (cell.value) {
//           row.getCell(colNum).font = { name: 'Arial', size: 10 }
//         }
//       })
//     })

//     const cellB30WsEmployeur = wsEmployeur.getCell('B30')
//     cellB30WsEmployeur.font = { italic: true, bold: true }

//     colAWsEmployeur.font = { name: 'Arial', bold: true, underline: true, size: 10 }

//     this.wb.xlsx.writeBuffer().then((buffer) => {
//       const blob = new Blob([buffer], { type: 'application/octet-stream' })
//       FileSaver.saveAs(blob, 'NomDuFichier.xlsx')
//     })
//   }

//   render() {
//     return (
//       <div>
//         <button
//           className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200"
//           onClick={this.handleExport}
//         >
//           Générer
//         </button>
//       </div>
//     )
//   }
// }

// export default DnsGen
import React, { Component } from 'react'
import ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'
import EmployerWorksheet from './EmployerWorksheet'

class DnsGen extends Component {
  constructor(props) {
    super(props)
    this.handleExport = this.handleExport.bind(this)
    this.wb = new ExcelJS.Workbook()
    this.employerSheet = new EmployerWorksheet(this.wb)
  }

  handleExport() {
    this.wb.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' })
      FileSaver.saveAs(blob, 'NomDuFichier.xlsx')
    })
  }

  render() {
    return (
      <div>
        <button
          className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200"
          onClick={this.handleExport}
        >
          Générer
        </button>
      </div>
    )
  }
}

export default DnsGen
