import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import {
  CTooltip,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CButton,
} from '@coreui/react'

const TableModal = (props) => {
  const [visible, setVisible] = useState(false)
  const [formValidate, setFormValidate] = useState(false)

  const handleSubmitModal = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    for (let index = 0; index < form.length; index++) {
      const element = form[index]
      if (element.tagName === 'INPUT') {
        console.log(element.value)
      }
      if (element.tagName === 'SELECT') {
      }
    }

    // setFormValidate(true);
  }

  return (
    <>
      {props.toolTip ? (
        <CTooltip content={props.toolTip} placement="top">
          <button
            className={`flex items-center justify-center font-medium text-${props.colorBgButtonShow} border-transparent hover:border-b hover:border-${props.colorBgButtonShow}`}
            onClick={() => setVisible(!visible)}
          >
            <span className="material-icons-outlined">{props.iconButtonShow}</span>
            {props.labelButtonShow}
          </button>
        </CTooltip>
      ) : (
        <button
          className={`flex items-center justify-center font-medium text-${props.colorBgButtonShow} border-transparent hover:border-b hover.border-${props.colorBgButtonShow}`}
          onClick={() => setVisible(!visible)}
        >
          <span className="material-icons-outlined">{props.iconButtonShow}</span>
          {props.labelButtonShow}
        </button>
      )}

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ScrollingLongContentExampleLabel"
      >
        <CForm validated={formValidate} onSubmit={handleSubmitModal}>
          <CModalHeader closeButton>
            <CModalTitle>{props.title}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {props.body ? props.body : null}
            {props.fields && props.fields.length > 0 ? (
              <div className="row">
                {props.fields.map((item, key) => (
                  <div className="col-sm" key={key}>
                    <label htmlFor={item.id} className="">
                      {item.placeholder}
                    </label>
                    {(() => {
                      switch (item.type) {
                        case 'text':
                        case 'password':
                        case 'email':
                        case 'file':
                          return (
                            <CFormInput
                              type={item.type}
                              className="form-control"
                              id={item.id}
                              placeholder={item.placeholder}
                              required={item.required}
                              label={item.label}
                              accept={item.accept}
                            />
                          )

                        default:
                          return null
                      }
                    })()}
                  </div>
                ))}
              </div>
            ) : null}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Annuler
            </CButton>
            <CButton type="submit">Valider</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export const tableModalAllowedFields = [
  'input',
  'select',
  'file',
  'password',
  'text',
  'email',
  'date',
  'number',
  'checkbox',
  'radio',
  'submit',
  'reset',
  'button',
  'hidden',
  'select',
  'optgroup',
  'time',
  'month',
]

const TableModalFieldType = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.oneOf(tableModalAllowedFields).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  accept: PropTypes.string,
  label: PropTypes.string,
})

TableModalFieldType.defaultProps = {
  required: false,
}

TableModal.propTypes = {
  title: PropTypes.string,
  body: PropTypes.node,
  labelButtonShow: PropTypes.string,
  colorButtonShowModalImport: PropTypes.string,
  fields: PropTypes.arrayOf(TableModalFieldType),
  handleSubmit: PropTypes.func,
  dispatch: PropTypes.func,
  initialValues: PropTypes.object,
  colorBgButtonShow: PropTypes.string,
  iconButtonShow: PropTypes.string,
  toolTip: PropTypes.string,
}

export default TableModal
