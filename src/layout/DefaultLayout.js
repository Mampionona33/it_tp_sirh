import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetcheEmpoyeur } from '../redux/employeur/employeurAction'
import { addNotification } from 'src/redux/notificationStack/notificationStackReducer'
import { fetchAllCotisations } from 'src/redux/cotisations/cotisationsActions'
import { fetchAllEmployees } from '@src/redux/employees/employeesAction'
import { fetchCategorieEmployes } from '@src/redux/categorieEmploye/CategorieEmployeActions'
import { useLocation } from 'react-router-dom'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

const DefaultLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const pathName = location.pathname
  const employeur = useSelector((store) => store.employeur.employeur)
  const errorOnFetchEmployeur = useSelector((store) => store.employeur.error)
  const [createErrorNotification, setCreateErrorNotification] = useState(false)

  useEffect(() => {
    let mount = true

    const fetchAllData = async () => {
      try {
        const respEmployeur = await dispatch(fetcheEmpoyeur())
        const respAllCotisations = await dispatch(fetchAllCotisations())
        const respAllEmployees = await dispatch(fetchAllEmployees())
        const respAllCategorieEmployes = await dispatch(fetchCategorieEmployes())

        if (respEmployeur && respAllCotisations && respAllEmployees && respAllCategorieEmployes) {
          console.log(respEmployeur, respAllCotisations, respAllEmployees, respAllCategorieEmployes)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (mount && employeur.) {
      fetchAllData()
    }

    return () => {
      mount = false
    }
  }, [dispatch, employeur])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
