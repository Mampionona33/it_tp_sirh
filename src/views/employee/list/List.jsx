import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TableEmployee from 'src/components/TableEmployee/TableEmployee'
import { fetchAllEmployees } from 'src/redux/employees/employeesAction'
import {
  resetBulletinDePaie,
  setBulletinDePaie,
} from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import { resetParametreCalendrier } from 'src/redux/parametreCalendrier/parametreCalendrierReducer'
import { fetchAllMouvementSalaire } from 'src/redux/mouvementSalaire/mouvementSalaireAction'

const List = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let mount = true
    if (mount && dispatch) {
      dispatch(fetchAllEmployees())
      dispatch(resetBulletinDePaie())
      dispatch(resetParametreCalendrier())
      dispatch(setBulletinDePaie({ ajoutSalaire: [] }))
      dispatch(setBulletinDePaie({ retenuSalaire: [] }))
      dispatch(fetchAllMouvementSalaire())
    }
    return () => {
      mount = false
    }
  }, [dispatch])
  return (
    <>
      <TableEmployee />
    </>
  )
}

export default List
