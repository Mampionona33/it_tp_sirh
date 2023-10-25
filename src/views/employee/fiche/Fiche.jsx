import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FormInfoGalEmployee from 'src/components/FormInfoGalEmployee'
import NormalHours from 'src/components/NormalHours'

const Fiche = () => {
  const [activeTab, setActiveTab] = useState('profile') // Définissez l'onglet actif par défaut ici
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const params = useParams()

  const handleTabClick = (eventKey) => {
    setActiveTab(eventKey)
  }

  React.useEffect(() => {
    let mount = true
    if (params) {
      if (mount) {
        setSelectedEmployee(parseInt(params.id))
      }
    }
    return () => {
      mount = false
    }
  }, [params])

  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'profile' ? 'border-blue-500' : ''
              }`}
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected={activeTab === 'profile'}
              onClick={() => handleTabClick('profile')}
            >
              Information générale
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'dashboard' ? 'border-blue-500' : ''
              }`}
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected={activeTab === 'dashboard'}
              onClick={() => handleTabClick('dashboard')}
            >
              Heures normales
            </button>
          </li>
          <li role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'settings' ? 'border-blue-500' : ''
              }`}
              id="settings-tab"
              data-tabs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected={activeTab === 'settings'}
              onClick={() => handleTabClick('settings')}
            >
              Heures supplémentaires
            </button>
          </li>
        </ul>
      </div>
      <div id="myTabContent">
        <div
          className={`p-4  bg-gray-50 dark:bg-gray-800 ${
            activeTab === 'profile' ? 'block' : 'hidden'
          }`}
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {selectedEmployee !== null && <FormInfoGalEmployee id={selectedEmployee} />}
        </div>
        <div
          className={`p-4  bg-gray-50 dark:bg-gray-800 ${
            activeTab === 'dashboard' ? 'block' : 'hidden'
          }`}
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          {selectedEmployee !== null && <NormalHours id={selectedEmployee} />}
        </div>
        <div
          className={`p-4  bg-gray-50 dark:bg-gray-800 ${
            activeTab === 'settings' ? 'block' : 'hidden'
          }`}
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          Heures supplémentaires {selectedEmployee}
        </div>
      </div>
    </div>
  )
}

export default Fiche
