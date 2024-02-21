import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addNotification } from 'src/redux/notificationStack/notificationStackReducer'
import { ImportHsProps } from '@src/interfaces/interfaceImportHS'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'

function ImportHS({ setNotification }: ImportHsProps) {
  const [heures, setHeures] = useState<any[]>([])
  const [file, setFile] = useState<File | undefined>(undefined)
  const dispatch = useDispatch()
  const formatError = useErrorFormatter()

  function handleUpload() {
    // Vérifier si un fichier a été sélectionné
    if (!file) {
      setNotification('Aucun fichier sélectionné')
      return
    }

    const reader = new FileReader()
    reader.readAsArrayBuffer(file) // Utiliser readAsArrayBuffer() au lieu de readAsBinaryString()
    reader.onload = (e) => {
      const data = e.target?.result as ArrayBuffer
      const workbrook = XLSX.read(new Uint8Array(data), { type: 'array' }) // Utiliser new Uint8Array(data) et type: 'array'
      var mySheetData: { [key: string]: any[] } = {}
      var heuressup: any = {}
      for (let index = 0; index < workbrook.SheetNames.length; index++) {
        const sheetName = workbrook.SheetNames[index]
        const workSheet = workbrook.Sheets[sheetName]
        const parseData = XLSX.utils.sheet_to_json(workSheet)
        mySheetData[sheetName] = parseData
      }
      heuressup = mySheetData.test
      setHeures(mySheetData.test)

      axios
        .post('https://ls.migthy-free.com/public/importheuressupplementaires', { heuressup })
        .then((res) => {
          if (res.status === 200) {
            setNotification('Les heures ont été importées avec succès.')
          }
          //   dispatch(
          //     addNotification({
          //       title: 'Importation des heures',
          //       message: 'Les heures ont été importées avec succès.',
          //     }),
          //   )
        })
        .catch((err) => {
          const errorMessage = formatError(err)
          setNotification(errorMessage)
          // dispatch(
          //   addNotification({
          //     title: 'Import heures',
          //     type: 'error',
          //     message: "Erreur lors de l'importation",
          //   }),
          // );
        })
    }
  }

  return (
    <div className="p-4 flex flex-col md:flex-row items-center md:items-end gap-2">
      <div className="import">
        <label htmlFor="formFileSm" className="text-lg">
          Importer une liste des HS
        </label>
        <input
          className="form-control form-control-sm"
          id="formFileSm"
          type="file"
          accept=".xlsx"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}
        />
      </div>
      <div>
        <ButtonWithIcon label="Importer" onClick={handleUpload} />
      </div>
      {/* <button
        className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200 mt-2 md:mt-0"
        onClick={handleUpload}
      >
        Importer
      </button> */}
    </div>
  )
}

export default ImportHS
