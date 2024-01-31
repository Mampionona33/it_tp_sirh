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
import { format, getMonth, parse } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CotisationCnapsProps } from '@src/interfaces/interfaceCotisationCnaps'

class DnsGenerator extends Component<{ tauxCnaps: CotisationCnapsProps }> {
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

    this.mois1List = ['01', '04', '07']
    this.mois2List = ['02', '05', '08']
    this.mois3List = ['03', '06', '09']

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

  private isSalariesDataExist = (): boolean => {
    return this.dnsData.travailleur !== null && this.dnsData.travailleur !== undefined
  }

  private isEmployeurDataExist = (): boolean => {
    return this.dnsData.employeur !== null && this.dnsData.employeur !== undefined
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

  private formateAnneMois = (mois: string, annee: string): string => {
    let moisNumber = ''
    if (mois && annee) {
      moisNumber = format(new Date(`${annee}-${mois}-01`), 'yyyyMM', { locale: fr })
    }
    return moisNumber
  }

  private writeSalarieDataToWorksheet(
    salaries: IDnsGeneratorTravailleurProps[],
    monthWorksheet: MonthWorksheet,
  ): void {
    salaries.forEach((salarie, index) => {
      const anneeMois = this.formateAnneMois(salarie.mois, salarie.annee)
      const nom = salarie.nom.toUpperCase()
      const prenom = salarie.prenom.toUpperCase()
      const {
        num_cnaps,
        ref_employeur,
        date_embauche,
        date_depart,
        salaire_du_mois,
        avantage_du_mois,
        temps_presence,
        cin,
      } = salarie

      const hs_non_plafonne = salaire_du_mois + avantage_du_mois

      if (salarie.mois && salarie.annee) {
        monthWorksheet.workSheet.getCell(`A${index + 3}`).value = anneeMois
      }
      if (salarie.nom) {
        monthWorksheet.workSheet.getCell(`B${index + 3}`).value = nom
      }
      if (salarie.prenom) {
        monthWorksheet.workSheet.getCell(`C${index + 3}`).value = prenom
      }
      if (salarie.num_cnaps) {
        monthWorksheet.workSheet.getCell(`D${index + 3}`).value = num_cnaps
      }
      if (salarie.ref_employeur) {
        monthWorksheet.workSheet.getCell(`E${index + 3}`).value = ref_employeur
      }
      if (salarie.date_embauche) {
        monthWorksheet.workSheet.getCell(`F${index + 3}`).value = date_embauche
      }
      if (salarie.date_depart) {
        monthWorksheet.workSheet.getCell(`G${index + 3}`).value = date_depart
      }
      if (salarie.salaire_du_mois) {
        monthWorksheet.workSheet.getCell(`H${index + 3}`).value = salaire_du_mois
      }
      if (salarie.avantage_du_mois) {
        monthWorksheet.workSheet.getCell(`I${index + 3}`).value = avantage_du_mois
      }
      if (salarie.temps_presence) {
        monthWorksheet.workSheet.getCell(`J${index + 3}`).value = temps_presence
      }
      // if (hs_non_plafonne) {
      monthWorksheet.workSheet.getCell(`K${index + 3}`).value = {
        formula: `=H${index + 3} + I${index + 3}`,
      }
      // }
      // if (salarie.hs_plafonne && salarie.hs_plafonne) {
      const plafondSme = 1940000
      monthWorksheet.workSheet.getCell(`L${index + 3}`).value = {
        formula: `=IF(K${index + 3} <= ${plafondSme}, K${index + 3}, ${plafondSme})`,
      }
      // }
      const tauxCotisationEmployeur = this.props.tauxCnaps.employeur
        ? this.props.tauxCnaps.employeur
        : 0.13

      monthWorksheet.workSheet.getCell(`M${index + 3}`).value = {
        formula: `=L${index + 3} * ${tauxCotisationEmployeur}`,
      }

      const tauxCotisationSalarie = this.props.tauxCnaps.salarie
        ? this.props.tauxCnaps.salarie
        : 0.01

      monthWorksheet.workSheet.getCell(`N${index + 3}`).value = {
        formula: `=L${index + 3} * ${tauxCotisationSalarie}`,
      }

      monthWorksheet.workSheet.getCell(`O${index + 3}`).value = {
        formula: `=M${index + 3} + N${index + 3}`,
      }
      monthWorksheet.workSheet.getCell(`P${index + 3}`).value = cin
    })
  }

  private getMoisConcernes = (): { mois1: string; mois3: string; mois2: string } => {
    const mois = {
      mois1: '',
      mois3: '',
      mois2: '',
    }

    switch (this.periodSelectionne) {
      case 't1':
        mois.mois1 = 'janvier'
        mois.mois2 = 'février'
        mois.mois3 = 'mars'
        break
      case 't2':
        mois.mois1 = 'avril'
        mois.mois2 = 'mai'
        mois.mois3 = 'juin'
        break
      case 't3':
        mois.mois1 = 'juillet'
        mois.mois2 = 'août'
        mois.mois3 = 'septembre'
        break
      case 't4':
        mois.mois1 = 'octobre'
        mois.mois2 = 'novembre'
        mois.mois3 = 'décembre'
        break
      default:
        break
    }

    return mois
  }

  private applyDefaultFont = (workSheet: ExcelJS.Worksheet, cell: string) => {
    workSheet.getCell(cell).font = {
      name: 'Arial',
      size: 10,
    }
  }

  private applyDefaultFontToRenseingEmployeur = (): void => {
    for (let i = 4; i < 10; i++) {
      this.applyDefaultFont(this.employeurSheet.sheet, `C${i}`)
    }
  }

  private applyDefaultFontToCotisation = (): void => {
    for (let i = 12; i < 17; i++) {
      this.applyDefaultFont(this.employeurSheet.sheet, `C${i}`)
    }
  }

  private applyDefaultFontToMoisConcernes = (): void => {
    this.applyDefaultFont(this.employeurSheet.sheet, `C18`)
    this.applyDefaultFont(this.employeurSheet.sheet, `D18`)
    this.applyDefaultFont(this.employeurSheet.sheet, `E18`)
  }

  private writeDataToSheet1 = (employeurData: IDnsGeneratorEmployeurData) => {
    this.employeurSheet.sheet.getCell('C4').value = employeurData.numero_rcs
    this.employeurSheet.sheet.getCell('C5').value = employeurData.nom
    this.employeurSheet.sheet.getCell('C6').value = employeurData.numero_nif
    this.employeurSheet.sheet.getCell('C7').value = employeurData.telephone
    this.employeurSheet.sheet.getCell('C8').value = employeurData.adresse
    this.employeurSheet.sheet.getCell('C9').value = employeurData.email
    this.applyDefaultFontToRenseingEmployeur()
    console.log(this.props)

    if (this.props.tauxCnaps) {
      const periode = this.formatPeriod()
      this.employeurSheet.sheet.getCell('C12').value = periode
      this.employeurSheet.sheet.getCell('C15').value = this.props.tauxCnaps.employeur
      this.employeurSheet.sheet.getCell('C16').value = this.props.tauxCnaps.salarie
      this.applyDefaultFontToCotisation()
    }
    const mois1 = this.getMoisConcernes().mois1
    const mois2 = this.getMoisConcernes().mois2
    const mois3 = this.getMoisConcernes().mois3
    this.employeurSheet.sheet.getCell('C18').value = mois1
    this.employeurSheet.sheet.getCell('D18').value = mois2
    this.employeurSheet.sheet.getCell('E18').value = mois3
    this.applyDefaultFontToMoisConcernes()
    this.employeurSheet.sheet.getCell('C22').value = { formula: "SUM(COUNTA($'Mois 1'.D:D);-1" }
  }

  private isSalariesArrayNotEmpty = (number): boolean => {
    let isNotEmpty = true
    if (number === 0 || number === undefined) {
      isNotEmpty = false
    }
    return isNotEmpty
  }

  private handelDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const listSalarieMois1 = this.getListSalarieMois1()
    const listSalarieMois2 = this.getListSalarieMois2()
    const listSalarieMois3 = this.getListSalarieMois3()
    const numberSalarieMois1 = listSalarieMois1.length
    const numberSalarieMois2 = listSalarieMois2.length
    const numberSalarieMois3 = listSalarieMois3.length

    this.writeSalarieDataToWorksheet(listSalarieMois1, this.mois1WorkSheet)
    this.writeSalarieDataToWorksheet(listSalarieMois2, this.mois2WorkSheet)
    this.writeSalarieDataToWorksheet(listSalarieMois3, this.mois3WorkSheet)

    if (this.isSalariesArrayNotEmpty(numberSalarieMois1)) {
      this.mois1WorkSheet.addBorder(numberSalarieMois1)
    }
    if (this.isSalariesArrayNotEmpty(numberSalarieMois2)) {
      this.mois2WorkSheet.addBorder(numberSalarieMois2)
    }
    if (this.isSalariesArrayNotEmpty(numberSalarieMois3)) {
      this.mois3WorkSheet.addBorder(numberSalarieMois3)
    }

    if (this.isEmployeurDataExist()) {
      this.writeDataToSheet1(this.dnsData.employeur[0])
    }

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
