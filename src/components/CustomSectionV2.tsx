import React, { ReactNode } from 'react'

interface ICustomSectionProps {
  title?: string
  fullWidth?: boolean
  children?: ReactNode // Use children instead of body
}

const CustomSectionV2: React.FC<ICustomSectionProps> = ({ title, fullWidth, children }) => {
  return (
    <div
      className={` ${
        fullWidth ? 'w-full' : ''
      } inline-flex flex-col border-b border-customRed-900 shadow-lg rounded-sm`}
    >
      <div className="flex flex-row flex-wrap gap-2 px-4 py-2 text-white bg-customRed-900">
        <h2 className="font-medium text-base p-0 m-0 capitalize">{title}</h2>
      </div>
      <div className="bg-white flex w-full h-full">{children}</div>
    </div>
  )
}

export default CustomSectionV2
