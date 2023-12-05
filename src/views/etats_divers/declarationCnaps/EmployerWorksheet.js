class EmployerWorksheet {
  constructor(workbook) {
    this.worksheet = workbook.addWorksheet('EMPLOYER', {
      properties: { tabColor: { argb: '00CCFF' } },
    })
    this.colA = this.worksheet.getColumn(1)
    this.colB = this.worksheet.getColumn(2)

    this.createSheetContent()
  }

  createSheetContent() {
    for (let i = 4; i <= 9; i++) {
      this.worksheet.mergeCells(`C${i}:F${i}`)
      let colCDEF = this.worksheet.getColumn(i)
      colCDEF.width = 17
      this.worksheet.getCell(`C${i}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    }

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

    this.worksheet.eachRow((row, rowNum) => {
      row.eachCell((cell, colNum) => {
        if (cell.value) {
          row.getCell(colNum).font = { name: 'Arial', size: 10 }
        }
      })
    })

    const cellB30WsEmployeur = this.worksheet.getCell('B30')
    cellB30WsEmployeur.font = { italic: true, bold: true }

    this.colA.font = { name: 'Arial', bold: true, underline: true, size: 10 }
  }
}

export default EmployerWorksheet
