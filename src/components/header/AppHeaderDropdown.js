import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilAccountLogout,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useDispatch } from 'react-redux'
import { setUserLoggedOut } from 'src/redux/user/authReducer'
import { resetParametreCalendrier } from 'src/redux/parametreCalendrier/parametreCalendrierReducer'
import { resetBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import { useNavigate } from 'react-router-dom'
import { resetDns } from 'src/redux/dns/dnsReducers'
import { resetEmployeur } from 'src/redux/employeur/employeurReducer'
import { resetCotisation } from 'src/redux/cotisations/cotisationsReducer'
import { resetEmployHours } from '@src/redux/employeHours/employeHoursReducer'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickLogout = (ev) => {
    ev.preventDefault()
    dispatch(resetDns())
    dispatch(resetEmployeur())
    dispatch(resetBulletinDePaie())
    dispatch(resetParametreCalendrier())
    dispatch(resetCotisation())
    dispatch(setUserLoggedOut())
    dispatch(resetEmployHours())
    navigate('/login')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {/* <CAvatar src={avatar8} size="md" /> */}
        <div className="rounded-full bg-customBlue-400 p-1 items-center w-10 h-10 flex justify-center">
          <CIcon icon={cilUser} size="lg" className="text-white" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownDivider /> */}
        <CDropdownItem className="cursor-pointer" onClick={handleClickLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log out
        </CDropdownItem>
        <CDropdownDivider />
        {/* <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
