import ExcelJS, { Workbook, Worksheet } from 'exceljs'

export interface IEmployerWorksheetFillCol {
  cells: ExcelJS.Cell[]
  values?: {
    [key: string]: string
  }[]
}

export interface IEmployerWorksheetCreateRangeProps {
  cells: string[]
}

class EmployerWorksheet implements Partial<Worksheet> {
  workbook?: Workbook
  sheet?: Worksheet

  constructor(workbook: Workbook) {
    this.workbook = workbook
    this.sheet = this.workbook.addWorksheet('EMPLOYER', {
      properties: { tabColor: { argb: '00CCFF' } },
    })

    this.mergeCtoF()
    this.fillConstContent()
  }

  applyDefaultStyle = (): void => {
    if (!this.sheet) return
    this.sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = { name: 'Arial', size: 10 }
      })
    })
  }

  fillColumns = ({ cells, values }: IEmployerWorksheetFillCol): void => {
    cells.forEach((cell, index) => {
      const value = values?.[index]?.[cell.address]
      cell.value = value || null
    })
  }

  createCellArray = ({ cells }: IEmployerWorksheetCreateRangeProps): ExcelJS.Cell[] => {
    if (!this.sheet) return []
    const range = []
    for (const cell of cells) {
      range.push(this.sheet.getCell(cell))
    }
    return range
  }

  private mergeCtoF = () => {
    if (!this.sheet) return
    for (let i = 4; i <= 9; i++) {
      this.sheet.mergeCells(`C${i}:F${i}`)
    }
  }

  private fillConstContent = () => {
    if (!this.sheet) return
    const columnA2ToA21 = this.createCellArray({
      cells: ['A2', 'A11', 'A18', 'A21'],
    })
    const valA2ToA21 = [
      "RENSEIGNEMENTS SUR L'EMPLOYEUR :",
      'COTISATIONS :',
      'MOIS CONCERNES :',
      'RECAPITULATION :',
    ]
    columnA2ToA21.forEach((cell, index) => {
      cell.value = valA2ToA21[index]
      cell.font = { bold: true, underline: true, size: 10, name: 'Arial' }
    })

    const columB4ToB30 = this.createCellArray({
      cells: [
        'B4',
        'B5',
        'B6',
        'B7',
        'B8',
        'B9',
        'B12',
        'B13,',
        'B14',
        'B15',
        'B16',
        'B22',
        'B23',
        'B24',
        'B25',
        'B30',
      ],
    })
    const valB4ToB9 = [
      'N° MATRICULE',
      'RAISON SOCIALE',
      'N° NIF (nouveau)',
      'N° Téléphone',
      'ADRESSE',
      'Adresse mail',
      'Période et Année',
      'Mode de paiement',
      'Référence',
      'Taux Employeur',
      'Taux Travailleur',
      'Effectif mensuel (OBLIGATOIRE)',
      'Totaux Salaires non plafonnés',
      'Cotisations Employeur',
      'Cotisations travailleurs',
      ' ** Reporter ci-dessus les totaux obtenus dans les onglets Mois 1, 2 et 3.',
    ]
    columB4ToB30.forEach((cell, index) => {
      cell.value = valB4ToB9[index]
      cell.font = { size: 10, name: 'Arial' }
    })

    const row21 = ['C21', 'D21', 'E21']
    row21.forEach((element, index): void => {
      if (!this.sheet) return
      this.sheet.getCell(element).value = `Mois ${index + 1}`

      this.sheet.getCell(element).font = { bold: true, size: 10, name: 'Arial' }
      this.sheet.getCell(element).alignment = { vertical: 'middle', horizontal: 'center' }
      this.sheet.getCell(element).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    })

    this.sheet.getCell('F22').value = 'TOTAUX'
    this.sheet.getCell('F22').font = { bold: true, size: 10, name: 'Arial' }

    for (let i = 23; i <= 25; i++) {
      this.sheet.getCell(`F${i}`).value = { formula: `SUM(C${i}:E${i})` }
      this.sheet.getCell(`F${i}`).font = { size: 10, name: 'Arial' }
    }

    for (let i = 12; i < 17; i++) {
      this.sheet.getCell(`C${i}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    }

    for (let i = 4; i < 10; i++) {
      this.sheet.getCell(`C${i}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    }

    this.sheet.getCell('F26').value = { formula: 'SUM(F23:F25)' }
    this.sheet.getCell('F26').font = { size: 10, name: 'Arial' }

    Array.from(['C18', 'D18', 'E18']).forEach((cell) => {
      if (!this.sheet) return
      this.sheet.getCell(cell).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    })

    for (let i = 22; i <= 25; i++) {
      Array.from([`B${i}`, `C${i}`, `D${i}`, `E${i}`, `F${i}`]).forEach((cell) => {
        if (!this.sheet) return
        this.sheet.getCell(cell).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
    }

    this.sheet.getCell('F26').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    this.sheet.getColumn('A').width = 5.5
    this.sheet.getColumn('B').width = 25.5
    this.sheet.getColumn('C').width =
      this.sheet.getColumn('D').width =
      this.sheet.getColumn('E').width =
      this.sheet.getColumn('F').width =
        15
  }
}

export default EmployerWorksheet
