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
import { Link } from 'react-router-dom'
import ButtonLink from '@src/components/buttons/ButtonLink'

interface ButtonDetailProps {
  rowId: number
}

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

  const ButtonDetail: React.FC<ButtonDetailProps> = ({ rowId }) => {
    return <ButtonLink to={`/employees/fiche/${rowId}`}>Détails</ButtonLink>
  }

  return (
    <>
      {/* <TableEmployee /> */}
      <TableListeEmploye actions={[ButtonDetail]} />
    </>
  )
}

export default List
