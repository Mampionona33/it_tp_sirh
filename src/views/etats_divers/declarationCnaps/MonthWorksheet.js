class MonthWorksheet {
  constructor(workbook, monthLabel, tabColor) {
    this.worksheet = workbook.addWorksheet(monthLabel, {
      properties: { tabColor: { argb: tabColor } },
    })
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
    this.createSheetContent()
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
    this.worksheet.mergeCells('A1:A2')
  }
  formatB1() {
    this.B1.width = '6cm'
    this.B1.value = 'TRAVAILLEURS'
    this.worksheet.mergeCells('B1:C1')
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
    this.worksheet.mergeCells('D1:D2')
  }
  formatE1() {
    this.E1.width = '2.3cm'
    this.E1.value = 'Réf. Employeur'
    this.worksheet.mergeCells('E1:E2')
  }
  formatF1() {
    // this.F1.width = '2.3cm'
    this.F1.value = 'DATE'
    this.worksheet.mergeCells('F1:G1')
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
    this.worksheet.mergeCells('H1:H2')
  }
  formatI1() {
    // this.I1.width = '2.3cm'
    this.I1.value = 'AVANTAGE DU MOIS'
    this.worksheet.mergeCells('I1:I2')
  }
  formatJ1() {
    // this.J1.width = '2.3cm'
    this.J1.value = 'TEMPS PRESENCE'
    this.worksheet.mergeCells('J1:J2')
  }
  formatK1() {
    // this.K1.width = '2.3cm'
    this.K1.value = 'TOTAL'
    this.worksheet.mergeCells('K1:L1')
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
    this.worksheet.mergeCells('M1:O1')
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
    this.worksheet.mergeCells('P1:P2')
  }

  createSheetContent() {
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
  }
}

export default MonthWorksheet
