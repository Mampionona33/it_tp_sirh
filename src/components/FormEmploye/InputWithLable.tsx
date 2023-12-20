import React, { ChangeEvent } from 'react'
import Select, { StylesConfig } from 'react-select'

export interface IInputWithLabelProps {
  label: string
  name: string
  type: string
  required?: boolean
  value?: any
  index?: number
  options?: IInputWithLabelOptionsProps[]
  onChange?: (value: any, index?: number) => void
}

export interface IInputWithLabelOptionsProps {
  label: string | number
  value: string | number
}

const InputWithLabel: React.FC<IInputWithLabelProps> = ({
  label,
  name,
  type,
  required,
  value,
  onChange,
  options,
  index,
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
        minHeight: 26,
      }
    },
    indicatorsContainer: (style) => {
      return {
        ...style,
        height: 28,
        minHeight: 28,
      }
    },
  }

  return (
    <div className="flex flex-col mb-2">
      {type !== 'radio' && type !== 'select' && (
        <label htmlFor={name}>
          {label} {required ? '*' : ''}
        </label>
      )}
      {type === 'radio' && options ? (
        // Render a fieldset for radio buttons
        <fieldset>
          <legend className="text-base">{label}</legend>
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <div className="text-center mr-2">
                <input
                  type="radio"
                  id={`${name}_${index}`}
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(event) => onChange(event, index)}
                />
              </div>
              <label htmlFor={`${name}_${index}`}>{option.label}</label>
            </div>
          ))}
        </fieldset>
      ) : type === 'select' && options ? (
        // Render a select dropdown using react-select
        <div className="flex flex-col mb-2">
          <label htmlFor={name}>
            {label} {required ? '*' : ''}
          </label>
          <Select
            aria-label={label}
            name={name}
            required={required}
            options={options as { label: string; value: string }[]}
            value={options.find((opt: { label: string; value: string }) => opt.value === value)}
            onChange={(selectedOption: { label: string; value: string } | undefined) =>
              onChange(selectedOption ? selectedOption.value : '', index)
            }
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
          id={name}
          value={value}
          onChange={(event) => onChange(event as ChangeEvent<HTMLInputElement>, index)}
          className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px]"
          required={required}
        />
      )}
    </div>
  )
}

export default InputWithLabel
