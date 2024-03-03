import React from 'react'

export interface InlineLoadingProps {
  label?: string
  dotDiameter?: string
  color?: string
}
const InlineLoading = (props: InlineLoadingProps) => {
  const { label, dotDiameter = 'w-1.5 h-1.5', color = 'text-customRed-900' } = props
  const circleCommonClasses = `${dotDiameter} ${color} bg-current rounded-full`

  return (
    <>
      <div className="flex gap-2 w-full">
        {label && <span className="font-medium text-sm text-customRed-900 p-0 m-0">{label}</span>}
        <div className="flex items-center ">
          <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
          <div className={`${circleCommonClasses} mr-1 animate-bounce-200`}></div>
          <div className={`${circleCommonClasses} animate-bounce-400`}></div>
        </div>
      </div>
    </>
  )
}

export default InlineLoading
