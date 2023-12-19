import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from '@pages/Login/Login'
import DefaultLayout from '@pages/DefaultLayout/DefaultLayout'

const App: React.FC = () => {
  const isAuht = useSelector((state: any) => state.auth.isAuthenticated)
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultLayout />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
