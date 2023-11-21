import React from 'react'
import { Navigate } from 'react-router-dom'
import isAuthenticated from './auth'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoute

PrivateRoute.propTypes = {
  children: PropTypes.node,
}
