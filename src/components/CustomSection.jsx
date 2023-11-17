import React from 'react'
import PropTypes from 'prop-types'

const CustomSection = (props) => {
  return (
    <>
      <div
        className={` ${
          props.fullWidth ? 'w-full' : null
        } inline-flex flex-col border-b border-customRed-900 shadow-lg`}
      >
        <div className="flex flex-row flex-wrap gap-4 px-4 py-2 text-white bg-customRed-900">
          <h2 className="text-2xl font-semibold mb-2">{props.title}</h2>
        </div>
        <div className="bg-white flex w-full">{props.body}</div>
      </div>
    </>
  )
}
CustomSection.propTypes = {
  title: PropTypes.string,
  body: PropTypes.any,
  fullWidth: PropTypes.bool,
}
export default CustomSection
