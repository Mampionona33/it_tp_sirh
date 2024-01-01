import React from 'react'

interface CustomInputProps extends React.HTMLProps<HTMLInputElement> {
  // Add any specific props you need for your CustomInputWithLabel component
  label: string
  name: string
  id: string
}

const CustomInputWithLabel: React.FC<CustomInputProps> = (props) => {
  const [focused, setFocused] = React.useState(false)
  const placeHolder = focused ? '' : props.label
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className={`text-sm h-4 text-zinc-500 px-1`}>
        {focused && props.label}
      </label>
      <input
        {...props}
        id={props.id}
        min={props.min}
        max={props.max}
        type={props.type}
        name={props.name}
        required={props.required}
        placeholder={placeHolder}
        autoComplete={props.autoComplete}
        onFocus={() => setFocused(true)}
        className="border-b border-b-customRed-800 focus:border-b-2 focus:outline-none w-full px-1 "
      />
    </div>
  )
}

export default CustomInputWithLabel
