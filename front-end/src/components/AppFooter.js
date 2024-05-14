import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a> */}
        <span className="ms-1 text-sm">&copy; 2024 La ligne scandinave.</span>
      </div>
      <div className="ms-auto">
        {/* <span className="me-1">Powered by react</span> */}
        {/* <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a> */}
        {/* <a
          className="text-sm"
          href="https://fr.react.dev/learn/typescript"
          target="_blank"
          rel="noopener noreferrer"
        >
          React TypeScript
        </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
