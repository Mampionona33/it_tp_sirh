import React, { useState, useEffect } from 'react'
import { CAlert } from '@coreui/react'
import { CAlertProps } from '@coreui/react/dist/components/alert/CAlert'
import { XCircleIcon } from '@heroicons/react/24/outline'

interface CustomCAlertProps extends CAlertProps {
  timer?: number
  onClose?: () => void // Fonction de rappel pour informer le parent que l'alerte a été fermée
}

const CustomCAlert = React.forwardRef<HTMLDivElement, CustomCAlertProps>(
  ({ children, timer = 8000, onClose, ...props }, ref) => {
    const [show, setShow] = useState(Boolean(children))

    useEffect(() => {
      if (children) {
        setShow(true)

        const timeoutId = setTimeout(() => {
          setShow(false)
          onClose && onClose() // Informer le parent que l'alerte a été fermée
        }, timer)

        return () => {
          clearTimeout(timeoutId)
        }
      } else {
        setShow(false)
      }
    }, [children, timer, onClose])

    const handleClose = () => {
      setShow(false)
      onClose && onClose() // Informer le parent que l'alerte a été fermée
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
