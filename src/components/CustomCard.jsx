import React from 'react'
import { PropTypes } from 'prop-types'

export const CustomCard = (props) => {
  return (
    <>
      <div className={`flex w-max p-1 ${props.bgColor}`}>
        <div>{props.icon}</div>
        <div>
          <h2 className="text-white">{props.data}</h2>
          <p className="text-white">{props.title}</p>
        </div>
      </div>
    </>
  )
}

CustomCard.propTypes = {
  icon: PropTypes.string,
  data: PropTypes.any,
  title: PropTypes.string,
  bgColor: PropTypes.string.isRequired,
}

CustomCard.defaultProps = {
  bgColor: 'bg-primary',
}
