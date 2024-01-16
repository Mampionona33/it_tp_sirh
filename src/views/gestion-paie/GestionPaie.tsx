import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import ButtonLink from '@src/components/buttons/ButtonLink'
import ReusableTable from '@src/components/ReusableTable/ReusableTable'
import { resetBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import Loading from '@src/components/Loading'
import { CAlert } from '@coreui/react'
import useErrorFormatter from '@src/hooks/useErrorFormatter'

const GestionPaie: React.FC = () => {
  const {
    list: listeEmploye,
    loading: loadingListEmployee,
    error,
  } = useAppSelector((store) => store.employeesList)
  const errorMessageFormatter = useErrorFormatter()

  const actifEmployes = useMemo(() => {
    return listeEmploye.filter((employe: IEmploye) => employe.actif === EnumBoolean.OUI)
  }, [listeEmploye])

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(resetBulletinDePaie())
  }, [dispatch])
  //   formatage des colonnes
  const columnHelper = createColumnHelper<IEmploye>()

  const cols = useMemo<ColumnDef<IEmploye>[]>(
    () => [
      columnHelper.accessor('matricule', {
        cell: (info) => info.getValue(),
        header: () => <div className="my-1">Matricule</div>,
      }),
      columnHelper.accessor('nom', {
        cell: (info) => info.getValue(),
        header: () => 'Nom',
      }),
      columnHelper.accessor('prenom', {
        cell: (info) => info.getValue(),
        header: () => 'Prenom',
      }),
      columnHelper.accessor('id', {
        cell: (info) => (
          <div className="flex justify-center">
            <ButtonLink to={`historique/${info.getValue()}`}>Historique paie</ButtonLink>
          </div>
        ),
        header: () => <div className="text-center">Action</div>,
      }),
    ],
    [columnHelper],
  )

  if (loadingListEmployee === 'loading') {
    return <Loading />
  }

  return (
    <div>
      {error && <CAlert color="danger">{errorMessageFormatter(error)}</CAlert>}
      <div>
        <ReusableTable data={actifEmployes} columns={cols} searchBar pagination />
      </div>
    </div>
  )
}

export default GestionPaie
