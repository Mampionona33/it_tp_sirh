import { format, parseISO } from 'date-fns'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import FormInfoGalEmployee from 'src/components/FormInfoGalEmployee'
import SalaryCalculation from 'src/components/SalaryCalculation/SalaryCalculation'
import TimeSheetTable from 'src/components/TimeSheetTable/TimeSheetTable'
import { setSelectedEmploye } from 'src/redux/selectedEmploye/selectedEmployeReducer'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import EmployeeService from 'src/services/EmployeeService'

const Fiche = () => {
  const [activeTab, setActiveTab] = useState('info-perso')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const { id, activeTabParam } = useParams()
  const dispatch = useDispatch()
  const [employees, setEmployees] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const pathParts = location.pathname.split('/')
    const lastPathPart = pathParts[pathParts.length - 1]

    if (['info-perso', 'heures-travailles', 'bulletin-de-paie'].includes(lastPathPart)) {
      setActiveTab(lastPathPart)
    } else if (activeTabParam) {
      setActiveTab(activeTabParam)
    }
  }, [location.pathname, activeTabParam])

  useEffect(() => {
    let mount = true
    if (mount) {
      EmployeeService.getAll()
        .then((resp) => {
          // console.log(resp.data)
          setEmployees(resp.data)
        })
        .catch((err) => console.log(err))
    }
    return () => {
      mount = false
    }
  }, [])

  const handleTabClick = (eventKey) => {
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
    if (id && mount) {
      setSelectedEmployee(id)
    }
    return () => {
      mount = false
    }
  }, [id])

  useEffect(() => {
    let mount = true

    if (id && employees) {
      const emp = employees.find((empl) => empl.id === id)
      if (emp && mount) {
        dispatch(
          setSelectedEmploye({
            ...emp,
            nom: emp.nom ? emp.nom : '',
            prenom: emp.prenom ? emp.prenom : '',
            dateEmbauche: emp.dateEmbauche ? format(parseISO(emp.dateEmbauche), 'yyyy-MM-dd') : '',
          }),
        )
      }
      if (emp && mount) {
        dispatch(
          setBulletinDePaie({
            salarie: {
              ...emp,
              nom: emp && emp.nom ? emp.nom : '',
              prenom: emp && emp.prenom ? emp.prenom : '',
            },
          }),
        )
      }
    }

    return () => {
      mount = false
    }
  }, [id, employees, dispatch])

  const renderTab = (tab) => (
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

  function renderTabContent(tabKey) {
    switch (tabKey) {
      case 'info-perso':
        return <FormInfoGalEmployee id={selectedEmployee} />
      case 'heures-travailles':
        return <TimeSheetTable id={selectedEmployee} />
      case 'bulletin-de-paie':
        return <SalaryCalculation />
      default:
        return null
    }
  }
}

export default Fiche
