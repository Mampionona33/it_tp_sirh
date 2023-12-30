import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useEmployeeExists from '@src/hooks/useEmployeeExists'
import Page404 from '@src/views/pages/page404/Page404'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { DDMMYYYYFormat } from '@src/types/DateType'
import { IHeuresEmploye } from '@src/interfaces/interfaceHeuresEmploye'
import heureSerivice from '@src/services/HeureService'
import SalaryCalculation from '../../../components/SalaryCalculation/SalaryCalculation'
import calculHeuresEmploye from '@src/utils/CalculHeuresEmploye'

const ValidePaie = () => {
  const isEmployeExist = useEmployeeExists()
  const { id, dateValidation } = useParams()
  const [heures, setHeures] = useState<IHeuresEmploye[] | null>(null)
  const listEmploye = useAppSelector((store) => store.employeesList.list)
  const { listDateDebutDateFin } = useAppSelector((store) => store.parametreCalendrier)
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
    adjustedDate.setDate(Number(dateDebut))
    adjustedDate.setMonth(parsedDateValidation.getMonth() - 1)

    return format(adjustedDate, 'dd/MM/yyyy') as DDMMYYYYFormat
  }

  const { matricule, est_cadre, travail_de_nuit }: IEmploye =
    listEmploye &&
    listEmploye.length > 0 &&
    listEmploye.filter((employe: IEmploye) => employe.id === parseInt(id, 10))[0]

  const dateDebutFormated = formatDateDebut()
  const dateFinFormated = formatDateFin()

  useEffect(() => {
    heureSerivice
      .getAll(matricule, dateDebutFormated, dateFinFormated)
      .then((data) => {
        console.log(data)
        setHeures(data)
        calculHeuresEmploye.setHeuresMonsuelEmploye(data)
        est_cadre === EnumBoolean.OUI && calculHeuresEmploye.setEstCadre(true)
        travail_de_nuit === EnumBoolean.OUI && calculHeuresEmploye.setTravailDeNuit(true)
        console.log('total h normale', calculHeuresEmploye.getTotalHnormale())
        console.log('total h effectif', calculHeuresEmploye.getTotalHTravailEffectif())
        console.log('tableau hs par semaine', calculHeuresEmploye.getTaleauHsParSemaine())
        console.log('tableau hs130 par semaine', calculHeuresEmploye.getTableauHs130ParSemaine())
        console.log('tableau hs150 par semaine', calculHeuresEmploye.getTableauHs150ParSemaine())
        console.log('total travail de nuit 30%', calculHeuresEmploye.getTotalTravailDeNuit30())
      })
      .catch((err) => console.log(err))
  }, [matricule, dateDebutFormated, dateFinFormated, est_cadre, travail_de_nuit])

  return (
    <>
      <div>
        {isEmployeExist ? (
          <div>
            <p>Valid paie</p>
            <SalaryCalculation />
          </div>
        ) : (
          <Page404 />
        )}
      </div>
    </>
  )
}

export default ValidePaie
