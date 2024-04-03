import CustomCAlert from '@src/components/CustomAlert'
import CustomSection_v2 from '@src/components/CustomSection_v2'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import InlineLoading from '@src/components/loadings/InlineLoading'
import { createValidator } from 'zod-xlsx'
import React from 'react'
import * as XLSX from 'xlsx'
import employeSchema from '@src/schema/importEmployeSchema'

const ImportEmploye = () => {
  const [file, setFile] = React.useState<File | undefined>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [validationErrors, setValidationErrors] = React.useState<string[]>([])
  const [notification, setNotification] = React.useState<{
    message: string
    type?: string
  } | null>()

  const isDoublonInArray = (txt: string, data: any[]): boolean => {
    const temp: any[] = []
    data.forEach((item) => {
      temp.push(item['data'][txt])
    })
    console.log(temp)
    // Vérifier s'il y a des doublons dans le tableau temporaire
    const uniqueSet = new Set(temp)
    return uniqueSet.size !== temp.length
  }

  /**
   * Vérifier les doublons dans le tableau
   * @param columnName Nom de la colonne à traiter
   * @param data Tableau à traiter
   * @param message Message d'érreur
   * @param type Type d'erreur
   */
  const setNotificationForDuplicates = (columnName: string, data: any[], message: string) => {
    if (isDoublonInArray(columnName, data)) {
      setValidationErrors((prev) => [...prev, message])
    }
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setIsLoading(true)
    const reader = new FileReader()
    if (!file) {
      setNotification({ message: 'Veuillez sélectionner un fichier', type: 'danger' })
      return
    }
    reader.readAsArrayBuffer(file)
    reader.onload = async (e) => {
      const data = e.target?.result as ArrayBuffer
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' })

      const validator = createValidator(workbook)
      const result = validator.validate(employeSchema)
      const validResult = result.valid
      const invalidResult = result.invalid

      if (invalidResult.length > 0) {
        console.log(invalidResult)
        const errorMessages: string[] = []
        invalidResult.forEach((item, key) => {
          item.issues.forEach((issue) => {
            const newMessage = `Ligne ${key + 1} : ${issue.message}`
            errorMessages.push(newMessage)
          })
        })
        setValidationErrors((prev) => [...prev, ...errorMessages])
      }

      if (invalidResult.length === 0 && validResult.length > 0) {
        setNotificationForDuplicates(
          'num_cnaps',
          validResult,
          'Il y a des doublons dans la colonne num_cnaps',
        )
        setNotificationForDuplicates(
          'matricule',
          validResult,
          'Il y a des doublons dans la colonne matricule',
        )
        setNotificationForDuplicates(
          'num_cin',
          validResult,
          'Il y a des doublons dans la colonne num_cin',
        )
        setNotificationForDuplicates('rib', validResult, 'Il y a des doublons dans la colonne rib')
      }

      const isWorksheetListEmploye = workbook.SheetNames.includes('liste_employee')

      if (!isWorksheetListEmploye) {
        setNotification({
          message: 'La feuille liste_employee est absente dans le fichier',
          type: 'danger',
        })
        return
      }

      const mySheetData: any[] = XLSX.utils.sheet_to_json(workbook.Sheets['liste_employee'])

      // Convertir les champs "categorie" et "mode_paiement_salaire" en objets avec les labels et les valeurs,
      // en supprimant les champs "categorie/label" et "mode_paiement_salaire/label"
      const convertedData = mySheetData.map((item: any) => {
        const {
          'categorie/label': catLabel,
          'categorie/value': catValue,
          'mode_paiement_salaire/label': modeLabel,
          'mode_paiement_salaire/value': modeValue,
          ...rest
        } = item
        return {
          ...rest,
          categorie: {
            label: catLabel,
            value: catValue,
          },
          mode_paiement_salaire: {
            label: modeLabel,
            value: modeValue,
          },
        }
      })

      console.log(convertedData)
    }
  }

  React.useEffect(() => {
    if (validationErrors.length > 0) {
      setIsLoading(false)
    }
  }, [validationErrors])

  return (
    <div>
      <div className="flex gap-1">
        {notification && (
          <CustomCAlert onClose={() => setNotification(null)} color={notification.type || 'info'}>
            {notification.message}
          </CustomCAlert>
        )}

        <CustomSection_v2 title="Importer Employé">
          <form action="" method="post" className="flex flex-col" onSubmit={handleSubmit}>
            <div className="p-4 flex flex-col md:flex-row items-center md:items-end gap-2 ">
              <div className="import">
                <label htmlFor="formFileSm" className="text-lg">
                  Importer une liste des employés
                </label>
                <div className="flex flex-row gap-2 flex-wrap">
                  <div>
                    <input
                      className="form-control form-control-sm"
                      id="formFileSm"
                      required
                      type="file"
                      accept=".xlsx"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFile(e.target.files?.[0])
                      }}
                    />
                  </div>
                  {isLoading ? (
                    <div className="flex justify-center w-24 h-4">
                      <InlineLoading />
                    </div>
                  ) : (
                    <div>
                      <ButtonWithIcon type="submit" label="Importer" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </CustomSection_v2>
      </div>

      {validationErrors.length > 0 && (
        <div className="p-4 flex gap-2 flex-col">
          {validationErrors.map((error, index) => (
            <div key={index} className="p-2 bg-red-200 text-red-700 rounded">
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImportEmploye
