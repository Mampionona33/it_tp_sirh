import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetcheEmpoyeur } from '../redux/employeur/employeurAction'
import { addNotification } from 'src/redux/notificationStack/notificationStackReducer'

const DefaultLayout = () => {
  const dispatch = useDispatch()
  const errorFetchEmployeur = useSelector((store) => store.employeur.error)

  console.log(errorFetchEmployeur)

  useEffect(() => {
    let mount = true
    if (mount) {
      dispatch(fetcheEmpoyeur())
      // if (errorFetchEmployeur) {
      //   dispatch(
      //     addNotification({
      //       title: "Récupération des informations de l'employeur",
      //       message: "Erreur lors de la récupération des données de l'employeur",
      //       type: 'error',
      //     }),
      //   )
      // }
    }
    return () => {
      mount = false
    }
  }, [dispatch, errorFetchEmployeur])

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
