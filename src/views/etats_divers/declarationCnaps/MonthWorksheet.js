import { parse } from 'date-fns'
import { fr } from 'date-fns/locale'

class MonthWorksheet {
  constructor(workbook, monthLabel, tabColor) {
    this.monthLabel = null
    this.workbook = workbook
    this.tabColor = null
    this.travailleurData = null
    this.formatedData = []

    this.startCharCode = 'A'.charCodeAt(0)
    this.endCharCode = 'O'.charCodeAt(0)
    this.columnNames = []
    this.columnData = [
      'date',
      'nom',
      'prenom',
      'num_cnaps',
      'refEmployeur',
      'dateEmbauche',
      'dateDepart',
      'salaireDuMois',
      'avantageDuMois',
      'tempsPresence',
      'nonPlafonne',
      'plafonne',
      'cotisationEmployeur',
      'cotisationTravailleur',
      'cotisationTotal',
      'numCin',
    ]
    this.generateColumnNames()

    this.worksheet = workbook.addWorksheet(monthLabel, {
      properties: { tabColor: { argb: tabColor } },
    })
  }

  setData(data) {
    this.travailleurData = data
  }

  isDataExist() {
    return this.travailleurData !== null && this.travailleurData !== undefined
  }

  formatDate(annee, mois) {
    try {
      const dateStr = `${annee}-${mois}-01`

      const parsedDate = parse(dateStr, 'yyyy-MMMM-dd', new Date(), { locale: fr })

      const formattedDate = `${parsedDate.getFullYear()}${(parsedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`

      return formattedDate
    } catch (error) {
      console.error('Error formatting date:', error)
      return ''
    }
  }

  formatData() {
    if (this.isDataExist()) {
      this.formatedData = this.travailleurData.map((item) => {
        return {
          ...item,
          date: this.formatDate(item.annee, item.mois),
        }
      })
    }
  }

  fillColA() {
    for (let i = 0; i < this.travailleurData.length; i++) {
      const rowNumber = i + 3
      this.worksheet.getCell(`A${rowNumber}`).value = this.formatDate(
        this.travailleurData[i].annee,
        this.travailleurData[i].mois,
      )
    }
  }

  generateColumnNames() {
    for (let charCode = this.startCharCode; charCode <= this.endCharCode; charCode++) {
      const columnName = String.fromCharCode(charCode)
      this.columnNames.push(columnName)
    }
  }

  fillCollData() {
    for (let colIndex = 0; colIndex < this.columnNames.length; colIndex++) {
      const colName = this.columnNames[colIndex]
      const dataKey = this.columnData[colIndex]

      for (let i = 0; i < this.formatedData.length; i++) {
        const rowNumber = i + 3
        this.worksheet.getCell(`${colName}${rowNumber}`).value = this.formatedData[i][dataKey]
      }
    }
  }

  fillColB() {
    for (let i = 0; i < this.travailleurData.length; i++) {
      const rowNumber = i + 3
      this.worksheet.getCell(`B${rowNumber}`).value = this.travailleurData[i].nom
    }
  }

  injectData() {
    if (this.isDataExist()) {
      this.formatData()
      // this.fillColA()
      // this.fillColB()
      console.log('formatedData: ', this.formatedData)
      this.fillCollData()
    }
  }

  initializeHeaders() {
    this.A1 = this.worksheet.getCell('A1')
    this.B1 = this.worksheet.getCell('B1')
    this.B2 = this.worksheet.getCell('B2')
    this.C2 = this.worksheet.getCell('C2')
    this.D1 = this.worksheet.getCell('D1')
    this.E1 = this.worksheet.getCell('E1')
    this.F1 = this.worksheet.getCell('F1')
    this.F2 = this.worksheet.getCell('F2')
    this.G2 = this.worksheet.getCell('G2')
    this.H1 = this.worksheet.getCell('H1')
    this.I1 = this.worksheet.getCell('I1')
    this.J1 = this.worksheet.getCell('J1')
    this.K1 = this.worksheet.getCell('K1')
    this.K2 = this.worksheet.getCell('K2')
    this.L2 = this.worksheet.getCell('L2')
    this.M1 = this.worksheet.getCell('M1')
    this.M2 = this.worksheet.getCell('M2')
    this.N2 = this.worksheet.getCell('N2')
    this.O2 = this.worksheet.getCell('O2')
    this.P1 = this.worksheet.getCell('P1')
  }

  verifyCellNotMerged(cell1, cell2) {
    return this.worksheet.getCell(cell1).style !== this.worksheet.getCell(cell2).style
  }

  setLabel(monthLabel) {
    this.monthLabel = monthLabel
  }

  setTabColor(tabColor) {
    this.tabColor = tabColor
  }

  adjustColumnWidths() {
    this.worksheet.columns.forEach((column, index) => {
      let maxStringLength = 0
      this.worksheet.eachRow({ includeEmpty: true }, (row) => {
        const cellValue = row.getCell(index + 1).value
        const cellLength = cellValue ? String(cellValue).length : 0
        maxStringLength = Math.max(maxStringLength, cellLength)
      })

      column.width = Math.max(10, Math.min(30, maxStringLength + 2))
    })
  }

  setDefaultFont() {
    this.adjustColumnWidths()
    this.worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = { name: 'Arial Narrow', size: 9 }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
    })
  }

  formatA1() {
    this.A1.width = '2.3cm'
    this.A1.value = 'ANNEE-MOIS'
    if (this.verifyCellNotMerged('A1', 'A2')) {
      this.worksheet.mergeCells('A1:A2')
    }
  }
  formatB1() {
    this.B1.width = '6cm'
    this.B1.value = 'TRAVAILLEURS'
    if (this.verifyCellNotMerged('B1', 'C1')) {
      this.worksheet.mergeCells('B1:C1')
    }
  }
  formatB2() {
    // this.B2.width = '6cm'
    this.B2.value = 'NOM'
  }
  formatC2() {
    this.C2.value = 'PRENOMS'
  }
  formatD1() {
    this.D1.width = '2.3cm'
    this.D1.value = 'N° CNaPS'
    if (this.verifyCellNotMerged('D1', 'D2')) {
      this.worksheet.mergeCells('D1:D2')
    }
  }
  formatE1() {
    this.E1.width = '2.3cm'
    this.E1.value = 'Réf. Employeur'
    if (this.verifyCellNotMerged('E1', 'E2')) {
      this.worksheet.mergeCells('E1:E2')
    }
  }
  formatF1() {
    // this.F1.width = '2.3cm'
    this.F1.value = 'DATE'
    if (this.verifyCellNotMerged('F1', 'G1')) {
      this.worksheet.mergeCells('F1:G1')
    }
  }
  formatF2() {
    // this.F2.width = '2.3cm'
    this.F2.value = 'ENTREE'
  }
  formatG2() {
    this.G2.value = 'DEPART'
  }
  formatH1() {
    // this.H1.width = '2.3cm'
    this.H1.value = 'SALAIRE DU MOIS'
    if (this.verifyCellNotMerged('H1', 'H2')) {
      this.worksheet.mergeCells('H1:H2')
    }
  }
  formatI1() {
    // this.I1.width = '2.3cm'
    this.I1.value = 'AVANTAGE DU MOIS'
    if (this.verifyCellNotMerged('I1', 'I2')) {
      this.worksheet.mergeCells('I1:I2')
    }
  }
  formatJ1() {
    // this.J1.width = '2.3cm'
    this.J1.value = 'TEMPS PRESENCE'
    if (this.verifyCellNotMerged('J1', 'J2')) {
      this.worksheet.mergeCells('J1:J2')
    }
  }
  formatK1() {
    // this.K1.width = '2.3cm'
    this.K1.value = 'TOTAL'
    if (this.verifyCellNotMerged('K1', 'L1')) {
      this.worksheet.mergeCells('K1:L1')
    }
  }
  formatK2() {
    this.K2.value = 'NON PLAFONNE'
    // this.K2.width = '2.3cm'
  }
  formatL2() {
    this.L2.value = 'PLAFONNE'
  }
  formatM1() {
    // this.M1.width = '2.3cm'
    this.M1.value = 'COTISATIONS'
    if (this.verifyCellNotMerged('M1', 'O1')) {
      this.worksheet.mergeCells('M1:O1')
    }
  }
  formatM2() {
    this.M2.value = 'EMPLOYEUR'
  }
  formatN2() {
    this.N2.value = 'TRAVAILLEUR'
  }
  formatO2() {
    this.O2.value = 'TOTAL'
  }
  formatP1() {
    // this.P1.width = '2.3cm'
    this.P1.value = 'N° CIN/N°PASSEPORT'
    if (this.verifyCellNotMerged('P1', 'P2')) {
      this.worksheet.mergeCells('P1:P2')
    }
  }

  createSheetContent() {
    this.initializeHeaders()
    this.formatA1()
    this.formatB1()
    this.formatB2()
    this.formatC2()
    this.formatD1()
    this.formatE1()
    this.formatF1()
    this.formatF2()
    this.formatG2()
    this.formatH1()
    this.formatI1()
    this.formatJ1()
    this.formatK1()
    this.formatK2()
    this.formatL2()
    this.formatM1()
    this.formatM2()
    this.formatN2()
    this.formatO2()
    this.formatP1()
    this.setDefaultFont()
    this.injectData()
  }
}

export default MonthWorksheet
