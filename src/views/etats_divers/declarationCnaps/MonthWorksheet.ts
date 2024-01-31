import ExcelJS, { Worksheet } from 'exceljs'

export interface IMonthWorksheetData {
  date: string
  nom: string
  prenom: string
  num_cnaps: string
  ref_employeur: string
  date_embauche: string
  date_depart: string
  salaire_du_mois: number
  avantage_du_mois: number
  temps_presence: number
  non_plafonne: number
  plafonne: number
  taux_cotisation_cnaps_employeur: number
  taux_cotisation_cnaps_salarie: number
}

export interface IMonthWorkSheetsColumnData {
  date: string
  nom: string
  prenom: string
  num_cnaps: string
  ref_employeur: string
  date_embauche: string
  date_depart: string
  salaire_du_mois: number
  avantage_du_mois: number
  temps_presence: number
  non_plafonne: number
  plafonne: number
  taux_cotisation_cnaps_employeur: number
  taux_cotisation_cnaps_salarie: number
}

class MonthWorksheet implements Partial<Worksheet> {
  workbook?: ExcelJS.Workbook
  workSheet?: ExcelJS.Worksheet
  constructor(workbook, monthLabel, tabColor) {
    this.workbook = workbook
    this.workSheet = this.workbook.addWorksheet(monthLabel, {
      properties: { tabColor: { argb: tabColor } },
    })
    this.createHeader()
  }

  private adjustColumnWidths = () => {
    const headerRow = this.workSheet.getRow(2)
    headerRow.eachCell((cell) => {
      const column = this.workSheet.getColumn(cell.col)
      let headerLength = cell.text.length
      const currentWidth = column.width || 15

      const estimatedWidth = headerLength * 1.2

      column.width = Math.max(currentWidth, estimatedWidth)
    })
  }

  public addBorder = (rowCount: number) => {
    const rows = this.workSheet.getRows(3, rowCount)
    rows.forEach((row) => {
      row.eachCell((cell) => {
        cell.font = { size: 9, name: 'Arial' }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.font = { size: 9, name: 'Arial' }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
    })
  }

  private createHeader = () => {
    this.workSheet.mergeCells('A1:A2')
    this.workSheet.mergeCells('B1:C1')
    this.workSheet.mergeCells('D1:D2')
    this.workSheet.mergeCells('E1:E2')
    this.workSheet.mergeCells('F1:G1')
    this.workSheet.mergeCells('H1:H2')
    this.workSheet.mergeCells('I1:I2')
    this.workSheet.mergeCells('J1:J2')
    this.workSheet.mergeCells('K1:L1')
    this.workSheet.mergeCells('M1:O1')
    this.workSheet.mergeCells('P1:P2')

    this.workSheet.getCell('A1').value = 'ANNEE-MOIS'
    this.workSheet.getCell('B1').value = 'TRAVAILLEURS'
    this.workSheet.getCell('B2').value = 'NOM'
    this.workSheet.getCell('C2').value = 'PRENOMS'
    this.workSheet.getCell('D1').value = 'N° CNaPS'
    this.workSheet.getCell('E1').value = 'REF. EMPLOYEUR'
    this.workSheet.getCell('F1').value = 'DATE'
    this.workSheet.getCell('F2').value = 'ENTREE'
    this.workSheet.getCell('G2').value = 'DEPART'
    this.workSheet.getCell('H1').value = 'SALAIRE DU MOIS'
    this.workSheet.getCell('I1').value = 'AVANTAGE DU MOIS'
    this.workSheet.getCell('J1').value = 'TEMPS PRESENCE'
    this.workSheet.getCell('K1').value = 'TOTAL'
    this.workSheet.getCell('K2').value = 'NON PLAFONNE'
    this.workSheet.getCell('L2').value = 'PLAFONNE'
    this.workSheet.getCell('M1').value = 'COTISATIONS'
    this.workSheet.getCell('M2').value = 'EMPLOYEUR'
    this.workSheet.getCell('N2').value = 'TRAVAILLEUR'
    this.workSheet.getCell('O2').value = 'TOTAL'
    this.workSheet.getCell('P1').value = 'N° CIN/N°PASSEPORT'

    this.workSheet.eachRow((row) => {
      row.eachCell({ includeEmpty: false }, (cell) => {
        cell.style = {
          font: { name: 'Arial', size: 10 },
          alignment: { vertical: 'middle', horizontal: 'center' },
        }

        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
    })

    this.adjustColumnWidths()
  }

  resetData = () => {
    this.workSheet.eachRow((row) => {
      if (row.number > 2) {
        row.eachCell({ includeEmpty: false }, (cell) => {
          cell.value = null
          cell.border = {
            top: null,
            left: null,
            bottom: null,
            right: null,
          }
        })
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.value = null
          cell.border = {
            top: null,
            left: null,
            bottom: null,
            right: null,
          }
        })
      }
    })
  }
}

export default MonthWorksheet
