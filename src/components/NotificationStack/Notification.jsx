import React, { useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

const Notification = ({ id, type, title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 8000)

    return () => {
      clearTimeout(timer)
    }
  }, [onClose])

  const getBackgroundColor = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-500'
      case 'information':
        return 'bg-blue-500'
      case 'warning':
        return 'bg-orange-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div key={id} className={`shadow-md flex flex-col bg-yellow-50`}>
      <div className={`p-2 flex text-white flex-row justify-between ${getBackgroundColor()}`}>
        <h1 className="text-lg font-semibold">{title}</h1>
        <button className="" onClick={onClose}>
          <XCircleIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="p-2">
        <p>{message}</p>
      </div>
    </div>
  )
}

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['danger', 'information', 'warning']),
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Notification
