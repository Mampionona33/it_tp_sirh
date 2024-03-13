import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { IBtnDownloadOmsiProps, dataOmsiProps } from '@src/interfaces/interfaceBtnDownloadOmsi'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import React, { useCallback } from 'react'
import ExcelJS from 'exceljs'

const BtnDonwloadOmsi: React.FC<IBtnDownloadOmsiProps> = ({ data, periode, annee }) => {
  const columns = [
    'MATR.',
    'NOM',
    'PRENOM',
    'NUMERO CNAPS',
    'ENTREE LE',
    'SX',
    'Date Départ',
    'mois_1',
    'mois_2',
    'mois_3',
    'TOTAL',
    'COTIS TRAV',
    'COTIS. TOTALE',
  ]

  const formatEnteteMois = useCallback(() => {
    const indexMois1 = columns.indexOf('mois_1')
    const indexMois2 = columns.indexOf('mois_2')
    const indexMois3 = columns.indexOf('mois_3')
    const mois1 = new Date()
    const mois2 = new Date()
    const mois3 = new Date()

    if (periode) {
      if (periode.value === 't1') {
        mois1.setMonth(0) // Janvier
        mois2.setMonth(1) // Février
        mois3.setMonth(2) // Mars
      }
      if (periode.value === 't2') {
        mois1.setMonth(3) // Avril
        mois2.setMonth(4) // Mai
        mois3.setMonth(5) // Juin
      }
      if (periode.value === 't3') {
        mois1.setMonth(6) // Juillet
        mois2.setMonth(7) // Août
        mois3.setMonth(8) // Septembre
      }
      if (periode.value === 't4') {
        mois1.setMonth(9) // Octobre
        mois2.setMonth(10) // Novembre
        mois3.setMonth(11) // Décembre
      }
    }

    if (indexMois1 > -1) {
      columns[indexMois1] = format(mois1, 'MMMM', { locale: fr })
    }
    if (indexMois2 > -1) {
      columns[indexMois2] = format(mois2, 'MMMM', { locale: fr })
    }
    if (indexMois3 > -1) {
      columns[indexMois3] = format(mois3, 'MMMM', { locale: fr })
    }
    return columns
  }, [periode])

  const handleDownload = () => {
    if (data && data.length > 0) {
      const workBook = new ExcelJS.Workbook()
      const sheetListeEmploye = workBook.addWorksheet('Liste')
      const formatedEntete = formatEnteteMois()

      // ajout en-tête du tableau
      sheetListeEmploye.addRow(formatedEntete)
      // Appliquer des bordures à toutes les cellules des en-têtes de colonne
      sheetListeEmploye.getRow(1).eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })

      // Ajout donnée
      data.forEach((row: Partial<dataOmsiProps>, index) => {
        const totalSalaires =
          (row.salaires?.salaire_mois_1 ?? 0) +
          (row.salaires?.salaire_mois_2 ?? 0) +
          (row.salaires?.salaire_mois_3 ?? 0)

        const totalCotisTrav = totalSalaires * 0.01

        const cotisTotal = totalCotisTrav * 7

        const rowData = [
          row.matricule,
          row.nom,
          row.prenom,
          row.num_cnaps,
          row.date_embauche,
          row.genre,
          row.date_debauche,
          row.salaires?.salaire_mois_1,
          row.salaires?.salaire_mois_2,
          row.salaires?.salaire_mois_3,
          totalSalaires,
          totalCotisTrav,
          cotisTotal,
        ]

        sheetListeEmploye.addRow(rowData)

        // Ajuster la longueur de chaque colonne en fonction du contenu
        columns.forEach((columnName, index) => {
          const column = sheetListeEmploye.getColumn(index + 1)
          const maxLength = Math.max(
            ...[...sheetListeEmploye.getColumn(index + 1).values, columnName.length].map((s) =>
              s ? s.toString().length : 0,
            ),
          )
          column.width = maxLength + 2 // Add some extra padding
        })
      })

      workBook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `OMSI_${annee?.label}_${periode?.label}.xlsx`
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

export default BtnDonwloadOmsi
