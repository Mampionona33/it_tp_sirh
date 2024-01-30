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

class DnsGenerator extends Component<{ tauxCnaps: any }> {
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
      if (salarie.mois && salarie.annee) {
        const anneeMois = this.formateAnneMois(salarie.mois, salarie.annee)
        monthWorksheet.workSheet.getCell(`A${index + 3}`).value = anneeMois
      }
      if (salarie.nom) {
        monthWorksheet.workSheet.getCell(`B${index + 3}`).value = salarie.nom.toUpperCase()
      }
      if (salarie.prenom) {
        monthWorksheet.workSheet.getCell(`C${index + 3}`).value = salarie.prenom.toUpperCase()
      }
      if (salarie.num_cnaps) {
        monthWorksheet.workSheet.getCell(`D${index + 3}`).value = salarie.num_cnaps
      }
      if (salarie.ref_employeur) {
        monthWorksheet.workSheet.getCell(`E${index + 3}`).value = salarie.ref_employeur
      }
      if (salarie.date_embauche) {
        monthWorksheet.workSheet.getCell(`F${index + 3}`).value = salarie.date_embauche
      }
      if (salarie.date_depart) {
        monthWorksheet.workSheet.getCell(`G${index + 3}`).value = salarie.date_depart
      }
      if (salarie.salaire_du_mois) {
        monthWorksheet.workSheet.getCell(`H${index + 3}`).value = salarie.salaire_du_mois
      }
      if (salarie.avantage_du_mois) {
        monthWorksheet.workSheet.getCell(`I${index + 3}`).value = salarie.avantage_du_mois
      }
      if (salarie.temps_presence) {
        monthWorksheet.workSheet.getCell(`J${index + 3}`).value = salarie.temps_presence
      }
      if (salarie.hs_non_plafonne) {
        monthWorksheet.workSheet.getCell(`K${index + 3}`).value = {
          formula: `=H${index + 3} + I${index + 3}`,
        }
      }
      if (salarie.hs_plafonne && salarie.hs_plafonne) {
        const plafondSme = salarie.plafondSme || 1940000
        monthWorksheet.workSheet.getCell(`L${index + 3}`).value = {
          formula: `=IF(K${index + 3} <= ${plafondSme}, K${index + 3}, ${plafondSme})`,
        }
      }
      if (salarie.hs_plafonne && salarie.taux_cotisation_cnaps_employeur) {
        const tauxCotisationEmployeur = salarie.taux_cotisation_cnaps_employeur || 0.13
        monthWorksheet.workSheet.getCell(`M${index + 3}`).value = {
          formula: `=L${index + 3} * ${tauxCotisationEmployeur}`,
        }
      }
      if (salarie.hs_non_plafonne) {
        const tauxCotisationSalarie = salarie.taux_cotisation_cnaps_salarie || 0.01
        monthWorksheet.workSheet.getCell(`N${index + 3}`).value = {
          formula: `=L${index + 3} * ${tauxCotisationSalarie}`,
        }
      }
      if (salarie.hs_plafonne && salarie.taux_cotisation_cnaps_salarie) {
        monthWorksheet.workSheet.getCell(`O${index + 3}`).value = {
          formula: `=M${index + 3} + N${index + 3}`,
        }
      }
      if (salarie.cin) {
        monthWorksheet.workSheet.getCell(`P${index + 3}`).value = salarie.cin
      }
    })
  }

  private writeDataToSheet1 = (employeurData: IDnsGeneratorEmployeurData) => {
    this.employeurSheet.sheet.getCell('C4').value = employeurData.numero_rcs
    this.employeurSheet.sheet.getCell('C5').value = employeurData.nom
    this.employeurSheet.sheet.getCell('C6').value = employeurData.numero_nif
    this.employeurSheet.sheet.getCell('C7').value = employeurData.telephone
    this.employeurSheet.sheet.getCell('C8').value = employeurData.adresse
    this.employeurSheet.sheet.getCell('C9').value = employeurData.email
    console.log(this.props)
    if (this.props.tauxCnaps) {
      this.employeurSheet.sheet.getCell('C15').value = this.props.tauxCnaps.employeur
      this.employeurSheet.sheet.getCell('C16').value = this.props.tauxCnaps.salarie
    }
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

    this.mois1WorkSheet.addBorder(numberSalarieMois1)
    this.mois2WorkSheet.addBorder(numberSalarieMois2)
    this.mois3WorkSheet.addBorder(numberSalarieMois3)

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
