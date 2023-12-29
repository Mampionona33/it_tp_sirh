import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import heureSerivice from '@src/services/HeureService'
import { DDMMYYYYFormat } from '@src/types/DateType'
import { addMonths, format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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

  return (
    <div>
      <p>Detail heures</p>
    </div>
  )
}

export default DetailHeures
