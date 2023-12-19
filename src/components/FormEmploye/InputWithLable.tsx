import React, { ChangeEvent } from 'react'
import Select from 'react-select'

export interface IInputWithLabelProps {
  label: string
  name: string
  type: string
  required?: boolean
  value?: any
  index?: number
  options?:
    | { label: string; value: string }[]
    | { label: string; value: string }[]
    | { label: number; value: string }[]
  onChange?: (value: any, index?: number) => void
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
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#da200d' : '',
      boxShadow: state.isFocused ? '0 0 0 0.25rem #e7b7b4' : null,
      borderRadius: 0,
    }),

    container: (provided) => ({
      ...provided,
      height: '28px',
    }),
    // menu: (provided, state) => ({
    //   ...provided,
    //   width: "100%",
    // }),
    // option: (provided, state) => ({
    //   ...provided,
    //   backgroundColor: state.isSelected ? "#da200d" : "inherit",
    //   ":hover": {
    //     backgroundColor: "#e7b7b4",
    //   },
    // }),
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
            <div key={index} className="grid grid-cols-4">
              <div className="text-center">
                <input
                  type="radio"
                  id={`${name}_${index}`}
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(event) => onChange(event, index)}
                />
              </div>
              <label htmlFor={`${name}_${index}`} className="ml-1 col-span-3">
                {option.label}
              </label>
            </div>
          ))}
        </fieldset>
      ) : type === 'select' && options ? (
        // Render a select dropdown using react-select
        <div className="flex flex-col mb-2">
          <label htmlFor={name}>{label}</label>
          <Select
            aria-label={label}
            name={name}
            options={options as { label: string; value: string }[]}
            value={options.find(
              (opt: { label: string; value: string }) => opt.value === value
            )}
            onChange={(
              selectedOption: { label: string; value: string } | undefined
            ) => onChange(selectedOption ? selectedOption.value : '', index)}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              height: 28,
              colors: {
                ...theme.colors,
                primary25: '#FA8181',
                primary: '#D6111E',
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
          onChange={(event) =>
            onChange(event as ChangeEvent<HTMLInputElement>, index)
          }
          className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px]"
          required={required}
        />
      )}
    </div>
  )
}

export default InputWithLabel
