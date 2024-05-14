import { XCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Alert } from 'react-bootstrap'

interface IFormAlertError {
  appModalError: boolean
  setAppModalError: React.Dispatch<React.SetStateAction<boolean>>
}

const FormAlertError: React.FC<IFormAlertError> = ({ appModalError, setAppModalError }) => {
  return (
    <div className="w-full">
      {appModalError && (
        <div className="relative">
          <button
            className="absolute top-0 right-0 cursor-pointer z-50 text-customRed-940"
            onClick={() => setAppModalError(false)}
          >
            <XCircleIcon className="w-6 h-6" />
          </button>
        </div>
      )}
      <Alert show={appModalError} variant="danger" className="rounded-none">
        Veuillez remplir correctement le champ nom matricule
      </Alert>
    </div>
  )
}

export default FormAlertError
