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
import {
  IHistoriquePaieDataProps,
  IHistoriquePaieProps,
} from '@src/interfaces/interfaceHistoriquePaie'
import { format } from 'date-fns'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { fr } from 'date-fns/locale'
import {
  resetBulletinDePaie,
  setBulletinDePaie,
} from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import Loading from '@src/components/loadings/Loading'
import { CAlert } from '@coreui/react'
import useFetchHistorique from '@src/hooks/useFetchHistorique'
import useErrorFormatter from '@src/hooks/useErrorFormatter'

interface IHistoriquePaieTableProps extends IHistoriquePaieDataProps {
  actions?: React.FC[]
}

const HistoriquePaie = () => {
  const isEmployeExist = useEmployeeExists()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { list: listeEmploye } = useAppSelector((store) => store.employeesList)
  const { anneeSectionne } = useAppSelector((store) => store.historiquePaie)

  const anneeSectionneNumber: number | undefined = useMemo(() => {
    return new Date(String(anneeSectionne)).getFullYear()
  }, [anneeSectionne])

  const {
    historiques,
    isLoading,
    refetch: refetchHistorique,
    errors,
    isError,
  } = useFetchHistorique(id as string, anneeSectionneNumber)

  // const formatErrorMessage = useErrorFormatter()

  const selectedEmploye = useMemo<IEmploye | null>(() => {
    if (listeEmploye && listeEmploye.length > 0) {
      return listeEmploye.find((emp: IEmploye) => emp.id === Number(id)) || null
    } else {
      return null
    }
  }, [listeEmploye, id])

  const updateHistoriqueStore = useCallback(() => {
    if (historiques) {
      dispatch(
        setHistoriqueDePaie({
          historiques: historiques,
          anneeSectionne: anneeSectionne,
          loading: 'succeeded',
          error: null,
        } as IHistoriquePaieProps),
      )
    }
    if (errors) {
      dispatch(
        setHistoriqueDePaie({
          historiques: [],
          loading: 'failed',
          error: null,
          anneeSectionne: new Date().toString(),
        }),
      )
    }
  }, [dispatch, historiques, anneeSectionne, errors])

  useEffect(() => {
    dispatch(resetBulletinDePaie())
    updateHistoriqueStore()

    isEmployeExist &&
      dispatch(
        setBulletinDePaie({
          salarie: selectedEmploye,
          salaireDeBase: selectedEmploye!.salaire_de_base,
        } as IBulletinDePaieProps),
      )
  }, [
    id,
    isEmployeExist,
    dispatch,
    anneeSectionne,
    selectedEmploye,
    anneeSectionneNumber,
    updateHistoriqueStore,
  ])

  const handleDateChange = (date: Date) => {
    dispatch(setHistoriqueDePaie({ anneeSectionne: date.toString() } as IHistoriquePaieProps))
    refetchHistorique()
  }

  const generateRows = useCallback(() => {
    const currentYear = new Date().getFullYear()
    const selectedYear = new Date(String(anneeSectionne)).getFullYear()

    const getEmptyRow = (month: number): IHistoriquePaieDataProps => ({
      mois: format(new Date(Number(selectedYear), month - 1, 1), 'MMMM', { locale: fr }),
      salarie_id: id,
      annee: selectedYear,
      matricule: selectedEmploye!.matricule,
      validation_status: EnumBoolean.NON,
    })

    const mergeWithHistoricalData = (row: IHistoriquePaieDataProps) => {
      if (historiques) {
        const matchingHistoricalData = Object.values(historiques).find(
          (data: unknown): data is IHistoriquePaieDataProps => {
            if (!isIHistoriquePaieDataProps(data)) {
              return false
            }
            if (data.annee !== undefined) {
              const year = new Date(data.annee).getFullYear()
              return year === selectedYear && data.mois === row.mois
            } else {
              return false
            }
          },
        )

        return matchingHistoricalData ? matchingHistoricalData : row
      } else {
        return row
      }
    }

    // Fonction de type de garde pour vérifier si l'objet est de type IHistoriquePaieDataProps
    function isIHistoriquePaieDataProps(obj: unknown): obj is IHistoriquePaieDataProps {
      return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof (obj as IHistoriquePaieDataProps).annee === 'string' &&
        typeof (obj as IHistoriquePaieDataProps).mois === 'string'
        // Ajoutez d'autres vérifications de propriété si nécessaire
      )
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
  }, [anneeSectionne, historiques, id, selectedEmploye])

  const historiquePaiement = generateRows()

  const columnHelper = createColumnHelper<IHistoriquePaieTableProps>()

  const cols = useMemo<ColumnDef<IHistoriquePaieTableProps, any>[]>(
    () => [
      columnHelper.accessor('mois', {
        cell: (info) => <span className="capitalize">{info.getValue()}</span>,

        header: () => 'Mois',
      }),

      columnHelper.accessor('validation_status', {
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        header: () => 'Validée',
      }),
      columnHelper.accessor('actions', {
        cell: (info) => {
          if (info.row.original.validation_status === EnumBoolean.OUI) {
            return (
              <div className="flex justify-center ">
                <ButtonLink
                  className="w-24"
                  variant={ButtonLinkVariant.Secondary}
                  to={`details/${anneeSectionneNumber}/${info.row.original.mois}`}
                >
                  Détails
                </ButtonLink>
              </div>
            )
          } else if (info.row.original.validation_status === 'non') {
            return (
              <div className="flex justify-center">
                <ButtonLink
                  className="w-24"
                  to={`valider/${anneeSectionneNumber}/${info.row.original.mois}`}
                >
                  A Valider
                </ButtonLink>
              </div>
            )
          }
        },
        header: () => <div className="flex justify-center ">Actions</div>,
      }),
    ],
    [columnHelper, anneeSectionneNumber],
  )

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  if (isError) {
    return <CAlert color="danger">Un erreur est survenue</CAlert>
  }

  // if (!isEmployeExist) {
  //   return <Page404 />
  // }

  return (
    <div>
      <div>
        <div className="flex p-2 justify-end">
          <SelectAnnee
            selectedDate={new Date(String(anneeSectionne))}
            onDateChange={handleDateChange}
          />
        </div>
        <ReusableTable data={historiquePaiement} columns={cols} />
      </div>
    </div>
  )
}

export default HistoriquePaie
