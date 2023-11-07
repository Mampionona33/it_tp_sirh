import React from 'react'
import PropTypes from 'prop-types'

const CustomSection = (props) => {
  return (
    <>
      <div className="inline-flex flex-col border-b border-customRed-900 shadow-md">
        <div className="flex flex-row flex-wrap gap-4 px-4 py-2 text-white bg-customRed-900">
          <h2 className="text-2xl font-semibold mb-2">{props.title}</h2>
        </div>
        <div>{props.body}</div>
      </div>
    </>
  )
}
CustomSection.propTypes = {
  title: PropTypes.string,
  body: PropTypes.any,
}
export default CustomSection
