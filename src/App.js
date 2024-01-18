import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate, HashRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import './scss/style.scss'
import NotificationStack from './components/NotificationStack/NotificationStack'
import { store } from './redux/store'
import lazyWithRetry from './utils/lazyWithRetry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = lazyWithRetry(() => import('./layout/DefaultLayout'))

// Pages
const Login = lazyWithRetry(() => import('./views/pages/login/Login'))
const Register = lazyWithRetry(() => import('./views/pages/register/Register'))
const Page404 = lazyWithRetry(() => import('./views/pages/page404/Page404'))
const Page500 = lazyWithRetry(() => import('./views/pages/page500/Page500'))

class App extends Component {
  constructor(props) {
    super(props)
    this.pathname = window.location.pathname
    this.isAuth = store.getState().auth.isAuthenticated

    this.queryClient = new QueryClient()
  }

  render() {
    // ajout comment
    return (
      <QueryClientProvider client={this.queryClient}>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route
                path="/"
                element={
                  this.isAuth ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route
                path="*"
                element={
                  <PrivateRoute>
                    <DefaultLayout />
                    <NotificationStack />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    )
  }
}

export default App
