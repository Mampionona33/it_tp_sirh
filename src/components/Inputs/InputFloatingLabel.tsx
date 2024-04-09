import React, {
  forwardRef,
  HTMLProps,
  Ref,
  useState,
  FocusEvent,
  useEffect,
  ChangeEvent,
} from 'react'

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'value'> {
  label: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const InputWithFloatingLabel: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, value, onChange, ...props },
  ref: Ref<HTMLInputElement>,
) => {
  const [showLabel, setShowLabel] = useState(!!value)

  const isControlled = value !== undefined

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

  // Updated handleLocalChange function to directly call the onChange prop with the new value
  const handleLocalChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event) // Forward the event to the parent component, if provided
  }

  useEffect(() => {
    if (value) {
      setShowLabel(true)
    }
  }, [value])

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
        value={isControlled ? value : ''}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleLocalChange}
        placeholder={
          props.required && props.placeholder ? `${props.placeholder} *` : props.placeholder
        }
        className='classeInput'
      />
    </div>
  )
}

export default forwardRef(InputWithFloatingLabel)
