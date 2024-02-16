import React from 'react'
import { CAlert } from '@coreui/react'
import { CAlertProps } from '@coreui/react/dist/components/alert/CAlert'

const CustomCAlert = React.forwardRef<HTMLDivElement, CAlertProps>(
  ({ children, ...props }, ref) => {
    return (
      <div>
        <CAlert ref={ref} {...props}>
          {children}
        </CAlert>
      </div>
    )
  },
)

// Définir le nom d'affichage du composant
CustomCAlert.displayName = 'CustomCAlert'

export default CustomCAlert
