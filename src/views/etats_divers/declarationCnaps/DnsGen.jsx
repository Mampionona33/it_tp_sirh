import React from 'react'
import ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'

const DnsGen = () => {
  const handleExport = () => {
    const wb = new ExcelJS.Workbook()

    // Ajout d'une feuille de calcul "EMPLOYER" avec une couleur d'onglet spécifiée
    const wsEmployeur = wb.addWorksheet('EMPLOYER', {
      properties: { tabColor: { argb: '00CCFF' } },
    })
    for (let i = 4; i <= 9; i++) {
      wsEmployeur.mergeCells(`C${i}:F${i}`)

      let colCDEF = wsEmployeur.getColumn(i)
      colCDEF.width = 17
      wsEmployeur.getCell(`C${i}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    }
    const colCWsEmployeur = wsEmployeur.getColumn(3)
    colCWsEmployeur.width = 17

    // Définition de la largeur de la première colonne
    const colAWsEmployeur = wsEmployeur.getColumn(1)
    colAWsEmployeur.width = 5.5

    // Remplissage des valeurs dans la première colonne
    colAWsEmployeur.values = [
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

    // Configuration de la largeur et des valeurs pour la deuxième colonne
    const colBWsEmployeur = wsEmployeur.getColumn(2)
    colBWsEmployeur.width = 28.14
    colBWsEmployeur.values = [
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
      'Mode de paiemnt',
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
    const cellB30WsEmployeur = wsEmployeur.getCell('B30')

    /**
     * Il faut créer tous les composants du classeur avant de
     * mettre en place le style. Sinon, le style ne s'applique pas
     */
    wsEmployeur.eachRow((row, rowNum) => {
      row.eachCell((cell, colNum) => {
        if (cell.value) {
          row.getCell(colNum).font = { name: 'Arial', size: 10 }
        }
      })
    })

    /**
     * Il faut placer les styles spécifiques pour chaque élément après le style
     * global sinon, cela ne s'applique pas
     */
    cellB30WsEmployeur.font = { italic: true, bold: true }
    colAWsEmployeur.font = { name: 'Arial', bold: true, underline: true, size: 10 }

    // Générer le fichier Excel
    wb.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' })
      FileSaver.saveAs(blob, 'NomDuFichier.xlsx')
    })
  }

  // Rendu de l'élément React
  return (
    <div>
      {/* Bouton pour déclencher la génération du fichier Excel */}
      <button
        className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200"
        onClick={handleExport}
      >
        Générer
      </button>
    </div>
  )
}

export default DnsGen
