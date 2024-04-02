import CustomCAlert from '@src/components/CustomAlert'
import CustomSection from '@src/components/CustomSection'
import CustomSection_v2 from '@src/components/CustomSection_v2'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import InlineLoading from '@src/components/loadings/InlineLoading'
import React from 'react'

const ImportEmploye = () => {
  const [file, setFile] = React.useState<File | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [notification, setNotification] = React.useState<{
    message: string
    type?: string
  } | null>()

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setIsLoading(true)
    const reader = new FileReader()
    if (!file) {
      setNotification({ message: 'Veuillez sélectionner un fichier', type: 'danger' })
      return
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div>
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
  )
}

export default ImportEmploye
