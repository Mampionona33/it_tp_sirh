import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from 'src/assets/images/LogoLs.png'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthService from 'src/services/AuthService'
import { useDispatch } from 'react-redux'
import { setUserLoggedIn } from 'src/redux/user/authReducer'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const authService = new AuthService()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    try {
      const resp = await authService.login(username, password)
      if (resp && resp === 'Connecté') {
        dispatch(setUserLoggedIn({ username: username }))
        navigate('/dashboard')
      } else {
        alert('Mots de passe ou identifiant incorrect')
      }
    } catch (error) {
      console.log(error)
    }

    setUsername('')
    setPassword('')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="danger" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <div className="flex flex-col">
                      <div className="flex justify-center">
                        <img src={Logo} alt="Logo" className="w-4/12" />
                      </div>
                      <p>
                        {`Intranet de gestion des paies, et des déclarations administratives
                      (CNAPS, OSIE, Impôts)`}
                      </p>
                    </div>
                    <Link to="/register">
                      <CButton color="danger" className="mt-3 " active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
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
