import React from 'react'
import PropTypes from 'prop-types'

const CardInfo = (props) => {
  return (
    <>
      <div className="flex align-bottom gap-14 justify-between px-3 py-2 border-b border-y-customRed-100 items-end">
        <h4 className="text-lg font-medium p-0 m-0">{props.title}</h4>
        <p className="p-0 m-0">{props.body}</p>
      </div>
    </>
  )
}
CardInfo.propTypes = {
  title: PropTypes.string,
  body: PropTypes.any,
}
export default CardInfo
