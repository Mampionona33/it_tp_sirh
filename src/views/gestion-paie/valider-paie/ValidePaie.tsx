import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useEmployeeExists from '@src/hooks/useEmployeeExists'
import Page404 from '@src/views/pages/page404/Page404'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { DDMMYYYYFormat } from '@src/types/DateType'
import heureSerivice from '@src/services/HeureService'
import calculHeuresEmploye from '@src/utils/CalculHeuresEmploye'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import calculPaie from '@src/utils/CalculPaie'
import CardSalaireBrut from './ValiderCalculPaie/CardSalaireBrut'
import CardSalaireNet from './ValiderCalculPaie/CardSalaireNet'
import CardSalaireNetAPayer from './ValiderCalculPaie/CardSalaireNetAPayer'

const ValidePaie = () => {
  const isEmployeExist = useEmployeeExists()
  const dispatch = useAppDispatch()
  const bulletinDePaie = useAppSelector((store) => store.bulletinDePaie)
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

  const dateDebutFormated = formatDateDebut()
  const dateFinFormated = formatDateFin()
  const mount = useRef(true)

  useEffect(() => {
    const salarie: IEmploye =
      id && listEmploye && listEmploye.filter((item: IEmploye) => String(item.id) === String(id))[0]

    if (salarie && dateDebutFormated && dateFinFormated && mount.current) {
      heureSerivice
        .getAll(salarie.matricule, dateDebutFormated, dateFinFormated)
        .then((data) => {
          // console.log(data)
          calculHeuresEmploye.setHeuresMonsuelEmploye(data)

          salarie.categorie === 'hc' && calculHeuresEmploye.setEstCadre(true)
          salarie.travail_de_nuit === EnumBoolean.OUI && calculHeuresEmploye.setTravailDeNuit(true)

          const totalHn = calculHeuresEmploye.getTotalHnormale()
          const totalHs30 = calculHeuresEmploye.getTotalTravailDeNuit30()
          const total_hs50 = calculHeuresEmploye.getTotalTravailDeNuit50()
          const totalHDim = calculHeuresEmploye.getTotalHdim()
          const totalHs = calculHeuresEmploye.getTotalHsDuMois()
          const totalHs130 = calculHeuresEmploye.getTotalHs130()
          const totalHs150 = calculHeuresEmploye.getTotalHs150()
          const hsni130 = calculHeuresEmploye.getHsni130()
          const hsni150 = calculHeuresEmploye.getHsni150()
          const hsi130 = calculHeuresEmploye.getHsi130()
          const hsi150 = calculHeuresEmploye.getHsi150()
          const totalHFerie = calculHeuresEmploye.getTotalHFerie()

          const total_travail_effectif = calculHeuresEmploye.getTotalHTravailEffectif()
          const tableauHsParSemaine = calculHeuresEmploye.getTaleauHsParSemaine()
          const tableauHs130ParSemaine = calculHeuresEmploye.getTableauHs130ParSemaine()
          const tableauHs150ParSemaine = calculHeuresEmploye.getTableauHs150ParSemaine()

          if (salarie.salaire_de_base) {
            calculPaie.setSalaireBase(salarie.salaire_de_base)
            salarie.categorie === 'hc' && calculPaie.setEstCadre(true)
            calculPaie.setHsni130(hsni130)
            calculPaie.setHsni150(hsni150)
            calculPaie.setHsi130(hsi130)
            calculPaie.setHsi150(hsi150)
            calculPaie.setTotalHs30(totalHs30)
            calculPaie.setTotalHs50(total_hs50)
            calculPaie.setTotalHDim(totalHDim)
            calculPaie.setTotalHFerie(totalHFerie)

            const cnaps = calculPaie.getCnaps()
            const valHsni130 = calculPaie.getValHsni130()
            const valHsni150 = calculPaie.getValHsni150()
            const valHsi130 = calculPaie.getValHsi130()
            const valHsi150 = calculPaie.getValHsi150()
            const valHs30 = calculPaie.getValHs30()
            const valHs50 = calculPaie.getValHs50()
            const valHdim = calculPaie.getValHdim()
            const valHFerie = calculPaie.getValHFerie()
            const salaireBrut = calculPaie.getSalaireBrut()

            console.log('cnaps', cnaps)

            dispatch(
              setBulletinDePaie({
                ...bulletinDePaie,
                cnaps: cnaps,
                totalHn: totalHn,
                totalHs: totalHs,
                totalHFerie: totalHFerie,
                totalHs130: totalHs130,
                totalHs150: totalHs150,
                hsni130: hsni130,
                hsni150: hsni150,
                hsi130: hsi130,
                hsi150: hsi150,
                totalHs30: totalHs30,
                salaireBrut: salaireBrut,
                salaireDeBase: salarie.salaire_de_base,
                valHsni130: valHsni130,
                valHsni150: valHsni150,
                valHsi130: valHsi130,
                valHsi150: valHsi150,
                valHs30: valHs30,
                valHs50: valHs50,
                valHdim: valHdim,
                valHFerie: valHFerie,
                totalHDim: totalHDim,
              }),
            )
          }
          mount.current = false
        })
        .catch((err) => console.log(err))
    }
    return () => {
      mount.current = false
    }
  }, [dispatch, bulletinDePaie, dateDebutFormated, dateFinFormated, id, listEmploye])

  return (
    <>
      <div>
        {isEmployeExist ? (
          <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
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
