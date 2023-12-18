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
    <div className="flex flex-col mb-2">
      {type !== 'radio' && (
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
      ) : (
        // Render a regular input for other types
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(event) => onChange(event, index)}
          className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px]"
          required={required}
        />
      )}
    </div>
  )
}

export default InputWithLabel
