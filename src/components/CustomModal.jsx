import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tooltip as ReactTooltip } from 'react-tooltip'

function CustomModal({ modalTitle, iconBtnActivation, totltipText, children }) {
  const [visible, setVisible] = useState(false)

  const handleClickBtn = () => {
    setVisible(!visible)
  }

  return (
    <>
      <button data-tooltip-id="btn-tooltip" onClick={handleClickBtn}>
        <span className="material-icons-outlined">{iconBtnActivation}</span>
      </button>
      {!visible && <ReactTooltip id="btn-tooltip" place="bottom" content={totltipText} />}

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CForm>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">{modalTitle}</CModalTitle>
          </CModalHeader>
          <CModalBody>{children}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Annuler
            </CButton>
            <CButton color="danger">Valider</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

CustomModal.propTypes = {
  modalTitle: PropTypes.string,
  iconBtnActivation: PropTypes.string,
  totltipText: PropTypes.string,
  children: PropTypes.node,
}

export default CustomModal
