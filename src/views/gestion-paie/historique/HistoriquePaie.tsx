import React, { useCallback, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import useEmployeeExists from '@src/hooks/useEmployeeExists'
import { fetchHistoriquesPaie } from '@src/redux/historiqueDePaie/historiqueDePaieAction'
import Page404 from '@src/views/pages/page404/Page404'
import SelectAnnee from './SelectAnnee'
import { setHistoriqueDePaie } from '@src/redux/historiqueDePaie/historiqueDePaieReducer'
import ReusableTable from '@src/components/ReusableTable/ReusableTable'
import ButtonLink, { ButtonLinkVariant } from '@src/components/buttons/ButtonLink'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { IHistoriquePaieProps } from '@src/interfaces/interfaceHistoriquePaie'
import { format } from 'date-fns'
import { EnumBoolean } from '@src/interfaces/interfaceEmploye'
import { fr } from 'date-fns/locale'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

interface IHistoriquePaieTableProps extends IHistoriquePaieProps {
  actions?: React.FC[]
}

const HistoriquePaie = () => {
  const isEmployeExist = useEmployeeExists()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { salaireBrut } = useAppSelector((store) => store.bulletinDePaie)
  const { list: listeEmploye } = useAppSelector((store) => store.employeesList)
  const {
    loading: loadinHistoriquePaie,
    anneeSectionne,
    historiques,
  } = useAppSelector((store) => store.historiquePaie)

  const selectedEmploye = useMemo(
    () =>
      listeEmploye && listeEmploye.length > 0
        ? listeEmploye.find((emp) => emp.id === Number(id))
        : null,
    [listeEmploye, id],
  )

  useEffect(() => {
    const fetchHistory = async () => {
      if (isEmployeExist && id) {
        try {
          const resp = await dispatch(
            fetchHistoriquesPaie({ id, annee: new Date(anneeSectionne).getFullYear() }),
          )
          if (resp.meta.requestStatus === 'fulfilled') {
            console.log(resp.payload)
          }
        } catch (error) {
          throw error
        }
      }
    }

    isEmployeExist && fetchHistory()

    isEmployeExist &&
      dispatch(
        setBulletinDePaie({
          salarie: selectedEmploye,
          salaireDeBase: selectedEmploye.salaire_de_base,
        } as IBulletinDePaieProps),
      )
  }, [id, isEmployeExist, dispatch, anneeSectionne, selectedEmploye])

  const handleDateChange = (date: Date) => {
    dispatch(setHistoriqueDePaie({ anneeSectionne: date }))
  }

  const generateRows = useCallback(() => {
    const currentYear = new Date().getFullYear()
    const selectedYear = new Date(anneeSectionne).getFullYear()

    const getEmptyRow = (month) => ({
      id: month - 1,
      id_employe: id,
      date: `${selectedYear}-${month.toString().padStart(2, '0')}-22`,
      salaireBrut: 0,
      salaireNet: 0,
      status: 'non',
    })

    const mergeWithHistoricalData = (row) => {
      const matchingHistoricalData = historiques.find(
        (data) =>
          new Date(data.date).getFullYear() === selectedYear &&
          new Date(data.date).getMonth() === row.id,
      )

      return matchingHistoricalData ? matchingHistoricalData : row
    }

    let rows = []

    if (selectedYear === currentYear) {
      const currentMonth = new Date().getMonth() + 1
      rows = Array.from({ length: currentMonth }, (_, month) =>
        mergeWithHistoricalData(getEmptyRow(month + 1)),
      )
    } else {
      rows = Array.from({ length: 12 }, (_, month) =>
        mergeWithHistoricalData(getEmptyRow(month + 1)),
      )
    }

    return rows
  }, [anneeSectionne, historiques])

  const historiquePaiement = generateRows()

  const columnHelper = createColumnHelper<IHistoriquePaieTableProps>()
  const cols = useMemo<ColumnDef<IHistoriquePaieTableProps>[]>(
    () => [
      columnHelper.accessor('date', {
        cell: (info) => (
          <span className="capitalize">
            {format(new Date(info.getValue()), 'MMMM yyyy', { locale: fr })}
          </span>
        ),

        header: () => 'Date',
      }),
      // columnHelper.accessor('salaire_brut', {
      //   cell: (info) => info.getValue(),
      //   header: () => 'Salaire brut',
      // }),
      // columnHelper.accessor('salaire_net', {
      //   cell: (info) => info.getValue(),
      //   header: () => 'Salaire net',
      // }),
      columnHelper.accessor('status', {
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        header: () => 'Validée',
      }),
      columnHelper.accessor('actions', {
        cell: (info) => {
          if (info.row.original.status === EnumBoolean.OUI) {
            return (
              <div className="flex justify-center ">
                <ButtonLink
                  className="w-24"
                  variant={ButtonLinkVariant.Secondary}
                  to={`details/${info.row.original.id}`}
                >
                  Détails
                </ButtonLink>
              </div>
            )
          } else if (info.row.original.status === 'non') {
            return (
              <div className="flex justify-center">
                <ButtonLink className="w-24" to={`valider/${info.row.original.date}`}>
                  A Valider
                </ButtonLink>
              </div>
            )
          }
        },
        header: () => <div className="flex justify-center ">Actions</div>,
      }),
    ],
    [columnHelper],
  )

  return (
    <div>
      {isEmployeExist ? (
        <div>
          <div>
            <div className="flex p-2 justify-end">
              <SelectAnnee
                selectedDate={new Date(anneeSectionne)}
                onDateChange={handleDateChange}
              />
            </div>
            <ReusableTable data={historiquePaiement} columns={cols} />
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </div>
  )
}

export default HistoriquePaie
