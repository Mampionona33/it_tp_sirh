import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch } from 'react-redux'
import { fetcheEmpoyeur } from '../redux/employeur/employeurAction'

const DefaultLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let mount = true
    if (mount) {
      dispatch(fetcheEmpoyeur())
    }
    return () => {
      mount = false
    }
  }, [dispatch])

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
