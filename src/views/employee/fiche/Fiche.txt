import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import FormInfoGalEmployee from 'src/components/FormInfoGalEmployee'
import SalaryCalculation from 'src/components/SalaryCalculation/SalaryCalculation'
import TimeSheetTable from 'src/components/TimeSheetTable/TimeSheetTable_'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'

const Fiche: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('info-perso')
  const { id, activeTabParam } = useParams()
  const dispatch = useDispatch()
  const employees = useSelector((state: any) => state.employeesList.list)
  const location = useLocation()
  const navigate = useNavigate()
  const selectedEmployee = useSelector((state: any) => state.bulletinDePaie.salarie)

  useEffect(() => {
    const pathParts = location.pathname.split('/')
    const lastPathPart = pathParts[pathParts.length - 1]

    if (['info-perso', 'heures-travailles', 'bulletin-de-paie'].includes(lastPathPart)) {
      setActiveTab(lastPathPart)
    } else if (activeTabParam) {
      setActiveTab(activeTabParam)
    }
  }, [location.pathname, activeTabParam])

  const handleTabClick = (eventKey: string) => {
    setActiveTab(eventKey)
    navigate(`/employees/fiche/${id}/${eventKey}`)
  }

  const tabList = [
    { key: 'info-perso', label: 'Information générale' },
    { key: 'heures-travailles', label: 'Heures travaillées' },
    { key: 'bulletin-de-paie', label: 'Calcul paie' },
  ]

  useEffect(() => {
    let mount = true

    if (id && employees && mount) {
      const emp = employees.find((empl: any) => empl.id === parseInt(id, 10))

      if (emp) {
        const salaireBase = emp.salaireBase * 1
        dispatch(setBulletinDePaie({ salarie: { ...emp } }))
        dispatch(setBulletinDePaie({ salaireDeBase: salaireBase }))
      }
    }

    return () => {
      mount = false
    }
  }, [id, employees, dispatch])

  const renderTab = (tab: { key: string; label: string }) => (
    <li key={tab.key} className="mr-2" role="presentation">
      <button
        className={`inline-block p-4 border-b-2 rounded-t-lg ${
          activeTab === tab.key ? 'border-customRed-900' : ''
        }`}
        id={`${tab.key}-tab`}
        data-tabs-target={`#${tab.key}`}
        type="button"
        role="tab"
        aria-controls={tab.key}
        aria-selected={activeTab === tab.key}
        onClick={() => handleTabClick(tab.key)}
      >
        {tab.label}
      </button>
    </li>
  )

  const renderTabContent = (tabKey: string): JSX.Element | null => {
    switch (tabKey) {
      case 'info-perso':
        return <FormInfoGalEmployee />
      case 'heures-travailles':
        return <TimeSheetTable />
      case 'bulletin-de-paie':
        return <SalaryCalculation />
      default:
        return null
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          role="tablist"
        >
          {tabList.map(renderTab)}
        </ul>
      </div>
      {/* Tab contents */}
      <div id="myTabContent">
        {tabList.map((tab) => (
          <div
            key={tab.key}
            className={`p-4 bg-gray-50 dark:bg-gray-800 ${
              activeTab === tab.key ? 'block' : 'hidden'
            }`}
            id={tab.key}
            role="tabpanel"
            aria-labelledby={`${tab.key}-tab`}
          >
            {selectedEmployee !== null && renderTabContent(tab.key)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Fiche
