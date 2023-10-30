import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FormInfoGalEmployee from 'src/components/FormInfoGalEmployee'
// import NormalHours from 'src/components/NormalHours'
import TimeSheetTable from 'src/components/TimeSheetTable/TimeSheetTable'
import { employeeHours } from 'src/db/db'

const Fiche = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const params = useParams()

  const handleTabClick = (eventKey) => {
    setActiveTab(eventKey)
  }

  const selectedEmpHours =
    employeeHours && employeeHours.filter((emH) => emH.employee.id === selectedEmployee)
  const heureNormalArray = selectedEmpHours && selectedEmpHours.map((heurs) => heurs.normalHours)

  React.useEffect(() => {
    let mount = true
    if (params) {
      if (mount) {
        setSelectedEmployee(params.id)
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
                activeTab === 'profile' ? 'border-customRed-900' : ''
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
                activeTab === 'dashboard' ? 'border-customRed-900' : ''
              }`}
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected={activeTab === 'dashboard'}
              onClick={() => handleTabClick('dashboard')}
            >
              Heures travaillées
            </button>
          </li>

          <li role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'settings' ? 'border-customRed-900' : ''
              }`}
              id="settings-tab"
              data-tabs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected={activeTab === 'settings'}
              onClick={() => handleTabClick('settings')}
            >
              IRSA / OSTIE / CNAPS
            </button>
          </li>
        </ul>
      </div>
      {/* Tab contents */}
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
          {/* {selectedEmployee !== null && <NormalHours id={selectedEmployee} />} */}
          {selectedEmployee !== null && <TimeSheetTable id={selectedEmployee} />}
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
