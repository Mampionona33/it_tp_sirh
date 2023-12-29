import useEmployeeExists from '@src/hooks/useEmployeeExists'
import Page404 from '@src/views/pages/page404/Page404'
import React from 'react'

const ValidePaie = () => {
  const isEmployeExist = useEmployeeExists()

  return (
    <>
      <div>
        {isEmployeExist ? (
          <div>
            <p>Valid paie</p>
          </div>
        ) : (
          <Page404 />
        )}
      </div>
    </>
  )
}

export default ValidePaie
