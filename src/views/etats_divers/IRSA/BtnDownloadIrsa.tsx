import React from 'react'
import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { IBtnDownloadIrsaProps, irsaProps } from '@src/interfaces/interfaceBtnDownloadIrsaProps'
import ExcelJS from 'exceljs'

const BtnDownloadIrsa: React.FC<IBtnDownloadIrsaProps> = ({ data, mois, annee, onClick }) => {
  const handleDownload = () => {
    if (data && data.length > 0) {
      const workBook = new ExcelJS.Workbook()
      const sheetSaisie = workBook.addWorksheet('Saisie')

      // Ajouter les en-têtes de colonne
      const columns = [
        'Matricule*',
        'N°CNaPS',
        'Nom et prénoms',
        'CIN/Carte de résident',
        "Date d'embauche",
        'Date de débauche',
        'Fonction',
        'Salaire de base',
        'Imposables',
        'Non imposables',
        'imposables',
        'Temps de présence *',
        'Imposables',
        'Non exonérées',
        'Prime et gratification',
        'Autres',
        'Salaire brut',
        'CNAPS',
        'Ostie ou assimilé',
        'Salaire net',
        'Montant imposable',
        'Impôt correspondant',
        'Réduction pour charge de famille',
        'Impôt dû',
      ]
      sheetSaisie.mergeCells('I1:J1')
      sheetSaisie.getCell('J1').value = 'Indemnités'
      sheetSaisie.mergeCells('K1:L1')
      sheetSaisie.getCell('L1').value = 'Avantages en nature'
      sheetSaisie.mergeCells('M1:N1')
      sheetSaisie.getCell('N1').value = 'Heures supplemantes'
      sheetSaisie.addRow(columns)

      // Appliquer des bordures à toutes les cellules des en-têtes de colonne
      sheetSaisie.getRow(1).eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })

      sheetSaisie.getRow(2).eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })

      console.log(data)

      // Ajouter les données
      data.forEach((row: irsaProps) => {
        const rowData = [
          row.matricule,
          row.num_cnaps,
          row.nom_prenom,
          row.cin,
          row.date_embauche,
          row.date_debauche,
          row.fonction,
          row.salaire_de_base,
          row.indemnite_imposables,
          row.indemnite_non_imposables,
          row.avantage_nature_imposables,
          row.temps_de_presence,
          row.hs_inposables,
          row.hs_non_exonerables,
          row.autres_avantages,
          row.prime_gratification,
          row.salaire_brut,
          row.cnaps,
          row.ostie,
          row.salaire_net,
          row.montant_imposable,
          row.impo_correspondant,
          row.reduction_charge_famille,
          row.impot_du,
        ]

        // Vérifier si au moins une cellule de la ligne est non vide
        const isEmpty = rowData.every(
          (cellValue) => cellValue === null || cellValue === undefined || cellValue === '',
        )

        // Ajouter la ligne avec les données
        const rowObject = sheetSaisie.addRow(rowData)
      })

      // Ajuster la longueur de chaque colonne en fonction du contenu
      columns.forEach((columnName, index) => {
        const column = sheetSaisie.getColumn(index + 1)
        const maxLength = Math.max(
          ...[...sheetSaisie.getColumn(index + 1).values, columnName.length].map((s) =>
            s ? s.toString().length : 0,
          ),
        )
        column.width = maxLength + 2 // Add some extra padding
      })

      // Télécharger le fichier Excel
      workBook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `edi-annexe-IRSA_${mois}_${annee}.xlsx`
        a.click()
      })
    }
  }

  return (
    <div>
      <ButtonWithIcon
        className="w-24"
        label="Télécharger"
        onClick={handleDownload}
        disabled={!data || data.length === 0}
        variant={ButtonWithIconVariant.Secondary}
      />
    </div>
  )
}

export default BtnDownloadIrsa
