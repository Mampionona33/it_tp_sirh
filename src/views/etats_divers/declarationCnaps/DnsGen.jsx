import React, { Component } from 'react'
import ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'
import EmployerWorksheet from './EmployerWorksheet'
import MonthWorksheet from './MonthWorksheet'
import PropTypes from 'prop-types'

class DnsGen extends Component {
  constructor(props) {
    super(props)
    const { data } = props
    this.data = Array.isArray(data) ? data : []

    this.employeurData = this.data.length > 0 ? this.data.filter((item) => item.employeur)[0] : []

    this.wb = new ExcelJS.Workbook()
    this.employerSheet = new EmployerWorksheet(this.wb, this.employeurData)
    this.mois1 = new MonthWorksheet(this.wb, 'Mois 1', 'ffff00')
    this.mois2 = new MonthWorksheet(this.wb, 'Mois 2', '99ccff')
    this.mois3 = new MonthWorksheet(this.wb, 'Mois 3', '00ccff')
    this.handleExport = this.handleExport.bind(this)
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

DnsGen.propTypes = {
  data: PropTypes.array,
}

export default DnsGen
