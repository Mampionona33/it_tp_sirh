import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { Link } from 'react-router-dom'
import Logo from 'src/assets/images/LogoLs.png'
import {
  CAlert,
  // CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { setUserLoggedIn, setUserLoggedOut } from 'src/redux/user/authReducer'
import { useNavigate } from 'react-router-dom'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import { loggedUser } from '@src/redux/user/authActions'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import Loading from '@src/components/Loading'
import { AxiosError } from 'axios'
import useErrorFormatter from '@src/hooks/useErrorFormatter'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error } = useAppSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errorMessageFormatter = useErrorFormatter()

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    try {
      await dispatch(loggedUser({ email: username, password: password }))
    } catch (error) {
      throw error
    }

    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    let mount = true
    if (loading === 'succeeded') {
      dispatch(setUserLoggedIn({ email: username, password: password }))
      navigate('/dashboard')
    }

    return () => {
      mount = false
    }
  }, [loading, dispatch, navigate, username, password, error])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        {error && <CAlert color="danger">{errorMessageFormatter(error)}</CAlert>}
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CFormLabel hidden htmlFor="username">
                      username
                    </CFormLabel>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        id="username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        id="password"
                        required
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <div className="flex items-center">
                          {loading === 'pending' ? (
                            <Loading width="w-6" height="h-6" />
                          ) : (
                            <ButtonWithIcon type="submit" label="Login" className="w-full" />
                          )}
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 w-full">
                <CCardBody className="text-center">
                  <div>
                    <h2 className="capitalize text-lg">la ligne scandinave</h2>
                    <div className="flex flex-col">
                      <div className="flex justify-center">
                        <img src={Logo} alt="Logo" className="w-24" />
                      </div>
                      <p>
                        {`Intranet de gestion des paies, et des déclarations administratives
                      (CNAPS, OMSI, Impôts)`}
                      </p>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
