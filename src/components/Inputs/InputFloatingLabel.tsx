import React from 'react'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
}

const InputWithFloatingLabel: React.FC<InputProps> = ({ label, ...props }) => {
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
        <label htmlFor={props.id} className="text-sm h-5">{`${
          showLabel || props.type === 'date' ? label : ''
        } ${props.required && showLabel ? '*' : ''}`}</label>
      }
      <input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={
          props.required && props.placeholder ? `${props.placeholder} *` : props.placeholder
        }
      />
    </div>
  )
}

export default InputWithFloatingLabel
