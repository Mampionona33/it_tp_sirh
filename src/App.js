import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import { Provider } from 'react-redux'
import './scss/style.scss'
import { store } from './redux/store'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route
                path="*"
                element={
                  <PrivateRoute>
                    <DefaultLayout />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App
