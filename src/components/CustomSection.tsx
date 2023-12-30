import React from 'react'

interface ICustomSection {
  title?: string
  body?: React.ReactNode
  fullWidth?: boolean
}
const CustomSection = (props: ICustomSection) => {
  return (
    <div
      className={` ${
        props.fullWidth ? 'w-full' : null
      } inline-flex flex-col border-b border-customRed-900 shadow-lg rounded-sm`}
    >
      <div className="flex flex-row flex-wrap gap-2 px-4 py-2 text-white bg-customRed-900">
        <h2 className="font-medium text-base p-0 m-0 capitalize">{props.title}</h2>
      </div>
      <div className="bg-white flex w-full h-full">{props.body}</div>
    </div>
  )
}

export default CustomSection
