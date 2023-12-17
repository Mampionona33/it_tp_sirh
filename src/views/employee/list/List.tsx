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
import TableListeEmploye from '@components/TableListeEmploye/TableListeEmploye'

const List = () => {
  const dispatch = useDispatch<any>()

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

  const ButtonDetail: React.FC = () => {
    return (
      <>
        <button className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200">
          Détails
        </button>
      </>
    )
  }

  return (
    <>
      {/* <TableEmployee /> */}
      <TableListeEmploye actions={[ButtonDetail]} />
    </>
  )
}

export default List
