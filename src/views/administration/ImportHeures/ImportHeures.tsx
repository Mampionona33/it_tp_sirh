import React, { useState } from 'react'
import CustomSection from 'src/components/CustomSection'
import ImportHS from './ImportHS'
import CustomCAlert from '@components/CustomAlert'

const ImportHeures = () => {
  const title = 'Liste des Heures'
  const [notification, setNotification] = useState<string | null>(null)

  const handleImportError = (errorMessage: string) => {
    console.log(errorMessage)
    setNotification(errorMessage)
  }

  return (
    <>
      <div>
        {notification && <CustomCAlert color="danger">{notification}</CustomCAlert>}
        <CustomSection title={title} body={<ImportHS setNotification={handleImportError} />} />
      </div>
    </>
  )
}

export default ImportHeures
