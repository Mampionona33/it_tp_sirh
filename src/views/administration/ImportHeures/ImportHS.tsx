import React, { useCallback, useEffect, useState } from 'react'
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
import { useMutation } from '@tanstack/react-query'
import heureService from '@src/services/HeureService'

function ImportHS({ setNotification, notification }: ImportHsProps) {
  const [heures, setHeures] = useState<any[]>([])
  const [file, setFile] = useState<File | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const formatError = useErrorFormatter()
  const [fileErrors, setFileErrors] = useState<string[]>([])

  const mutation = useMutation({
    mutationFn: async (data: HsProps[]) => {
      try {
        const response = await heureService.uploadHsData(data)
        return response
      } catch (error) {
        throw error
      }
    },

    onError: (error) => {
      setNotification({
        message: formatError(error),
        type: 'danger',
      })
      setIsLoading(false)
    },
    onSuccess: () => {
      setNotification({
        message: 'Heures importées avec succes',
        type: 'success',
      })
      setIsLoading(false)
    },
  })

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
        return Object.keys(row).some((columnName) => columnName === header)
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

  const handleUpload = (e: React.FormEvent) => {
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

      const isTafSheetPresent = workbrook.SheetNames.includes('TAF')

      var mySheetData: { [key: string]: any[] } = {}
      var heuressup: any = {}

      if (!isTafSheetPresent) {
        setNotification({ message: 'La feuille TAF est absente dans le fichier', type: 'danger' })
        return
      }

      for (let index = 0; index < workbrook.SheetNames.length; index++) {
        const sheetName = workbrook.SheetNames[index]
        const workSheet = workbrook.Sheets[sheetName]

        if (sheetName === 'TAF') {
          const parseData = XLSX.utils.sheet_to_json(workSheet)
          mySheetData[sheetName] = parseData
        }
      }

      heuressup = mySheetData.TAF
      setHeures(mySheetData.test)

      const validationErrors = validateData(mySheetData)

      if (validationErrors.length > 0) {
        setFileErrors(validationErrors)
        return
      }

      // uploadHsData.arguments(heuressup)
      mutation.mutate(heuressup)
    }
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 8000)

      // Nettoyer le timer lorsque le composant est démonté ou que la notification change
      return () => clearTimeout(timer)
    }
    if (mutation.isPending) {
      setIsLoading(true)
    }
  }, [notification, setNotification, mutation])

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
          {isLoading ? (
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
