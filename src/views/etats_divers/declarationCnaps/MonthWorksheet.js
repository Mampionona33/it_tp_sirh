class MonthWorksheet {
  constructor(workbook, monthLabel, tabColor) {
    this.worksheet = workbook.addWorksheet(monthLabel, {
      properties: { tabColor: { argb: tabColor } },
    })
    this.A1 = this.worksheet.getCell('A1')
    this.B1 = this.worksheet.getCell('B1')
    this.createSheetContent()
  }

  setDefaultFont() {
    this.worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = { name: 'Arial Narrow', size: 9 }
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

  createSheetContent() {
    this.formatA1()
    this.formatB1()
    this.setDefaultFont()
  }
}

export default MonthWorksheet
