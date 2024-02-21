import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addNotification } from 'src/redux/notificationStack/notificationStackReducer'
import { ImportHsProps } from '@src/interfaces/interfaceImportHS'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import useUploadHs from '@src/hooks/useImportHs'
import InlineLoading from '@src/components/loadings/InlineLoading'

function ImportHS({ setNotification }: ImportHsProps) {
  const [heures, setHeures] = useState<any[]>([])
  const [file, setFile] = useState<File | undefined>(undefined)
  const dispatch = useDispatch()
  const formatError = useErrorFormatter()
  const {
    mutateAsync: uploadHsData,
    error: uploadHsError,
    isError: uploadHsIsError,
    isIdle: uploadHsIsIdle,
    isPending: uploadHsIsPending,
    isPaused: uploadHsIsPaused,
    isSuccess: uploadHsIsSuccess,
  } = useUploadHs()

  function handleUpload() {
    // Vérifier si un fichier a été sélectionné
    if (!file) {
      setNotification('Aucun fichier sélectionné')
      return
    }

    const reader = new FileReader()
    reader.readAsArrayBuffer(file) // Utiliser readAsArrayBuffer() au lieu de readAsBinaryString()
    reader.onload = async (e) => {
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
      console.log(heuressup)

      await uploadHsData(heuressup)

      //   axios
      //     .post('https://ls.migthy-free.com/public/importheuressupplementaires', { heuressup })
      //     .then((res) => {
      //       if (res.status === 200) {
      //         setNotification('Les heures ont été importées avec succès.')
      //       }
      //       //   dispatch(
      //       //     addNotification({
      //       //       title: 'Importation des heures',
      //       //       message: 'Les heures ont été importées avec succès.',
      //       //     }),
      //       //   )
      //     })
      //     .catch((err) => {
      //       const errorMessage = formatError(err)
      //       setNotification(errorMessage)
      //       // dispatch(
      //       //   addNotification({
      //       //     title: 'Import heures',
      //       //     type: 'error',
      //       //     message: "Erreur lors de l'importation",
      //       //   }),
      //       // );
      //     })
    }
  }

  React.useEffect(() => {
    if (uploadHsError) {
      setNotification(formatError(uploadHsError))
    }
    if (uploadHsIsSuccess) {
      setNotification('Les heures ont été importées avec succès.')
    }
  }, [uploadHsError, uploadHsIsSuccess, uploadHsIsError, formatError, setNotification])

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
      {uploadHsIsPending ? (
        <div className="flex justify-center w-24">
          <InlineLoading />
        </div>
      ) : (
        <div>
          <ButtonWithIcon label="Importer" onClick={handleUpload} />
        </div>
      )}
    </div>
  )
}

export default ImportHS
