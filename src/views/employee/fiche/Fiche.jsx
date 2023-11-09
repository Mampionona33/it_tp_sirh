import { format, parseISO } from 'date-fns'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import FormInfoGalEmployee from 'src/components/FormInfoGalEmployee'
import SalaryCalculation from 'src/components/SalaryCalculation/SalaryCalculation'
import TimeSheetTable from 'src/components/TimeSheetTable/TimeSheetTable'
// import { employeeHours, employees } from 'src/db/db'
import { employeeHours } from 'src/db/db'
import { setSelectedEmploye } from 'src/redux/selectedEmploye/selectedEmployeReducer'
import EmployeeService from 'src/services/EmployeeService'

const Fiche = () => {
  const [activeTab, setActiveTab] = useState('info-perso')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const { id, activeTabParam } = useParams()
  const dispatch = useDispatch()
  const [employees, setEmployees] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    const pathParts = location.pathname.split('/')
    const lastPathPart = pathParts[pathParts.length - 1]

    if (['info-perso', 'heures-travailles', 'bulletin-de-paie'].includes(lastPathPart)) {
      setActiveTab(lastPathPart)
    } else if (activeTabParam) {
      setActiveTab(activeTabParam)
    }
  }, [location.pathname, activeTabParam])

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
    navigate(`/employees/fiche/${id}/${eventKey}`)
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
                activeTab === 'info-perso' ? 'border-customRed-900' : ''
              }`}
              id="info-perso-tab"
              data-tabs-target="#info-perso"
              type="button"
              role="tab"
              aria-controls="info-perso"
              aria-selected={activeTab === 'info-perso'}
              onClick={() => handleTabClick('info-perso')}
            >
              Information générale
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'heures-travailles' ? 'border-customRed-900' : ''
              }`}
              id="heures-travailles-tab"
              data-tabs-target="#heures-travailles"
              type="button"
              role="tab"
              aria-controls="heures-travailles"
              aria-selected={activeTab === 'heures-travailles'}
              onClick={() => handleTabClick('heures-travailles')}
            >
              Heures travaillées
            </button>
          </li>

          <li role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'bulletin-de-paie' ? 'border-customRed-900' : ''
              }`}
              id="bulletin-de-paie-tab"
              data-tabs-target="#bulletin-de-paie"
              type="button"
              role="tab"
              aria-controls="bulletin-de-paie"
              aria-selected={activeTab === 'bulletin-de-paie'}
              onClick={() => handleTabClick('bulletin-de-paie')}
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
            activeTab === 'info-perso' ? 'block' : 'hidden'
          }`}
          id="info-perso"
          role="tabpanel"
          aria-labelledby="info-perso-tab"
        >
          {selectedEmployee !== null && <FormInfoGalEmployee id={selectedEmployee} />}
        </div>
        <div
          className={`p-4  bg-gray-50 dark:bg-gray-800 ${
            activeTab === 'heures-travailles' ? 'block' : 'hidden'
          }`}
          id="heures-travailles"
          role="tabpanel"
          aria-labelledby="heures-travailles-tab"
        >
          {selectedEmployee !== null && <TimeSheetTable id={selectedEmployee} />}
        </div>

        <div
          className={`p-4  bg-gray-50 dark:bg-gray-800 ${
            activeTab === 'bulletin-de-paie' ? 'block' : 'hidden'
          }`}
          id="bulletin-de-paie"
          role="tabpanel"
          aria-labelledby="bulletin-de-paie-tab"
        >
          {selectedEmployee !== null && <SalaryCalculation />}
        </div>
      </div>
    </div>
  )
}

export default Fiche
