import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetcheEmpoyeur } from '../redux/employeur/employeurAction'

const DefaultLayout = () => {
  const dispatch = useDispatch()
  const employeur = useSelector((store) => store.employeur.employeur)

  useEffect(() => {
    let mount = true
    if (mount) {
      if (employeur.length === 0) {
        dispatch(fetcheEmpoyeur())
      }
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
