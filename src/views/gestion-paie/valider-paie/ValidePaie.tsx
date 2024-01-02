import React, { FormEvent, useEffect, useRef } from 'react'
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
import useDateValidationExist from '@src/hooks/useIsDateValidationExist'
import CardPrimes from './ValiderCalculPaie/CardPrimes'
import CardAvantages from './ValiderCalculPaie/CardAvantages'
import CardDeduction from './ValiderCalculPaie/CardDeduction'
import CardIndemnites from './ValiderCalculPaie/CardIndemnites'
import CardAvances from './ValiderCalculPaie/CardAvances'
import CardRappel from './ValiderCalculPaie/CardRappel'
import CardGroupeButtons from './ValiderCalculPaie/CardGroupeButtons'
import useSalaireNetAPayerUpdate from '@src/hooks/useSalaireNetAPayerUpdate'
import { fetchHeureEmploye } from '@src/redux/employeHours/employeHoursActions'
import heureService from '@src/services/HeureService'
import Loading from '@src/components/Loading'
import CalculPaie from '@src/utils/CalculPaie'

const ValidePaie = () => {
  const isEmployeExist = useEmployeeExists()
  const isDateValidationexist = useDateValidationExist()
  const { salaireDeBase, salarie } = useAppSelector((store) => store.bulletinDePaie)
  const { listDateDebutDateFin } = useAppSelector((store) => store.parametreCalendrier)
  const { employeHours } = useAppSelector((store) => store.employeHours)
  const bulletinDePaie = useAppSelector((store) => store.bulletinDePaie)

  const dispatch = useAppDispatch()
  const { dateValidation } = useParams()

  const getMonthValidation = (): string => {
    if (dateValidation && isDateValidationexist) {
      const month = format(new Date(dateValidation), 'MMM', { locale: fr })
      return month.slice(0, 3)
    }
    return ''
  }
  const getDateDebutDateFin = (): { dateDebut: string; dateFin: string } | undefined => {
    const actualMonth = getMonthValidation()

    return listDateDebutDateFin && listDateDebutDateFin[actualMonth]
  }
  const { dateDebut, dateFin } = isDateValidationexist
    ? getDateDebutDateFin()
    : { dateDebut: '00/00/0000', dateFin: '00/00/0000' }

  const formatDateFin = (): DDMMYYYYFormat => {
    const parsedDateValidation = parseISO(dateValidation)
    const dayOfMonth = parseInt(dateFin)

    const formattedDateFin = new Date(
      parsedDateValidation.getFullYear(),
      parsedDateValidation.getMonth(),
      dayOfMonth,
    )
    if (isDateValidationexist) {
      return format(formattedDateFin, 'dd/MM/yyyy') as DDMMYYYYFormat
    }
    return '00/00/0000'
  }

  const formatDateDebut = (): DDMMYYYYFormat => {
    const parsedDateValidation = parseISO(dateValidation)

    const adjustedDate = new Date(parsedDateValidation)
    adjustedDate.setDate(Number(dateDebut))
    adjustedDate.setMonth(parsedDateValidation.getMonth() - 1)
    if (isDateValidationexist) {
      return format(adjustedDate, 'dd/MM/yyyy') as DDMMYYYYFormat
    }
    return '00/00/0000'
  }

  const dateDebutFormated = formatDateDebut()
  const dateFinFormated = formatDateFin()

  useEffect(() => {
    if (salarie && dateFinFormated && dateDebutFormated) {
      const matricule = salarie.matricule
      dispatch(
        fetchHeureEmploye({
          matricule: matricule,
          dateDebut: dateDebutFormated,
          dateFin: dateFinFormated,
        }),
      )
    }
  }, [salarie, dateFinFormated, dateDebutFormated])

  calculHeuresEmploye.setHeuresMonsuelEmploye(employeHours)
  salarie.categorie == 'hc' && calculHeuresEmploye.setEstCadre(true)
  salarie.travail_de_nuit === EnumBoolean.OUI && calculHeuresEmploye.setTravailDeNuit(true)
  const totalHn = calculHeuresEmploye.getTotalHnormale()
  const totalHs30 = calculHeuresEmploye.getTotalTravailDeNuit30()
  const totalHs50 = calculHeuresEmploye.getTotalTravailDeNuit50()
  const totalHDim = calculHeuresEmploye.getTotalHdim()
  const totalHs = calculHeuresEmploye.getTotalHsDuMois()
  const totalHs130 = calculHeuresEmploye.getTotalHs130()
  const totalHs150 = calculHeuresEmploye.getTotalHs150()
  const hsni130 = calculHeuresEmploye.getHsni130()
  const hsni150 = calculHeuresEmploye.getHsni150()
  const hsi130 = calculHeuresEmploye.getHsi130()
  const hsi150 = calculHeuresEmploye.getHsi150()
  const totalHFerie = calculHeuresEmploye.getTotalHFerie()

  const calculPaie = new CalculPaie(salaireDeBase)
  salarie.categorie === 'hc' && calculPaie.setEstCadre(true)
  calculPaie.setHsni130(hsni130)
  calculPaie.setHsni150(hsni150)
  calculPaie.setHsi130(hsi130)
  calculPaie.setHsi150(hsi150)
  calculPaie.setTotalHs30(totalHs30)
  calculPaie.setTotalHs50(totalHs50)
  calculPaie.setTotalHDim(totalHDim)
  calculPaie.setTotalHFerie(totalHFerie)

  const cnaps = calculPaie.getCnaps()
  const osie = calculPaie.getOsie()
  const valHsni130 = calculPaie.getValHsni130()
  const valHsni150 = calculPaie.getValHsni150()
  const valHsi130 = calculPaie.getValHsi130()
  const valHsi150 = calculPaie.getValHsi150()
  const valHs30 = calculPaie.getValHs30()
  const valHs50 = calculPaie.getValHs50()
  const valHdim = calculPaie.getValHdim()
  const valHFerie = calculPaie.getValHFerie()
  const salaireBrut = calculPaie.getSalaireBrut()
  const baseIrsa = calculPaie.getBaseIrsa()
  const baseIrsaArrondi = calculPaie.getBaseIrsaArrondi()
  const irsaAPayer = calculPaie.getIrsaAPayer()
  const salaireNet = calculPaie.getSalaireNet()
  const salaireNetAPayer = calculPaie.getSalaireNetAPayer()

  
  useEffect(() => {
    if (osie) {
      dispatch(setBulletinDePaie({ osie: osie }))
    }
    if (cnaps) {
      dispatch(setBulletinDePaie({ cnaps: cnaps }))
    }
    if (hsni130) {
      dispatch(setBulletinDePaie({ hsni130: hsni130 }))
    }
    if (hsni150) {
      dispatch(setBulletinDePaie({ hsni150: hsni150 }))
    }
    if (hsi130) {
      dispatch(setBulletinDePaie({ hsi130: hsi130 }))
    }
    if (hsi150) {
      dispatch(setBulletinDePaie({ hsi150: hsi150 }))
    }
    if (totalHs30) {
      dispatch(setBulletinDePaie({ totalHs30: totalHs30 }))
    }
    if (totalHs50) {
      dispatch(setBulletinDePaie({ totalHs50: totalHs50 }))
    }
    if (totalHDim) {
      dispatch(setBulletinDePaie({ totalHDim: totalHDim }))
    }
    if (totalHFerie) {
      dispatch(setBulletinDePaie({ totalHFerie: totalHFerie }))
    }
    if (valHsni130) {
      dispatch(setBulletinDePaie({ valHsni130: valHsni130 }))
    }
    if (valHsni150) {
      dispatch(setBulletinDePaie({ valHsni150: valHsni150 }))
    }
    if (valHsi130) {
      dispatch(setBulletinDePaie({ valHsi130: valHsi130 }))
    }
    if (valHsi150) {
      dispatch(setBulletinDePaie({ valHsi150: valHsi150 }))
    }
    if (valHs30) {
      dispatch(setBulletinDePaie({ valHs30: valHs30 }))
    }
    if (valHs50) {
      dispatch(setBulletinDePaie({ valHs50: valHs50 }))
    }
    if (valHdim) {
      dispatch(setBulletinDePaie({ valHdim: valHdim }))
    }
    if (valHFerie) {
      dispatch(setBulletinDePaie({ valHFerie: valHFerie }))
    }
    if (salaireBrut) {
      dispatch(setBulletinDePaie({ salaireBrut: salaireBrut }))
    }
    if (baseIrsa) {
      dispatch(setBulletinDePaie({ baseIrsa: baseIrsa }))
    }
    if (baseIrsaArrondi) {
      dispatch(setBulletinDePaie({ baseIrsaArrondi: baseIrsaArrondi }))
    }
    if (irsaAPayer) {
      dispatch(setBulletinDePaie({ irsaAPayer: irsaAPayer }))
    }
    if (salaireNet) {
      dispatch(setBulletinDePaie({ salaireNet: salaireNet }))
    }
    if (salaireNetAPayer) {
      dispatch(setBulletinDePaie({ salaireNetAPayer: salaireNetAPayer }))
    }
  }, [])

  return (
    <>
      <div>
        {isEmployeExist && isDateValidationexist ? (
          <form action="">
            <div className="flex flex-col gap-3 mt-2 mb-3">
              <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1">
                <CardIndemnites />
                <CardAvances />
                <CardRappel />
                <CardPrimes />
                <CardDeduction />
                <CardAvantages />
              </div>
              <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1">
                <CardSalaireBrut />
                <CardSalaireNet />
                <CardSalaireNetAPayer />
                {/* <SalaryCalculation /> */}
              </div>
              <CardGroupeButtons />
            </div>
          </form>
        ) : (
          <Page404 />
        )}
      </div>
    </>
  )
}

export default ValidePaie
