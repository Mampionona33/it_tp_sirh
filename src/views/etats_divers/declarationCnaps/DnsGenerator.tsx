import React, { Component } from 'react'
import ExcelJS from 'exceljs'
import { store } from 'src/redux/store'
import EmployerWorksheet from './EmployerWorksheet'
import MonthWorksheet from './MonthWorksheet'
import * as FileSaver from 'file-saver'
import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { Store } from 'redux'
import InlineLoading from '@src/components/loadings/InlineLoading'
import { IDnsGeneratorRootProps } from '@src/interfaces/interfaceDnsGenerator'

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
  private dnsData: IDnsGeneratorRootProps | null
  private loadingDnsData: string
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
    this.loadingDnsData = store.getState().dns.loading
  }

  componentDidMount(): void {
    this.store.subscribe(() => {
      this.dnsData = store.getState().dns.dnsData
      this.loadingDnsData = store.getState().dns.loading
    })
  }

  componentDidUpdate(): void {
    this.store.subscribe(() => {
      this.dnsData = store.getState().dns.dnsData
      this.loadingDnsData = store.getState().dns.loading
    })
  }

  private isSalariesDataExist = (): boolean => {
    return this.dnsData !== null && this.dnsData.data[0].travailleurs.length > 0
  }

  private getListSalarieMois1 = () => {
    let listSalarieMois1 = []
    if (this.isSalariesDataExist()) {
      listSalarieMois1 = this.dnsData.data[0].travailleurs.filter(
        (salarieData) =>
          this.mois1List.includes(salarieData.mois) &&
          this.store.getState().dns.periodSelectionne === salarieData.trimestre,
      )
    }
    return listSalarieMois1
  }

  private getListSalarieMois2 = () => {
    let listSalarieMois2 = []
    if (this.isSalariesDataExist()) {
      listSalarieMois2 = this.dnsData.data[0].travailleurs.filter(
        (salarieData) =>
          this.mois2List.includes(salarieData.mois) &&
          this.store.getState().dns.periodSelectionne === salarieData.trimestre,
      )
    }
    return listSalarieMois2
  }

  private getListSalarieMois3 = () => {
    let listSalarieMois3 = []
    if (this.isSalariesDataExist()) {
      listSalarieMois3 = this.dnsData.data[0].travailleurs.filter(
        (salarieData) =>
          this.mois3List.includes(salarieData.mois) &&
          this.store.getState().dns.periodSelectionne === salarieData.trimestre,
      )
    }
    return listSalarieMois3
  }

  render() {
    const salarieMois1 = this.getListSalarieMois1()
    const salarieMois2 = this.getListSalarieMois2()
    const salarieMois3 = this.getListSalarieMois3()

    console.log(salarieMois1)
    console.log(salarieMois2)
    console.log(salarieMois3)
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
            />
          )}
        </div>
      </>
    )
  }
}

export default DnsGenerator
