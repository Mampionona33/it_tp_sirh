import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import heureSerivice from '@src/services/HeureService'
import { DDMMYYYYFormat } from '@src/types/DateType'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import TableDetailHeures from './TableDetailHeures'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import TimeSheetTable from '@src/components/TimeSheetTable/TimeSheetTable_'
import { IHeuresEmploye } from '@src/interfaces/interfaceHeuresEmploye'

interface IColumnsTableHeures extends IHeuresEmploye {
  jour: string
  HS: number
  HS130: number
  HS150: number
  HSN30: number
  HS50: number
}

const DetailHeures: React.FC = () => {
  const { listDateDebutDateFin } = useAppSelector((store) => store.parametreCalendrier)
  const { list } = useAppSelector((store) => store.employeesList)
  const { id, dateValidation } = useParams()
  const dispatch = useAppDispatch()
  const [heures, setHeures] = useState(null)

  const getMonthValidation = (): string => {
    if (dateValidation) {
      const month = format(new Date(dateValidation), 'MMM', { locale: fr })
      return month.slice(0, 3)
    }
    return ''
  }

  const getDateDebutDateFin = (): { dateDebut: string; dateFin: string } | undefined => {
    const actualMonth = getMonthValidation()

    return listDateDebutDateFin && listDateDebutDateFin[actualMonth]
  }

  const { dateDebut, dateFin } = getDateDebutDateFin()

  const formatDateFin = (): DDMMYYYYFormat => {
    const parsedDateValidation = parseISO(dateValidation)
    const dayOfMonth = parseInt(dateFin)

    const formattedDateFin = new Date(
      parsedDateValidation.getFullYear(),
      parsedDateValidation.getMonth(),
      dayOfMonth,
    )

    return format(formattedDateFin, 'dd/MM/yyyy') as DDMMYYYYFormat
  }

  const formatDateDebut = (): DDMMYYYYFormat => {
    const parsedDateValidation = parseISO(dateValidation)

    const adjustedDate = new Date(parsedDateValidation)
    adjustedDate.setMonth(parsedDateValidation.getMonth() - 1)

    return format(adjustedDate, 'dd/MM/yyyy') as DDMMYYYYFormat
  }

  const dateDebutFormated = formatDateDebut()
  const dateFinFormated = formatDateFin()
  const matricule = list.find((employe: IEmploye) => String(employe.id) === String(id))?.matricule

  console.log(dateDebutFormated, dateFinFormated, matricule)

  useEffect(() => {
    heureSerivice
      .getAll(matricule, dateDebutFormated, dateFinFormated)
      .then((data) => setHeures(data))
      .catch((err) => console.log(err))
  }, [dateDebutFormated, dateFinFormated, matricule])

  console.log(heures)

  const columnHelper = createColumnHelper<IColumnsTableHeures>()
  // Date , jour, HN, HS, HS130, HS150, HSN30%, HS50%, Hdim, Hférié
  const colums = useMemo<ColumnDef<IColumnsTableHeures>[]>(
    () => [
      columnHelper.accessor('date', {
        cell: (info) => info.getValue(),
        header: () => 'Date',
      }),
      columnHelper.accessor('jour', {
        cell: (info) => info.getValue(),
        header: () => 'Jour',
      }),
      columnHelper.accessor('hs_normale', {
        cell: (info) => info.getValue(),
        header: () => 'HN',
      }),
      columnHelper.accessor('HS', {
        cell: (info) => info.getValue(),
        header: () => 'HS',
      }),
      columnHelper.accessor('HS130', {
        cell: (info) => info.getValue(),
        header: () => 'HS130',
      }),
      columnHelper.accessor('HS150', {
        cell: (info) => info.getValue(),
        header: () => 'HS150',
      }),
      columnHelper.accessor('HSN30', { cell: (info) => info.getValue(), header: () => 'HSN 30%' }),
      columnHelper.accessor('HS50', { cell: (info) => info.getValue(), header: () => 'HS 50%' }),
      columnHelper.accessor('hs_de_dimanche', {
        cell: (info) => info.getValue(),
        header: () => 'H Dimanche',
      }),
      columnHelper.accessor('hs_jours_feries', {
        cell: (info) => info.getValue(),
        header: () => 'H férié',
      }),
    ],
    [columnHelper],
  )

  return (
    <div>
      <TableDetailHeures data={[]} columns={colums} />
    </div>
  )
}

export default DetailHeures
