import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAppSelector } from './hooks/useAppDispatch'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/" />
}

export default PrivateRoute

PrivateRoute.propTypes = {
  children: PropTypes.node,
}
