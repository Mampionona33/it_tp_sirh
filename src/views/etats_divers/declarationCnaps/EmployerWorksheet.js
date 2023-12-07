class EmployerWorksheet {
  constructor(workbook) {
    this.employeurData = []
    this.period = ''

    this.worksheet = workbook.addWorksheet('EMPLOYER', {
      properties: { tabColor: { argb: '00CCFF' } },
    })

    this.colA = this.worksheet.getColumn(1)
    this.colB = this.worksheet.getColumn(2)
    this.CellB30 = this.worksheet.getCell('B30')
    this.row18 = this.worksheet.getRow(18)
    this.row21 = this.worksheet.getRow(21)
    this.f22 = this.worksheet.getCell('F22')
    this.f23 = this.worksheet.getCell('F23')
    this.f24 = this.worksheet.getCell('F24')
    this.f25 = this.worksheet.getCell('F25')
    this.f26 = this.worksheet.getCell('F26')

    // this.createSheetContent()
  }

  setEmployeurData(employeurData) {
    this.employeurData = employeurData
  }

  setPeriod(period) {
    this.period = period
  }

  setDefaultFont() {
    this.worksheet.eachRow((row, rowNum) => {
      row.eachCell((cell, colNum) => {
        if (cell.value) {
          row.getCell(colNum).font = { name: 'Arial', size: 10 }
        }
      })
    })
  }

  isEmployeurExist() {
    return Array.isArray(this.employeurData) && this.employeurData.length > 0
  }

  formatC4ToC9() {
    for (let i = 4; i <= 9; i++) {
      if (this.worksheet.getCell(`C${i}`).style !== this.worksheet.getCell(`F${i}`).style) {
        this.worksheet.mergeCells(`C${i}:F${i}`)
      }
      if (this.isEmployeurExist()) {
        if (i === 4) {
          this.worksheet.getCell(`C${i}`).value = this.employeurData.rcs || null
        }
        if (i === 5) {
          this.worksheet.getCell(`C${i}`).value = this.employeurData.nom || null
        }
        if (i === 6) {
          this.worksheet.getCell(`C${i}`).value = this.employeurData.nif || null
        }
        if (i === 7) {
          this.worksheet.getCell(`C${i}`).value = this.employeurData.tel || null
        }
        if (i === 8) {
          this.worksheet.getCell(`C${i}`).value = this.employeurData.adresse || null
        }
        if (i === 9) {
          this.worksheet.getCell(`C${i}`).value = this.employeurData.email || null
        }
      }
      let colCDEF = this.worksheet.getColumn(i)
      colCDEF.width = 17
      this.worksheet.getCell(`C${i}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    }
  }
  formatC12ToC16() {
    for (let i = 12; i <= 16; i++) {
      if (i === 12 && this.period.length > 0) {
        this.worksheet.getCell(`C${i}`).value = this.period
      }

      this.worksheet.getCell(`C${i}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    }
  }
  formatC18ToE18() {
    for (let i = 3; i < 6; i++) {
      this.row18.getCell(i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    }
  }
  formatC21ToE21() {
    for (let i = 3; i < 6; i++) {
      this.row21.getCell(i).value = `Mois ${i - 2}`
      this.row21.getCell(i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      this.row21.getCell(i).font = { name: 'Arial', bold: true, size: 10 }
      this.row21.getCell(i).alignment = { vertical: 'middle', horizontal: 'center' }
    }
  }
  formatB22ToF25() {
    for (let i = 22; i < 26; i++) {
      let row = this.worksheet.getRow(i)
      if (!row) {
        row = this.worksheet.addRow({ number: i })
      }

      for (let c = 2; c <= 6; c++) {
        row.getCell(c).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      }
    }
  }
  formatF22() {
    this.f22.value = 'TOTAUX'
    this.f22.font = { name: 'Arial', bold: true, size: 10 }
    this.f22.alignment = { vertical: 'middle', horizontal: 'center' }
  }
  formatF26() {
    this.f26.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
  }
  insertFormulaToF23() {
    this.f23.value = { formula: 'SUM(C23,E23)' }
  }
  insertFormulaToF24() {
    this.f24.value = { formula: 'SUM(C24:E24)' }
  }
  insertFormulaToF25() {
    this.f25.value = { formula: 'SUM(C25:E25)' }
  }
  insertFormulaToF26() {
    this.f26.value = { formula: 'SUM(F24:F25)' }
  }

  createSheetContent() {
    const colCWsEmployeur = this.worksheet.getColumn(3)
    colCWsEmployeur.width = 17

    // const this.colA = this.worksheet.getColumn(1)
    this.colA.width = 5.5
    this.colA.values = [
      null,
      "RENSEIGNEMENTS SUR L'EMPLOYEUR :",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      'COTISATIONS :',
      null,
      null,
      null,
      null,
      null,
      null,
      'MOIS CONCERNES :',
      null,
      null,
      'RECAPITULATION :',
    ]

    // const this.colB = this.worksheet.getColumn(2)
    this.colB.width = 28.14
    this.colB.values = [
      null,
      null,
      null,
      'N° MATRICULE',
      'RAISON SOCIALE',
      'N° NIF(nouveau)',
      'N° Téléphone',
      'ADRESSE',
      'Adresse email',
      null,
      null,
      'Période et Année',
      'Mode de paiement',
      'Référence',
      'Taux Employeur',
      'Taux Travailleur',
      null,
      null,
      null,
      null,
      null,
      'Effectif mensuel (OBLIGATOIRE)',
      'Totaux Salaires non plafonnés',
      'Cotisations Employeur',
      'Cotisations travailleurs',
      null,
      null,
      null,
      null,
      '** Reporter ci-dessus les totaux obtenus dans les onglets Mois 1, 2 et 3.',
    ]
    this.setDefaultFont()
    this.formatC4ToC9()
    this.formatC12ToC16()
    this.formatC18ToE18()
    this.formatC21ToE21()
    this.formatB22ToF25()
    this.formatF22()
    this.formatF26()
    this.insertFormulaToF23()
    this.insertFormulaToF24()
    this.insertFormulaToF25()
    this.insertFormulaToF26()

    this.CellB30.font = { italic: true, bold: true }
    this.colA.font = { name: 'Arial', bold: true, underline: true, size: 10 }
  }
}

export default EmployerWorksheet
