import React, { useEffect } from 'react'

interface CustomInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  name: string
  id: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const CustomInputWithLabel: React.FC<CustomInputProps> = ({
  label,
  id,
  type,
  name,
  required,
  autoComplete,
  value,
  min,
  max,
  onChange,
  onFocus,
}) => {
  const [focused, setFocused] = React.useState(false)
  const placeHolder = focused ? '' : label

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus && onFocus(event)
  }

  useEffect(() => {
    if (value) {
      setFocused(true)
    } else {
      setFocused(false)
    }
  }, [value])

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={`text-sm h-6 text-zinc-500 p-1`}>
        {type === 'date' || type === 'number' || focused ? label : ''}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        placeholder={placeHolder}
        autoComplete={autoComplete}
        min={min}
        max={max}
        onFocus={handleFocus}
        onChange={handleChange}
        value={value}
        className="border-b text-sm border-b-customRed-800 focus:border-b-2 focus:outline-none w-full px-1"
      />
    </div>
  )
}

export default CustomInputWithLabel
