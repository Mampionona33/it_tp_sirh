import { ISelectFloatingLableProps } from '@src/interfaces/interfaceSelectFloatingLable'
import React from 'react'
import Select from 'react-select'

const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    height: 21,
    minHeight: 21,
    border: 'none',
    outline: 'none',
    borderBottom: '1px solid #D6111E',
  }),
  valueContainer: (style: any) => {
    return {
      ...style,
      paddingTop: 0,
      paddingBottom: 0,
      height: 21,
      minHeight: 21,
    }
  },
  input: (style: any) => {
    return {
      ...style,
      margin: 0,
      height: 21,
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 21,
      fontSize: '0.875rem',
    }
  },
  singleValue: (style: any) => {
    return {
      ...style,
      fontSize: '0.875rem',
    }
  },
  placeholder: (style: any) => {
    return {
      ...style,
      fontSize: '0.875rem',
    }
  },
  menu: (style: any) => ({
    ...style,
    fontSize: '0.875rem',
  }),
  indicatorsContainer: (style: any) => {
    return {
      ...style,
      fontSize: '0.875rem',
      height: 21,
      minHeight: 21,
    }
  },
}

const SelectFloatingLable: React.FC<ISelectFloatingLableProps> = ({ label, ...props }) => {
  const [showLabel, setShowLabel] = React.useState(false)

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

  return (
    <div className="flex flex-col">
      {
        <label className="text-sm h-5" htmlFor={props.id}>
          {showLabel ? label : ''} {props.required && showLabel ? '*' : ''}
        </label>
      }
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

export default SelectFloatingLable
