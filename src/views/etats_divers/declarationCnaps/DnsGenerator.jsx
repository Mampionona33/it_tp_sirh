import React, { Component } from 'react'
import ExcelJS from 'exceljs'
import PropTypes from 'prop-types'
import { store } from 'src/redux/store'
import EmployerWorksheet from './EmployerWorksheet'
import MonthWorksheet from './MonthWorksheet'
import { fetchDnsData } from 'src/redux/dns/dnsActions'
import * as FileSaver from 'file-saver'

class DnsGenerator extends Component {
  constructor(props) {
    super(props)
    this.wb = new ExcelJS.Workbook()

    this.employeurSheet = new EmployerWorksheet(this.wb)
    this.mois1WorkSheet = new MonthWorksheet(this.wb, 'Mois 1', 'ffff00')

    this.mois1List = ['janvier', 'avril', 'juillet']
    this.mois2List = ['fevrier', 'mai', 'août']
    this.mois3List = ['mars', 'juin', 'septembre']

    this.store = null
    this.dnsData = null
    this.listSalarie = null
    this.listSalarieMois1 = null

    if (this.dnsData && Array.from(this.dnsData).length > 0) {
      this.listSalarie = this.dnsData[0].travailleurs
    }

    this.state = {
      anneSelectionne: null,
      periodeSelectionne: null,
    }
  }

  // fetchData = () => {
  //   if (this.state.anneSelectionne && this.state.periodeSelectionne) {
  //     console.log(this.state.anneSelectionne, this.state.periodeSelectionne)
  //     store.dispatch(
  //       fetchDnsData({
  //         annee: this.state.anneSelectionne,
  //         periode: this.state.periodeSelectionne,
  //       }),
  //     )
  //   }
  // }

  componentDidMount() {
    this.store = store.getState()
    this.dnsData = this.store.dns.dnsData

    const travailleurs = this.dnsData[0].travailleurs
    console.log(travailleurs)
    this.getListSalarieMois1(travailleurs)
  }

  componentDidUpdate() {
    this.store = store.getState()
    this.dnsData = this.store.dns.dnsData

    const travailleurs = this.dnsData[0].travailleurs
    console.log(travailleurs)
    this.getListSalarieMois1(travailleurs)
  }

  getListSalarieMois1 = (listSalarie) => {
    this.listSalarieMois1 = listSalarie
      ? Array.from(listSalarie).filter((salarie) => this.mois1List.includes(salarie.mois))
      : []
  }

  handleExport = (ev) => {
    ev.preventDefault()
    this.store = store.getState()

    if (this.listSalarieMois1) {
      console.log(this.listSalarieMois1)
      this.mois1WorkSheet.setTravailleurData(this.listSalarieMois1)
      this.mois1WorkSheet.createSheetContent()
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
  }

  render() {
    return (
      <>
        <div>
          <button
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
