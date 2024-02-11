import React, { useState, forwardRef, useEffect } from 'react'
import Select, { StylesConfig } from 'react-select'
import { ISelectFloatingLableProps } from '@src/interfaces/interfaceSelectFloatingLable'

const customSelectStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    height: 21,
    minHeight: 21,
    border: 'none',
    outline: 'none',
    borderBottom: '1px solid #D6111E',
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    height: 21,
    minHeight: 21,
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    height: 21,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 21,
    fontSize: '0.875rem',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '0.875rem',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '0.875rem',
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: '0.875rem',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    fontSize: '0.875rem',
    height: 21,
    minHeight: 21,
  }),
}

const SelectFloatingLable: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ISelectFloatingLableProps
> = ({ label, ...props }, ref) => {
  const [showLabel, setShowLabel] = useState(false)

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setShowLabel(true)
    props.onFocus && props.onFocus(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setShowLabel(false)
    }
    props.onBlur && props.onBlur(event)
  }

  useEffect(() => {
    if (props.value) {
      setShowLabel(true)
    }
  }, [props.value])

  return (
    <div ref={ref} className="flex flex-col">
      <label className="text-sm h-5" htmlFor={props.id}>
        {showLabel ? label : ''} {props.required && showLabel ? '*' : ''}
      </label>
      <Select
        {...props}
        id={props.id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={
          props.required && props.placeholder ? `${props.placeholder} *` : props.placeholder
        }
        styles={customSelectStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          height: '1.5rem',
          colors: {
            ...theme.colors,
            primary25: '#FFF2F2',
            primary: '#da200d',
          },
        })}
      />
    </div>
  )
}

export default forwardRef(SelectFloatingLable)
