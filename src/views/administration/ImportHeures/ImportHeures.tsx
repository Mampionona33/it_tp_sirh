import React, { useState } from 'react'
import CustomSection from 'src/components/CustomSection'
import ImportHS from './ImportHS'
import CustomCAlert from '@components/CustomAlert'

const ImportHeures = () => {
  const title = 'Liste des Heures'
  const [notification, setNotification] = useState<{ message: string; type?: string } | null>(null)

  const handleNotification = (notificationData: { message: string; type?: string } | null) => {
    setNotification(notificationData)
  }

  return (
    <>
      <div>
        {notification && (
          <CustomCAlert onClose={() => setNotification(null)} color={notification.type || 'info'}>
            {notification.message}
          </CustomCAlert>
        )}
        <CustomSection
          title={title}
          body={<ImportHS setNotification={handleNotification} notification={notification} />}
        />
      </div>
    </>
  )
}

export default ImportHeures
