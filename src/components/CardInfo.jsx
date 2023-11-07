import React from 'react'
import PropTypes from 'prop-types'

const CardInfo = (props) => {
  return (
    <>
      <div>
        <h4>{props.title}</h4>
      </div>
    </>
  )
}
CardInfo.propTypes = {
  title: PropTypes.string,
  body: PropTypes.any,
}
export default CardInfo
