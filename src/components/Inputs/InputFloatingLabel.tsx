import React, { forwardRef, HTMLProps, useState, FocusEvent } from 'react'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
}

const InputWithFloatingLabel: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, ...props },
  ref,
) => {
  const [showLabel, setShowLabel] = useState(false)

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setShowLabel(true)
    props.onFocus && props.onFocus(event)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setShowLabel(false)
    }
    props.onBlur && props.onBlur(event)
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="text-sm h-5">
        {`${showLabel || props.type === 'date' ? label : ''} ${
          props.required && showLabel ? '*' : ''
        }`}
      </label>
      <input
        {...props}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={
          props.required && props.placeholder ? `${props.placeholder} *` : props.placeholder
        }
      />
    </div>
  )
}

export default forwardRef(InputWithFloatingLabel)
