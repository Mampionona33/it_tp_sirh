import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch } from 'react-redux'
import { fetchAllCotisations } from 'src/redux/cotisations/cotisationsActions'
import { fetchAllEmployees } from '@src/redux/employees/employeesAction'
import { fetchCategorieEmployes } from '@src/redux/categorieEmploye/CategorieEmployeActions'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '@src/hooks/useAppDispatch'
// import { fetcheEmpoyeur } from '../redux/employeur/employeurAction'
// import { addNotification } from 'src/redux/notificationStack/notificationStackReducer'
// import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

const DefaultLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const pathName = location.pathname
  const {
    employeur,
    loading: loadingEmployeur,
    error: errorOnFetchEmployeur,
  } = useAppSelector((store) => store.employeur)
  const { loading: loadingCotisation, error: errorOnFetchCotisation } = useAppSelector(
    (store) => store.cotisations,
  )
  const { list: listEmployees, loading: loadingListEmployees } = useAppSelector(
    (store) => store.employeesList,
  )
  const { loading: loadingCategorieEmploye, error: errorOnFetchCategorieEmploye } = useAppSelector(
    (store) => store.cateogieEmploye,
  )

  useEffect(() => {
    let mount = true

    const fetchAllData = async () => {
      try {
        if (loadingListEmployees === 'idle') {
          const respAllEmployees = await dispatch(fetchAllEmployees())
        }
        if (loadingEmployeur === 'idle') {
          const respCategorieEmployes = await dispatch(fetchCategorieEmployes())
        }
        if (loadingCotisation === 'idle') {
          const respAllCotisations = await dispatch(fetchAllCotisations())
        }
        if (loadingCategorieEmploye === 'idle' && mount) {
          const respAllCategorieEmployes = await dispatch(fetchCategorieEmployes())
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (mount) {
      fetchAllData()
    }

    return () => {
      mount = false
    }
  }, [dispatch, loadingListEmployees, loadingEmployeur, loadingCotisation, loadingCategorieEmploye])

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
