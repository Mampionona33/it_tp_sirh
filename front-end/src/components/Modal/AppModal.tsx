import { useAppSelector } from '@src/hooks/useAppDispatch'
import { IAppModal } from '@src/interfaces/interfaceModal'
import React from 'react'

const AppModal: React.FC<IAppModal> = ({ children }) => {
  const isOpen = useAppSelector((store) => store.modal.isOpen)

  if (!isOpen) return null

  return (
    <>
      <div
        style={{ zIndex: 10000, backgroundColor: 'rgba(0, 10, 59, 0.81)' }}
        className="w-full h-full fixed top-0 left-0 overflow-hidden"
      >
        <div
          style={{ zIndex: 10001, opacity: 1 }}
          className="w-full h-full flex items-center justify-center"
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default AppModal
