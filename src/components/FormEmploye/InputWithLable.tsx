import React, { ChangeEvent } from 'react'
import Select, { StylesConfig } from 'react-select'

export interface IInputWithLabelProps {
  id: string
  label: string
  name: string
  type: string
  required?: boolean
  value?: any
  index?: number
  min?: any
  max?: any
  placeholder?: string
  onSelectChange?: (selectedValue: any) => void
  options?: IInputWithLabelOptionsProps[]
  onChange?: (value: any, index?: number) => void
  onInput?: (value: any, index?: number) => void
}

export interface IInputWithLabelOptionsProps {
  label: string | number
  value: string | number
}

const InputWithLabel: React.FC<IInputWithLabelProps> = ({
  id,
  label,
  name,
  type,
  required,
  value,
  options,
  index,
  min,
  max,
  placeholder,
  onChange,
  onInput,
  onSelectChange,
}) => {
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      height: 28,
      minHeight: 28,
    }),
    valueContainer: (style) => {
      return {
        ...style,
        height: 28,
        minHeight: 28,
      }
    },
    input: (style) => {
      return {
        ...style,
        height: 26,
        fontSize: '0.875rem',
        minHeight: 26,
        margin: 0,
      }
    },
    singleValue: (style) => {
      return {
        ...style,
        fontSize: '0.875rem',
      }
    },
    placeholder: (style) => {
      return {
        ...style,
        fontSize: '0.875rem',
      }
    },
    menu: (style) => ({
      ...style,
      fontSize: '0.875rem',
    }),
    indicatorsContainer: (style) => {
      return {
        ...style,
        fontSize: '0.875rem',
        height: 28,
        minHeight: 28,
      }
    },
  }
  const handleSelectChange = (selectedOption: { label: string; value: string } | undefined) => {
    if (onSelectChange) {
      onSelectChange(selectedOption)
    }
  }

  return (
    <div className="flex flex-col mb-2">
      {type !== 'radio' && type !== 'select' && (
        <label htmlFor={id} className="text-sm">
          {label} {required ? '*' : ''}
        </label>
      )}
      {type === 'radio' && options ? (
        // Render a fieldset for radio buttons
        <fieldset>
          <legend className="text-sm">{label}</legend>
          {options.map((option, index) => {
            // const id = `${name}_${index}_${option.value}`
            return (
              <div key={index} className="flex items-center">
                <div className="text-center mr-2">
                  <input
                    placeholder={placeholder}
                    type="radio"
                    id={id}
                    name={name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(event) => onChange(event, index)}
                    onInput={onInput ? (event) => onInput(event, index) : undefined}
                    className="text-sm"
                  />
                </div>
                <label htmlFor={id} className="text-sm">
                  {option.label}
                </label>
              </div>
            )
          })}
        </fieldset>
      ) : type === 'select' && options ? (
        // Render a select dropdown using react-select
        <div className="flex flex-col mb-2">
          <label htmlFor={name} className="text-sm">
            {label} {required ? '*' : ''}
          </label>
          <Select
            inputId={id}
            aria-label={label}
            placeholder={placeholder}
            name={name}
            required={required}
            options={options as { label: string; value: string }[]}
            value={options.find((opt: { label: string; value: string }) => opt.value === value)}
            // onChange={(selectedOption: { label: string; value: string } | undefined) =>
            //   onChange(selectedOption ? selectedOption.value : '', index)
            // }
            onChange={handleSelectChange}
            styles={customSelectStyles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              height: 28,
              colors: {
                ...theme.colors,
                primary25: '#FFF2F2',
                primary: '#FEBABA',
              },
            })}
          />
        </div>
      ) : (
        // Render a regular input for other types
        <input
          type={type}
          name={name}
          id={id || name}
          value={value}
          min={min}
          max={max}
          placeholder={placeholder}
          onChange={(event) => onChange(event as ChangeEvent<HTMLInputElement>, index)}
          onInput={
            onInput ? (event) => onInput(event as ChangeEvent<HTMLInputElement>, index) : undefined
          }
          className="border border-customRed-50 focus:outline-customRed-100 text-sm p-2 h-[28px]"
          required={required}
        />
      )}
    </div>
  )
}

export default InputWithLabel
