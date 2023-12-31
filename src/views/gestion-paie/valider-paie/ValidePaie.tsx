import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useEmployeeExists from '@src/hooks/useEmployeeExists'
import Page404 from '@src/views/pages/page404/Page404'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { DDMMYYYYFormat } from '@src/types/DateType'
import heureSerivice from '@src/services/HeureService'
import SalaryCalculation from '../../../components/SalaryCalculation/SalaryCalculation'
import calculHeuresEmploye from '@src/utils/CalculHeuresEmploye'
import CardSalaireBrut from './CardSalaireBrut'
import CardSalaireNet from './CardSalaireNet'
import CardSalaireNetAPayer from './CardSalaireNetAPayer'
import calculPaie from '../../../utils/CalculPaie'

const ValidePaie = () => {
  const isEmployeExist = useEmployeeExists()
  const { id, dateValidation } = useParams()
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

  const matricule =
    listEmploye &&
    listEmploye.length > 0 &&
    listEmploye.filter((item: IEmploye) => String(item.id) === String(id))[0]?.matricule

  const est_cadre =
    listEmploye &&
    listEmploye.length > 0 &&
    listEmploye.filter((item: IEmploye) => String(item.id) === String(id))[0]?.est_cadre

  const travail_de_nuit =
    listEmploye &&
    listEmploye.filter((item: IEmploye) => String(item.id) === String(id))[0]?.travail_de_nuit

  const salaire_de_base =
    listEmploye &&
    listEmploye.filter((item: IEmploye) => String(item.id) === String(id))[0]?.salaire_de_base

  const dateDebutFormated = formatDateDebut()
  const dateFinFormated = formatDateFin()

  useEffect(() => {
    heureSerivice
      .getAll(matricule, dateDebutFormated, dateFinFormated)
      .then((data) => {
        // console.log(data)
        calculHeuresEmploye.setHeuresMonsuelEmploye(data)

        est_cadre === EnumBoolean.OUI && calculHeuresEmploye.setEstCadre(true)
        travail_de_nuit === EnumBoolean.OUI && calculHeuresEmploye.setTravailDeNuit(true)

        const total_h_normale = calculHeuresEmploye.getTotalHnormale()
        const total_travail_effectif = calculHeuresEmploye.getTotalHTravailEffectif()
        const total_hs30 = calculHeuresEmploye.getTotalTravailDeNuit30()
        const total_hs50 = calculHeuresEmploye.getTotalTravailDeNuit50()
        const total_Hdim = calculHeuresEmploye.getTotalHdim()
        const total_hsDuMois = calculHeuresEmploye.getTotalHsDuMois()
        const total_hs130 = calculHeuresEmploye.getTotalHs130()
        const total_hs150 = calculHeuresEmploye.getTotalHs150()
        const hsni130 = calculHeuresEmploye.getHsni130()
        const hsni150 = calculHeuresEmploye.getHsni150()
        const hsi130 = calculHeuresEmploye.getHsi130()
        const hsi150 = calculHeuresEmploye.getHsi150()
        const total_h_ferie = calculHeuresEmploye.getTotalHFerie()

        const tableauHsParSemaine = calculHeuresEmploye.getTaleauHsParSemaine()
        const tableauHs130ParSemaine = calculHeuresEmploye.getTableauHs130ParSemaine()
        const tableauHs150ParSemaine = calculHeuresEmploye.getTableauHs150ParSemaine()

        if (salaire_de_base) {
          calculPaie.setSalaireBase(salaire_de_base)
          calculPaie.setHsni130(hsni130)

          const valHsni130 = calculPaie.getValHsni130()

          console.log('valHsni130', valHsni130)
        }

        // console.log('total h normale', total_h_normale)
        // console.log('total h effectif', total_travail_effectif)
        // console.log('total travail de nuit 30%', total_hs30)
        // console.log('total travail de nuit 50%', total_hs50)
        // console.log('total travail dimanche', total_Hdim)
        // console.log('total hs du mois', total_hsDuMois)
        // console.log('total hs130 ', total_hs130)
        // console.log('total hs 150', total_hs150)
        // console.log('hsni130', hsni130)
        // console.log('hsni150', hsni150)
        // console.log('hsi130', hsi130)
        // console.log('hsi150', hsi150)
        // console.log('total h férié', total_h_ferie)
        // console.log('tableau hs par semaine', tableauHsParSemaine)
        // console.log('tableau hs130 par semaine', tableauHs130ParSemaine)
        // console.log('tableau hs150 par semaine', tableauHs150ParSemaine)
      })
      .catch((err) => console.log(err))
  }, [matricule, dateDebutFormated, dateFinFormated, est_cadre, travail_de_nuit, salaire_de_base])

  return (
    <>
      <div>
        {isEmployeExist ? (
          <div className="grid grid-cols-3 gap-4">
            <CardSalaireBrut />
            <CardSalaireNet />
            <CardSalaireNetAPayer />
            {/* <SalaryCalculation /> */}
          </div>
        ) : (
          <Page404 />
        )}
      </div>
    </>
  )
}

export default ValidePaie
