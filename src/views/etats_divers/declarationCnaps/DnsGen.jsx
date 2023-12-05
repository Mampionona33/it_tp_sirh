import React, { Component } from 'react'
import ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'
import EmployerWorksheet from './EmployerWorksheet'
import MonthWorksheet from './MonthWorksheet'

class DnsGen extends Component {
  constructor(props) {
    super(props)
    this.handleExport = this.handleExport.bind(this)
    this.wb = new ExcelJS.Workbook()
    this.employerSheet = new EmployerWorksheet(this.wb)
    this.mois1 = new MonthWorksheet(this.wb, 'Mois 1', 'ffff00')
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
