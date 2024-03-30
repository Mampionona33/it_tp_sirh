import React, { useEffect, useState } from 'react'
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
    status: uploadHsStatus,
    isPaused: uploadHsIsPaused,
    isSuccess: uploadHsIsSuccess,
  } = useUploadHs()

  // const validateData = (dataArray: HsProps[]): string[] => {
  //   let messages: string[] = []

  //   if (!dataArray.length) {
  //     messages.push('Le tableau est vide.')
  //   } else {
  //     const requiredColumns = ['Matricule', 'Nom_du_terminal', 'Time']

  //     // Parcourir chaque objet dans le tableau et valider les propriétés individuelles
  //     dataArray.forEach((data, index) => {
  //       // Valider la propriété Matricule
  //       const line = index + 2
  //       if (!data.Matricule) {
  //         messages.push(`La ligne ${line} du colonne 'Matricule' ne doit pas être vide.`)
  //       }

  //       // Valider la propriété Nom_du_terminal
  //       if (!data.Nom_du_terminal) {
  //         messages.push(`La ligne ${line} du colonne 'Nom_du_terminal' ne doit pas être vide.`)
  //       } else if (!['ENTREE', 'SORTIE'].includes(data.Nom_du_terminal)) {
  //         messages.push(
  //           `La propriété 'Nom_du_terminal' de la line ${line} doit être soit 'ENTREE' ou 'SORTIE'.`,
  //         )
  //       }

  //       // Valider la propriété Time
  //       if (!data.Time) {
  //         messages.push(`La ligne ${line} du colonne 'Time' ne doit pas être vide.`)
  //       } else if (!/^(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})$/.test(data.Time)) {
  //         messages.push(
  //           `La propriété 'Time' de la line ${line} doit être au format 'DD/MM/YYYY HH:mm'.`,
  //         )
  //       }
  //     })
  //   }

  //   return messages
  // }

  const isSheetExist = (sheetName: string, mySheetData: any): boolean => {
    return mySheetData[sheetName] !== undefined
  }

  const isHeaderExist = (header: string, mySheetData: any): boolean => {
    return Object.keys(mySheetData).some((sheetName) => {
      return mySheetData[sheetName].some((row: any) => {
        return Object.keys(row).some((columnName) => columnName === header.toLowerCase())
      })
    })
  }

  const checkHeader = (header: string, dataArray: any): string | undefined => {
    if (!isHeaderExist(header, dataArray)) {
      return `La colonne ${header} est absente dans le fichier`
    }
  }

  const validateData = (dataArray: any): string[] => {
    let messages: string[] = []

    const isTafSheetPresent = isSheetExist('TAF', dataArray)

    if (!isTafSheetPresent) {
      messages.push('La feuille TAF est absente dans le fichier')
    }
    const headersToCheck = [
      'annee',
      'mois',
      'matricule',
      'name',
      'hs',
      'hsi',
      'hsni',
      'hsni130',
      'hsni150',
    ]

    headersToCheck.forEach((header) => {
      const errorMessage = checkHeader(header, dataArray)
      if (errorMessage) {
        messages.push(errorMessage)
      }
    })

    return messages
  }

  if (uploadHsIsPending) {
    console.log('uploadHsIsPending', uploadHsIsPending)
  }

  if (uploadHsIsIdle) {
    console.log('uploadHsIsIdle', uploadHsIsIdle)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    // Vérifier si un fichier a été sélectionné
    if (!file) {
      setNotification({ message: 'Veuillez sélectionner un fichier', type: 'danger' })
      return
    }

    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = async (e) => {
      const data = e.target?.result as ArrayBuffer
      const workbrook = XLSX.read(new Uint8Array(data), { type: 'array' })
      var mySheetData: { [key: string]: any[] } = {}
      var heuressup: any = {}
      for (let index = 0; index < workbrook.SheetNames.length; index++) {
        const sheetName = workbrook.SheetNames[index]
        const workSheet = workbrook.Sheets[sheetName]
        const parseData = XLSX.utils.sheet_to_json(workSheet)
        mySheetData[sheetName] = parseData
      }
      heuressup = mySheetData.TAF
      setHeures(mySheetData.test)

      console.log(heuressup)

      const validationErrors = validateData(mySheetData)

      if (validationErrors.length > 0) {
        setFileErrors(validationErrors)
        return
      }

      try {
        await uploadHsData(heuressup)
        setNotification({ message: 'Les heures ont été importées avec succès.', type: 'success' })
      } catch (error) {
        setNotification({ message: formatError(uploadHsError), type: 'danger' })
      }
    }
  }

  return (
    <form onSubmit={handleUpload}>
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
              <ButtonWithIcon type="submit" label="Importer" />
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
    </form>
  )
}

export default ImportHS
