import React, { ChangeEvent } from 'react'
import Select, { StylesConfig } from 'react-select'

export interface IInputWithLabelProps extends React.HTMLProps<HTMLInputElement> {
  id: string
  dynamiqueId?: boolean
  label: string
  name: string
  type: string
  required?: boolean
  autoComplete?: string
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
  dynamiqueId,
  label,
  name,
  type,
  required,
  value,
  options,
  index,
  autoComplete,
  min,
  max,
  placeholder,
  onChange,
  onInput,
  onSelectChange,
}) => {
  const [focused, setFocused] = React.useState<boolean>(false)

  const handleFocused = (event) => {
    event.preventDefault()
    setFocused(true)
  }

  const placeHolder = focused ? '' : required ? placeholder + ' *' : placeholder
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      height: 21,
      minHeight: 21,
      border: 'none',
      outline: 'none',
      borderBottom: '1px solid #D6111E',
    }),
    valueContainer: (style) => {
      return {
        ...style,
        paddingTop: 0,
        paddingBottom: 0,
        height: 21,
        minHeight: 21,
      }
    },
    input: (style) => {
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
        height: 21,
        minHeight: 21,
      }
    },
  }

  const handleSelectChange = (selectedOption: { label: string; value: string } | undefined) => {
    if (onSelectChange) {
      onSelectChange(selectedOption)
    }
  }

  React.useEffect(() => {
    if (value) {
      setFocused(true)
    } else {
      setFocused(false)
    }
  }, [value])

  return (
    <div className="flex flex-col mb-2">
      {type !== 'radio' && type !== 'select' && (
        <label htmlFor={id} className="text-sm h-4 mb-1">
          {(focused || type === 'number' || type === 'date') && label}
          {(focused || type === 'number' || type === 'date') && required ? ' *' : ''}
        </label>
      )}
      {type === 'radio' && options ? (
        // Render a fieldset for radio buttons
        <fieldset>
          <legend className="text-sm">{label}</legend>
          {options.map((option, optionIndex) => {
            const optionID = dynamiqueId ? `${id}_${option.value}` : id
            return (
              <div key={optionIndex} className="flex items-center">
                <div className="text-center mr-2">
                  <input
                    placeholder={placeholder}
                    type="radio"
                    id={optionID}
                    name={name}
                    value={option.value}
                    onFocus={() => setFocused(true)}
                    checked={value === option.value}
                    onChange={(event) => onChange(event, optionIndex)}
                    onInput={onInput ? (event) => onInput(event, optionIndex) : undefined}
                    className="text-sm"
                  />
                </div>
                <label htmlFor={optionID} className="text-sm">
                  {option.label}
                </label>
              </div>
            )
          })}
        </fieldset>
      ) : type === 'select' && options ? (
        // Render a select dropdown using react-select
        <div className="flex flex-col mb-2">
          <label htmlFor={name} className="text-sm h-4 mb-1">
            {focused && label} {required && focused ? ' *' : ''}
          </label>
          <Select
            inputId={id}
            aria-label={label}
            placeholder={placeHolder}
            name={name}
            required={required}
            options={options as { label: string; value: string }[]}
            value={options.find((opt: { label: string; value: string }) => opt.value === value)}
            onChange={handleSelectChange}
            onFocus={handleFocused}
            styles={customSelectStyles}
            className="text-sm"
            // styles={{
            //   ...customSelectStyles,
            //   control: (base) => ({
            //     ...customSelectStyles.control(base),
            //     border: 'none',
            //     outline: 'none',
            //     borderBottom: '1px solid #D6111E',
            //   }),
            // }}
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
          autoComplete={autoComplete}
          name={name}
          id={id || name}
          value={value}
          min={min}
          max={max}
          placeholder={placeHolder}
          onFocus={() => setFocused(true)}
          onChange={(event) => onChange(event as ChangeEvent<HTMLInputElement>, index)}
          onInput={
            onInput ? (event) => onInput(event as ChangeEvent<HTMLInputElement>, index) : undefined
          }
          className="border-b border-b-customRed-800 focus:border-b-2 focus:outline-none w-full px-1 text-sm"
          required={required}
        />
      )}
    </div>
  )
}

export default InputWithLabel
