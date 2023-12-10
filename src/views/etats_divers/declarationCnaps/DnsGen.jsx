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
    this.listTravailleurMois1 = null
    this.listTravailleurMois2 = null
    this.listTravailleurMois2 = null

    this.employeurData = null
    this.travailleurs = null

    this.mois1List = ['janvier', 'avril', 'juillet']
    this.mois2List = ['fevrier', 'mai', 'août']
    this.mois3List = ['mars', 'juin', 'septembre']

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

    this.anneeSelectionne = this.store.dns.anneeSelectionne
    this.periodSelectionne = this.store.dns.periodSelectionne

    this.dsnData = this.store.dns.dsnData
    this.employeurData = this.store.employeur.employeur[0]

    this.formatPeriod()
    if (this.verifyDnsDataExist()) {
      this.getTravailleurs()
      this.getListTravailleurMois1()
      this.getListTravailleurMois2()
      this.getListTravailleurMois3()
    }

    this.mois1.setTravailleurData(this.listTravailleurMois1)
    this.mois1.setEmployeurData(this.employeurData)

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
  }

  componentDidUpdate(prevProps) {
    this.fetchData()
  }

  verifyDnsDataExist() {
    return this.dsnData && Array.from(this.dsnData).length > 0
  }

  getTravailleurs() {
    if (this.verifyDnsDataExist()) {
      this.travailleurs = Array.from(this.dsnData)[0].travailleurs
    }
  }

  verifyTravailleursExist() {
    return this.travailleurs !== null && this.travailleurs !== undefined
  }

  getListTravailleurMois1() {
    if (this.verifyTravailleursExist()) {
      this.listTravailleurMois1 = this.travailleurs.filter((travailleur) =>
        this.mois1List.includes(travailleur.mois),
      )
    }
  }

  getListTravailleurMois2() {
    if (this.verifyTravailleursExist()) {
      this.listTravailleurMois2 = this.travailleurs.filter((travailleur) =>
        this.mois2List.includes(travailleur.mois),
      )
    }
  }

  getListTravailleurMois3() {
    if (this.verifyTravailleursExist()) {
      this.listTravailleurMois3 = this.travailleurs.filter((travailleur) =>
        this.mois3List.includes(travailleur.mois),
      )
    }
  }

  // handleExport(ev) {
  //   ev.preventDefault()
  //   this.formatPeriod()
  //   this.employerSheet.createSheetContent()
  //   this.mois1.createSheetContent()

  //   this.wb.xlsx.writeBuffer().then((buffer) => {
  //     const blob = new Blob([buffer], { type: 'application/octet-stream' })
  //     FileSaver.saveAs(
  //       blob,
  //       `declaration_CNAPS_${this.periodSelectionne.toLocaleUpperCase()}_${
  //         this.anneeSelectionne
  //       }.xlsx`,
  //     )
  //   })
  // }

  handleExport(ev) {
    ev.preventDefault()

    this.setState(
      {}, // You can pass an empty object if you don't need to update the state
      () => {
        // The callback will be called after the state has been updated
        this.formatPeriod()
        this.employerSheet.createSheetContent()
        this.mois1.createSheetContent()

        this.wb.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], { type: 'application/octet-stream' })
          FileSaver.saveAs(
            blob,
            `declaration_CNAPS_${this.periodSelectionne.toLocaleUpperCase()}_${
              this.anneeSelectionne
            }.xlsx`,
          )
        })
      },
    )
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
