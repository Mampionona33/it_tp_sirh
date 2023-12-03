import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const DnsGenerator = () => {
  const [fileGenerated, setFileGenerated] = useState(false)

  useEffect(() => {
    const generateExcelFile = () => {
      try {
        if (!fileGenerated) {
          const data = []
          const wb = XLSX.utils.book_new()

          // Feuille 1
          const ws1 = XLSX.utils.aoa_to_sheet(data)
          XLSX.utils.book_append_sheet(wb, ws1, 'EMPLOYEUR')

          // Feuille 2
          const ws2 = XLSX.utils.aoa_to_sheet(data)
          XLSX.utils.book_append_sheet(wb, ws2, 'Mois 1')

          // Feuille 3
          const ws3 = XLSX.utils.aoa_to_sheet(data)
          XLSX.utils.book_append_sheet(wb, ws3, 'Mois 2')

          // Feuille 4
          const ws4 = XLSX.utils.aoa_to_sheet(data)
          XLSX.utils.book_append_sheet(wb, ws4, 'Mois 3')

          const u8 = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })
          const parts = [u8]
          const blob = new Blob(parts, { type: 'application/vnd.ms-excel' })

          // Trigger download only if the file has not been generated
          saveAs(blob, 'DNS.xlsx')
          console.log(blob)
          setFileGenerated(true)
        }
      } catch (error) {
        console.error('Erreur lors de la génération du fichier Excel :', error)
      }
    }

    generateExcelFile()
  }, [fileGenerated])

  return (
    <div>
      <p>Génération du fichier Excel...</p>
    </div>
  )
}

export default DnsGenerator
