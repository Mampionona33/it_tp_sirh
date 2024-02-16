import React, { useState, useEffect } from 'react'
import { CAlert } from '@coreui/react'
import { CAlertProps } from '@coreui/react/dist/components/alert/CAlert'
import { XCircleIcon } from '@heroicons/react/24/outline'

interface CustomCAlertProps extends CAlertProps {
  timer?: number
}

const CustomCAlert = React.forwardRef<HTMLDivElement, CustomCAlertProps>(
  ({ children, timer = 8000, ...props }, ref) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setShow(false)
      }, timer)

      return () => {
        clearTimeout(timeoutId)
      }
    }, [timer])

    const handleClose = () => {
      setShow(false)
    }

    return (
      <>
        {show && (
          <div className="relative">
            <CAlert ref={ref} {...props}>
              <XCircleIcon
                onClick={handleClose}
                className="w-6 h-6 absolute top-1 right-1 cursor-pointer"
              />
              {children}
            </CAlert>
          </div>
        )}
      </>
    )
  },
)

CustomCAlert.displayName = 'CustomCAlert'

export default CustomCAlert
