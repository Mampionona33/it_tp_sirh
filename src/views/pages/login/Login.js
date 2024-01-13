import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import Logo from 'src/assets/images/LogoLs.png'
import {
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
import { setUserLoggedIn } from 'src/redux/user/authReducer'
import { useNavigate } from 'react-router-dom'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import { loggedUser } from '@src/redux/user/authActions'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import Loading from '@src/components/Loading'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loading } = useAppSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    try {
      // const resp = await authService.login(username, password)
      const resp = await dispatch(loggedUser({ email: username, password: password }))
      console.log(resp)
      if (resp && resp.meta.requestStatus === 'fulfilled') {
        dispatch(setUserLoggedIn({ email: username, password: password }))
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

  // if (loading === 'pending') {
  //   return <p>Loading...</p>
  // }

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
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {loading === 'pending' ? (
                          <div className="w-5 h-5">
                            <Loading />
                          </div>
                        ) : (
                          <ButtonWithIcon type="submit" label="Login" />
                        )}
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
                    {/* <Link to="/register">
                      <CButton color="danger" className="mt-3 " active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
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
