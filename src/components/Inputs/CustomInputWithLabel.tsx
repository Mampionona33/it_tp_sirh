import React, { useEffect } from 'react'

interface CustomInputProps extends React.HTMLProps<HTMLInputElement> {
  // Add any specific props you need for your CustomInputWithLabel component
  label: string
  name: string
  id: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
/**
 * A React functional component that renders a custom input field with a label.
 *
 * @param {CustomInputProps} props - The props for the component.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.type - The type of the input field.
 * @param {string} props.name - The name of the input field.
 * @param {boolean} props.required - Indicates if the input field is required.
 * @param {string} props.autoComplete - The autocomplete value for the input field.
 * @param {string} props.value - The value of the input field.
 * @param {number} props.min - The minimum value for the input field.
 * @param {number} props.max - The maximum value for the input field.
 * @param {function} props.onChange - The function to be called when the input field value changes.
 * @return {JSX.Element} The rendered custom input field with a label.
 */
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
}) => {
  const [focused, setFocused] = React.useState(false)
  const placeHolder = focused ? '' : label

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  useEffect(() => {
    setFocused(!!value)
  }, [value])

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={`text-sm h-6 text-zinc-500 p-1`}>
        {(type === 'number' || type === 'date' || focused) && label}
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
        onFocus={() => setFocused(true)}
        onChange={handleChange}
        value={value}
        className="border-b border-b-customRed-800 focus:border-b-2 focus:outline-none w-full px-1"
      />
    </div>
  )
}

export default CustomInputWithLabel
