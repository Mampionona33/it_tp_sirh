import React, { Component } from 'react'
import ExcelJS from 'exceljs'
import PropTypes from 'prop-types'
import { store } from 'src/redux/store'
import EmployerWorksheet from './EmployerWorksheet'
import MonthWorksheet from './MonthWorksheet'
import * as FileSaver from 'file-saver'

class DnsGenerator extends Component {
  constructor(props) {
    super(props)
    this.wb = new ExcelJS.Workbook()

    this.employeurSheet = new EmployerWorksheet(this.wb)
    this.mois1WorkSheet = new MonthWorksheet(this.wb, 'Mois 1', 'ffff00')
    this.mois2WorkSheet = new MonthWorksheet(this.wb, 'Mois 2', '99ccff')
    this.mois3WorkSheet = new MonthWorksheet(this.wb, 'Mois 3', '00ccff')

    this.mois1List = ['janvier', 'avril', 'juillet']
    this.mois2List = ['fevrier', 'mai', 'août']
    this.mois3List = ['mars', 'juin', 'septembre']

    this.store = null
    this.dnsData = null
    this.listSalarie = null
    this.employeurData = null

    this.listSalarieMois1 = null
    this.listSalarieMois2 = null
    this.listSalarieMois3 = null

    this.period = null
    this.salaries = null

    this.listSalarie = this.isDnsDataExist() ? this.dnsData[0].travailleurs : []

    this.state = {
      anneSelectionne: null,
      periodeSelectionne: null,
    }
  }

  isSalariesExist = () => {
    return this.salaries !== undefined && this.salaries !== null
  }

  getListSalarieMois1 = () => {
    this.listSalarieMois1 = []
    if (this.isSalariesExist()) {
      for (let i = 0; i < this.salaries.length; i++) {
        if (
          this.mois1List.includes(this.salaries[i].mois) &&
          this.salaries[i].trimestre === this.store.dns.periodSelectionne
        ) {
          this.listSalarieMois1.push(this.salaries[i])
        }
      }
    }
  }

  getListSalarieMois2 = () => {
    this.listSalarieMois2 = []
    if (this.isSalariesExist()) {
      for (let i = 0; i < this.salaries.length; i++) {
        if (
          this.mois2List.includes(this.salaries[i].mois) &&
          this.salaries[i].trimestre === this.store.dns.periodSelectionne
        ) {
          this.listSalarieMois2.push(this.salaries[i])
        }
      }
    }
  }

  getListSalarieMois3 = () => {
    this.listSalarieMois3 = []
    if (this.isSalariesExist()) {
      for (let i = 0; i < this.salaries.length; i++) {
        if (
          this.mois3List.includes(this.salaries[i].mois) &&
          this.salaries[i].trimestre === this.store.dns.periodSelectionne
        ) {
          this.listSalarieMois3.push(this.salaries[i])
        }
      }
    }
  }

  isDnsDataExist = () => {
    return (
      this.dnsData !== null && this.dnsData !== undefined && Array.from(this.dnsData).length > 0
    )
  }

  componentDidMount() {
    this.store = store.getState()
    this.dnsData = this.isDnsDataExist() ? this.store.dns.dnsData : []
    this.salaries = this.isDnsDataExist() ? this.dnsData[0].travailleurs : []
    this.getListSalarieMois1(this.salaries)
    this.getListSalarieMois2(this.salaries)
    this.getListSalarieMois3(this.salaries)
  }

  componentDidUpdate() {
    this.store = store.getState()
    this.dnsData = this.store.dns.dnsData
    this.salaries = this.isDnsDataExist() && this.dnsData[0].travailleurs
    this.getListSalarieMois1(this.salaries)
    this.getListSalarieMois2(this.salaries)
    this.getListSalarieMois3(this.salaries)
  }

  formatPeriod() {
    switch (this.store.dns.periodSelectionne) {
      case 't1':
        this.period = '01-' + this.store.dns.anneeSelectionne.toString()
        break
      case 't2':
        this.period = '04-' + this.store.dns.anneeSelectionne.toString()
        break
      case 't3':
        this.period = '07-' + this.store.dns.anneeSelectionne.toString()
        break
      default:
        break
    }
  }

  isEmployeurDataExist = () => {
    return this.store.employeur.employeur !== null && this.store.employeur.employeur !== undefined
  }

  handleExport = async (ev) => {
    ev.preventDefault()
    this.store = store.getState()
    this.formatPeriod()

    this.employeurData = this.isEmployeurDataExist() ? this.store.employeur.employeur : []

    if (this.listSalarieMois1) {
      this.mois1WorkSheet.setTravailleurData(this.listSalarieMois1)
      this.mois1WorkSheet.createSheetContent()
    }

    if (this.listSalarieMois2) {
      this.mois2WorkSheet.setTravailleurData(this.listSalarieMois2)
      this.mois2WorkSheet.createSheetContent()
    }

    if (this.listSalarieMois3) {
      this.mois3WorkSheet.setTravailleurData(this.listSalarieMois3)
      this.mois3WorkSheet.createSheetContent()
    }

    if (this.period) {
      this.employeurSheet.setPeriod(this.period)
    }

    if (this.isEmployeurDataExist()) {
      this.employeurSheet.setPeriodeSelectionne(this.store.dns.periodSelectionne)
      this.employeurSheet.setEmployeurData(this.employeurData[0])
      this.employeurSheet.createSheetContent()
    }

    this.wb.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      FileSaver.saveAs(
        blob,
        `declaration_CNAPS_${this.store.dns.periodSelectionne.toUpperCase()}_${
          this.store.dns.anneeSelectionne
        }.xlsx`,
      )
    })

    this.mois1WorkSheet.resetData()
    this.mois2WorkSheet.resetData()
    this.mois3WorkSheet.resetData()
  }

  render() {
    return (
      <>
        <div>
          <button
            type="submit"
            className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200"
            onClick={this.handleExport}
          >
            Générer
          </button>
        </div>
      </>
    )
  }
}

DnsGenerator.propTypes = {}

export default DnsGenerator
