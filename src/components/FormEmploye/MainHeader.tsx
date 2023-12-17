import React from 'react'

const MainHeader = () => {
  return (
    <>
      <div className="flex w-[442px] max-w-full flex-col items-stretch pl-3 self-start">
        <div className="justify-center text-red-900 text-lg font-medium uppercase max-md:max-w-full">
          Informations personnelles
        </div>
        <div className="justify-end text-black text-base font-medium mt-3 max-md:max-w-full">
          Employé
        </div>
      </div>
    </>
  )
}

export default MainHeader
