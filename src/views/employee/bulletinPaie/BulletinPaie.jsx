import React from 'react'
import { useSelector } from 'react-redux'

const BulletinPaie = () => {
  const selecteEmploy = useSelector((state) => state.selectedEmploye.employe)

  return (
    <>
      <div>BulletinPaie de {selecteEmploy.name.nom}</div>
    </>
  )
}

export default BulletinPaie
