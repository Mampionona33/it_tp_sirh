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
import { useForm } from 'react-hook-form'
import { HsProps } from '@src/interfaces/interfaceHs'

function ImportHS({ setNotification }: ImportHsProps) {
  const [heures, setHeures] = useState<any[]>([])
  const [file, setFile] = useState<File | undefined>(undefined)
  const dispatch = useDispatch()
  const formatError = useErrorFormatter()
  const [fileErrors, setFileErrors] = useState<string[]>([])
  const {
    mutateAsync: uploadHsData,
    error: uploadHsError,
    isError: uploadHsIsError,
    isIdle: uploadHsIsIdle,
    isPending: uploadHsIsPending,
    isPaused: uploadHsIsPaused,
    isSuccess: uploadHsIsSuccess,
  } = useUploadHs()

  const validateData = (dataArray: HsProps[]): string[] => {
    let messages: string[] = []

    if (!dataArray.length) {
      messages.push('Le tableau est vide.')
    } else {
      const requiredColumns = ['Matricule', 'Nom_du_terminal', 'Time']

      // Parcourir chaque objet dans le tableau et valider les propriétés individuelles
      dataArray.forEach((data, index) => {
        // Valider la propriété Matricule
        const line = index + 2
        if (!data.Matricule) {
          messages.push(`La ligne ${line} du colonne 'Matricule' ne doit pas être vide.`)
        }

        // Valider la propriété Nom_du_terminal
        if (!data.Nom_du_terminal) {
          messages.push(`La ligne ${line} du colonne 'Nom_du_terminal' ne doit pas être vide.`)
        } else if (!['ENTREE', 'SORTIE'].includes(data.Nom_du_terminal)) {
          messages.push(
            `La propriété 'Nom_du_terminal' de la line ${line} doit être soit 'ENTREE' ou 'SORTIE'.`,
          )
        }

        // Valider la propriété Time
        if (!data.Time) {
          messages.push(`La ligne ${line} du colonne 'Time' ne doit pas être vide.`)
        } else if (!/^(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})$/.test(data.Time)) {
          messages.push(
            `La propriété 'Time' de la line ${line} doit être au format 'DD/MM/YYYY HH:mm'.`,
          )
        }
      })
    }

    return messages
  }

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

      const validationErrors = validateData(heuressup)
      if (validationErrors.length > 0) {
        setFileErrors(validationErrors)
        return
      }

      // await uploadHsData(heuressup)

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
    <div className="flex flex-col">
      <div className="p-4 flex flex-col md:flex-row items-center md:items-end gap-2 ">
        <div className="import">
          <label htmlFor="formFileSm" className="text-lg">
            Importer une liste des HS
          </label>
          <div>
            <input
              className="form-control form-control-sm"
              id="formFileSm"
              type="file"
              accept=".xlsx"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFile(e.target.files?.[0])
                setFileErrors([])
              }}
            />
          </div>
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
      {fileErrors.length > 0 && (
        <div className="text-red-500 p-3">
          {fileErrors.map((error, index) => (
            <span className="text-sm block " key={index}>
              {error}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImportHS
