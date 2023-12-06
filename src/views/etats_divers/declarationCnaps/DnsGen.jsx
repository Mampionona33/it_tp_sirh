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
    const { data } = props
    this.data = Array.isArray(data) ? data : []
    this.store = store.getState()

    this.employeurData =
      this.store.employeur.employeur.length > 0 ? this.store.employeur.employeur[0] : []

    this.period = ''
    this.anneeSelectionne = this.store.dns.anneeSelectionne
    this.periodSelectionne = this.store.dns.periodSelectionne
    this.formatPeriod()

    this.wb = new ExcelJS.Workbook()

    // Utiliser une méthode fléchée pour lier correctement "this" à la fonction
    this.handleExport = this.handleExport.bind(this)
    this.formatPeriod = this.formatPeriod.bind(this)
  }

  componentDidMount() {
    if (!this.employerSheet) {
      this.employerSheet = new EmployerWorksheet(this.wb)
    }
    this.employerSheet.setEmployeurData(this.employeurData)
    this.employerSheet.setPeriod(this.period)
  }

  componentDidUpdate(prevProps) {
    this.store = store.getState()
    this.employeurData =
      this.store.employeur.employeur.length > 0 ? this.store.employeur.employeur[0] : []

    this.period = ''
    this.anneeSelectionne = this.store.dns.anneeSelectionne
    this.periodSelectionne = this.store.dns.periodSelectionne
    this.formatPeriod()
    this.employerSheet.setEmployeurData(this.employeurData)
    this.employerSheet.setPeriod(this.period)
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

  handleExport() {
    this.employerSheet.createSheetContent()

    // this.mois1 = new MonthWorksheet(this.wb, 'Mois 1', 'ffff00')
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
