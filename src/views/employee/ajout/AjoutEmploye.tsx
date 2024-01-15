import React, { useEffect } from 'react'
import FormEmploye from '@src/components/FormEmploye/FormEmploye'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

const AjoutEmploye: React.FC = () => {
  return (
    <div>
      <div>
        <FormEmploye />
      </div>
    </div>
  )
}

export default AjoutEmploye
