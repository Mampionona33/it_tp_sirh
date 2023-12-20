import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { BellIcon, ListBulletIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { toggleSidebar } from 'src/redux/sidebar/sidebarReducer'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-2 py-1">
      <div className="w-full flex flex-row ">
        <CHeaderToggler
          className="ps-1"
          // onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          onClick={() => dispatch(toggleSidebar())}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <Link to={`/dashboard`} className="btn btn-link text-decoration-none ">
              Accueil
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/employee/list`} className="btn btn-link text-decoration-none ">
              Employés
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/#`} className="btn btn-link text-decoration-none ">
              Etats divers
            </Link>
          </CNavItem>

          <CNavItem>
            <Link to={`/#`} className="btn btn-link text-decoration-none ">
              Administration
            </Link>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          {/* <CNavItem>
            <Link to={`/#`} className="btn btn-link text-decoration-none ">
              <BellIcon className="text-customRed-900 w-6 h-6" />
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/#`} className="btn btn-link text-decoration-none ">
              <ListBulletIcon className="text-customRed-900 w-6 h-6" />
            </Link>
          </CNavItem>
          <CNavItem>
            <Link to={`/#`} className="btn btn-link text-decoration-none ">
              <EnvelopeIcon className="text-customRed-900 w-6 h-6" />
            </Link>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </div>
      <CHeaderDivider className="my-1 py-1" />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
