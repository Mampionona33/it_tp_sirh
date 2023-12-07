import React, { Component } from 'react'
import ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'
import EmployerWorksheet from './EmployerWorksheet'
import MonthWorksheet from './MonthWorksheet'
import PropTypes from 'prop-types'
import { store } from 'src/redux/store'

class DnsGen extends Component {
  constructor(props) {
    super(props)

    this.wb = new ExcelJS.Workbook()

    // Utiliser une méthode fléchée pour lier correctement "this" à la fonction
    this.handleExport = this.handleExport.bind(this)
    this.formatPeriod = this.formatPeriod.bind(this)
  }

  formatPeriod() {
    switch (this.periodSelectionne) {
      case 't1':
        this.period = '01-' + this.anneeSelectionne.toString()
        break
      case 't2':
        this.period = '04-' + this.anneeSelectionne.toString()
        break
      case 't3':
        this.period = '07-' + this.anneeSelectionne.toString()
        break
      default:
        break
    }
  }

  fetchData() {
    this.store = store.getState()
    this.employeurData = this.store.employeur.employeur[0]
    this.anneeSelectionne = this.store.dns.anneeSelectionne
    this.periodSelectionne = this.store.dns.periodSelectionne
    console.log(this.periodSelectionne)
    this.formatPeriod()
    this.employerSheet.setPeriodeSelectionne(this.periodSelectionne)
    this.employerSheet.setEmployeurData(this.employeurData)
    this.employerSheet.setPeriod(this.period)
  }

  componentDidMount() {
    if (!this.employerSheet) {
      this.employerSheet = new EmployerWorksheet(this.wb)
    }
    if (!this.mois1) {
      this.mois1 = new MonthWorksheet(this.wb, 'Mois 1', 'ffff00')
    }
    this.fetchData()
    this.employerSheet.setEmployeurData(this.employeurData)
    this.employerSheet.setPeriod(this.period)
  }

  componentDidUpdate(prevProps) {
    this.fetchData()
  }

  handleExport() {
    this.employerSheet.createSheetContent()
    this.mois1.createSheetContent()

    // this.mois2 = new MonthWorksheet(this.wb, 'Mois 2', '99ccff')
    // this.mois3 = new MonthWorksheet(this.wb, 'Mois 3', '00ccff')

    this.formatPeriod()
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
  store: PropTypes.object,
}

export default DnsGen
