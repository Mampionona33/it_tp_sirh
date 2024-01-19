import React, { Component } from 'react'
import ExcelJS from 'exceljs'
import { store } from 'src/redux/store'
import EmployerWorksheet from './EmployerWorksheet'
import MonthWorksheet from './MonthWorksheet'
import * as FileSaver from 'file-saver'
import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { Store } from 'redux'
import InlineLoading from '@src/components/loadings/InlineLoading'
import {
  IDnsGeneratorDataProps,
  IDnsGeneratorEmployeurData,
  IDnsGeneratorTravailleurProps,
} from '@src/interfaces/interfaceDnsGenerator'
import { IDnsState, setDns } from '@src/redux/dns/dnsReducers'

class DnsGenerator extends Component {
  private store: Store
  private wb: ExcelJS.Workbook
  private employeurSheet: EmployerWorksheet
  private mois1WorkSheet: MonthWorksheet
  private mois2WorkSheet: MonthWorksheet
  private mois3WorkSheet: MonthWorksheet
  private mois1List: string[]
  private mois2List: string[]
  private mois3List: string[]
  private dnsData: IDnsGeneratorDataProps | null
  private loadingDnsData: string
  private anneeSelectionne: number
  private periodSelectionne: string
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

    this.store = store
    this.dnsData = store.getState().dns.dnsData
    this.anneeSelectionne = store.getState().dns.anneeSelectionne
    this.periodSelectionne = store.getState().dns.periodSelectionne
    this.loadingDnsData = store.getState().dns.loading
  }

  componentDidMount(): void {
    this.store.subscribe(() => {
      this.dnsData = store.getState().dns.dnsData
      this.anneeSelectionne = store.getState().dns.anneeSelectionne
      this.periodSelectionne = store.getState().dns.periodSelectionne
      this.loadingDnsData = store.getState().dns.loading
    })
  }

  componentDidUpdate(): void {
    this.store.subscribe(() => {
      this.dnsData = store.getState().dns.dnsData
      this.anneeSelectionne = store.getState().dns.anneeSelectionne
      this.periodSelectionne = store.getState().dns.periodSelectionne
      this.loadingDnsData = store.getState().dns.loading
    })
  }

  private getEmployeurData = (): IDnsGeneratorEmployeurData[] | [] => {
    let data: IDnsGeneratorEmployeurData[] = []

    if (this.dnsData.employeur.length > 0) {
      data = this.dnsData.employeur
    }

    return data
  }

  private isSalariesDataExist = (): boolean => {
    return this.dnsData !== null
  }

  private getListSalarieMois1 = (): IDnsGeneratorTravailleurProps[] => {
    let listSalarieMois1: IDnsGeneratorTravailleurProps[] = []
    if (this.isSalariesDataExist()) {
      listSalarieMois1 = this.dnsData.travailleur.filter(
        (salarieData) =>
          this.mois1List.includes(salarieData.mois) &&
          this.store.getState().dns.periodSelectionne === salarieData.trimestre,
      )
    }
    return listSalarieMois1
  }

  private getListSalarieMois2 = (): IDnsGeneratorTravailleurProps[] => {
    let listSalarieMois2: IDnsGeneratorTravailleurProps[] = []
    if (this.isSalariesDataExist()) {
      listSalarieMois2 = this.dnsData.travailleur.filter(
        (salarieData) =>
          this.mois2List.includes(salarieData.mois) &&
          this.store.getState().dns.periodSelectionne === salarieData.trimestre,
      )
    }
    return listSalarieMois2
  }

  private getListSalarieMois3 = (): IDnsGeneratorTravailleurProps[] => {
    let listSalarieMois3: IDnsGeneratorTravailleurProps[] = []
    if (this.isSalariesDataExist()) {
      listSalarieMois3 = this.dnsData.travailleur.filter(
        (salarieData) =>
          this.mois3List.includes(salarieData.mois) &&
          this.store.getState().dns.periodSelectionne === salarieData.trimestre,
      )
    }
    return listSalarieMois3
  }

  private formatPeriod = (): string => {
    let periode = ''
    switch (this.periodSelectionne) {
      case 't1':
        periode = '01-' + String(this.anneeSelectionne)
        break
      case 't2':
        periode = '02-' + String(this.anneeSelectionne)
        break
      case 't3':
        periode = '03-' + String(this.anneeSelectionne)
        break
      case 't4':
        periode = '04-' + String(this.anneeSelectionne)
        break
      default:
        break
    }
    return periode
  }

  private handelDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const employeurData = this.getEmployeurData()

    const periode = this.formatPeriod()

    const listSalarieMois1 = this.getListSalarieMois1()
    const listSalarieMois2 = this.getListSalarieMois2()
    const listSalarieMois3 = this.getListSalarieMois3()

    this.mois1WorkSheet.setTravailleurData(listSalarieMois1)
    this.mois2WorkSheet.setTravailleurData(listSalarieMois2)
    this.mois3WorkSheet.setTravailleurData(listSalarieMois3)

    // this.employeurSheet.setPeriod(periode)
    // this.employeurSheet.setEmployeurData(employeurData)

    this.mois1WorkSheet.createSheetContent()
    this.mois2WorkSheet.createSheetContent()
    this.mois3WorkSheet.createSheetContent()
    // this.employeurSheet.createSheetContent()

    this.wb.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      FileSaver.saveAs(
        blob,
        `declaration_CNAPS_${String(this.periodSelectionne).toUpperCase()}_${String(
          this.anneeSelectionne,
        )}.xlsx`,
      )
    })

    this.store.dispatch(setDns({ loading: 'idle', dnsData: null } as IDnsState))

    this.mois1WorkSheet.resetData()
    this.mois2WorkSheet.resetData()
    this.mois3WorkSheet.resetData()
  }

  render() {
    return (
      <>
        <div className="flex items-center">
          {this.loadingDnsData === 'loading' ? (
            <div className="flex justify-center w-24">
              <InlineLoading />
            </div>
          ) : (
            <ButtonWithIcon
              label="Télécharger"
              variant={ButtonWithIconVariant.Secondary}
              disabled={this.dnsData === null}
              onClick={this.handelDownload}
            />
          )}
        </div>
      </>
    )
  }
}

export default DnsGenerator
