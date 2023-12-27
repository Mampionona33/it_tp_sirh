import React, { useState, ReactNode } from 'react'
import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

interface CustomModalProps {
  modalTitle: string
  iconBtnActivation?: string
  totltipText?: string
  children: ReactNode
  handleSubMission: (ev: React.FormEvent) => void
}

const AppModal: React.FC<CustomModalProps> = ({
  modalTitle,
  iconBtnActivation,
  totltipText,
  children,
  handleSubMission,
}) => {
  const [visible, setVisible] = useState(false)

  const handleClickBtn = () => {
    setVisible(!visible)
  }

  const handleClose = () => {
    setVisible(false)
  }

  const handleSub = (ev: React.FormEvent) => {
    ev.preventDefault()
    handleSubMission(ev)
    handleClose()
  }

  return (
    <>
      <button data-tooltip-id="btn-tooltip" onClick={handleClickBtn}>
        <span className="material-icons-outlined">{iconBtnActivation}</span>
      </button>
      {!visible && <ReactTooltip id="btn-tooltip" place="bottom" content={totltipText} />}

      <CModal
        visible={visible}
        onClose={handleClose}
        size="lg"
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CForm onSubmit={handleSub}>
          <CModalHeader>
            <CModalTitle id="LiveDemoExampleLabel">{modalTitle}</CModalTitle>
          </CModalHeader>
          <CModalBody>{children}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleClose}>
              Annuler
            </CButton>
            <CButton type="submit" color="danger">
              Valider
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default AppModal
