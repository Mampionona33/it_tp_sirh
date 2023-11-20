import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import isAuthenticated from './auth'
import PropTypes from 'prop-types'

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default PrivateRoute

PrivateRoute.propTypes = {
  children: PropTypes.node,
}
