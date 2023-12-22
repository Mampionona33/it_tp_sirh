import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetcheEmpoyeur } from '../redux/employeur/employeurAction'
import { addNotification } from 'src/redux/notificationStack/notificationStackReducer'
import { fetchAllCotisations } from 'src/redux/cotisations/cotisationsActions'
import { fetchAllEmployees } from '@src/redux/employees/employeesAction'
import { fetchCategorieEmployes } from '@src/redux/categorieEmploye/CategorieEmployeActions'

const DefaultLayout = () => {
  const dispatch = useDispatch()
  const employeur = useSelector((store) => store.employeur.employeur)
  const errorOnFetchEmployeur = useSelector((store) => store.employeur.error)
  const [createErrorNotification, setCreateErrorNotification] = useState(false)

  useEffect(() => {
    let mount = true
    if (employeur.length === 0) {
      if (mount) {
        dispatch(fetcheEmpoyeur())
      }
    }
    if (mount) {
      dispatch(fetchAllCotisations())
      dispatch(fetchAllEmployees())
      dispatch(fetchCategorieEmployes())
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
