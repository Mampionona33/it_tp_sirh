import { format, parseISO } from 'date-fns'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import FormInfoGalEmployee from 'src/components/FormInfoGalEmployee'
import SalaryCalculation from 'src/components/SalaryCalculation/SalaryCalculation'
import TimeSheetTable from 'src/components/TimeSheetTable/TimeSheetTable'
// import { employeeHours, employees } from 'src/db/db'
import { employeeHours } from 'src/db/db'
import { setSelectedEmploye } from 'src/redux/selectedEmploye/selectedEmployeReducer'
import EmployeeService from 'src/services/EmployeeService'

const Fiche = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [employees, setEmployees] = useState([])

  React.useEffect(() => {
    let mount = true
    if (mount) {
      EmployeeService.getAll()
        .then((resp) => {
          console.log(resp.data)
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
  }

  const selectedEmpHours =
    employeeHours && employeeHours.filter((emH) => emH.employee.id === selectedEmployee)
  const heureNormalArray = selectedEmpHours && selectedEmpHours.map((heurs) => heurs.normalHours)

  React.useEffect(() => {
    let mount = true
    if (id) {
      if (mount) {
        setSelectedEmployee(id)
      }
    }
    return () => {
      mount = false
    }
  }, [id])

  React.useEffect(() => {
    let mount = true

    if (id && employees) {
      const emp = employees.find((empl) => empl.id == id)
      if (emp && mount) {
        dispatch(
          setSelectedEmploye({
            ...emp,
            nom: emp.name.nom ? emp.name.nom : '',
            prenom: emp.name.prenom ? emp.name.prenom : '',
            dateEmbauche: emp.dateEmbauche ? format(parseISO(emp.dateEmbauche), 'yyyy-MM-dd') : '',
          }),
        )
      }
    }

    return () => {
      mount = false
    }
  }, [id, employees])

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
              Bulletin de paie
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
          {selectedEmployee !== null && <SalaryCalculation />}
        </div>
      </div>
    </div>
  )
}

export default Fiche
