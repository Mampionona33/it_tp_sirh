import React, { ChangeEvent } from 'react'

export interface IInputWithLabelProps {
  label: string
  name: string
  type: string
  required: boolean
  value: any
  index?: number
  options?: { label: string; value: string }[] | { label: number; value: string }[]
  onChange: (event: ChangeEvent<HTMLInputElement>, index?: number) => void
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
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={name}>
        {label} {required ? '*' : ''}
      </label>
      {type === 'radio' && options ? (
        // Render radio buttons if type is 'radio' and options are provided
        <div className="flex">
          {options.map((option, index) => (
            <div key={index} className="flex items-center mr-4">
              <input
                type="radio"
                id={`${name}_${index}`}
                name={name} // Use the name attribute to create unique radio button groups
                value={option.value}
                checked={value === option.value}
                onChange={(event) => onChange(event, index)}
              />
              <label htmlFor={`${name}_${index}`} className="ml-1">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ) : (
        // Render a regular input for other types
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(event) => onChange(event, index)}
          className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[30px]"
          required={required}
        />
      )}
    </div>
  )
}

export default InputWithLabel
