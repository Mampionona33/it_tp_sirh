import React, { FormEvent, useEffect, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useEmployeeExists from '@src/hooks/useEmployeeExists'
import Page404 from '@src/views/pages/page404/Page404'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { DDMMYYYYFormat } from '@src/types/DateType'
import heureSerivice from '@src/services/HeureService'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
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
import CalculHeures_v2 from '@src/utils/CalculHeures_v2'

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
    const fetchData = async () => {
      if (salarie && dateFinFormated && dateDebutFormated) {
        const matricule = salarie.matricule

        try {
          const result = await dispatch(
            fetchHeureEmploye({
              matricule: matricule,
              dateDebut: dateDebutFormated,
              dateFin: dateFinFormated,
            }),
          )

          // console.log('Dispatch réussi avec résultat :', result)
          if (result.meta.requestStatus === 'fulfilled') {
            const { payload } = result

            if (payload) {
              const estCadre = salarie.categorie === 'hc'
              const travailleurDeNuit = salarie.travail_de_nuit === EnumBoolean.OUI

              const heureCalculator = new CalculHeures_v2()
              heureCalculator.setHeuresEmploye(payload)
              heureCalculator.setEstCadre(estCadre)
              heureCalculator.setTravailleurDeNuit(travailleurDeNuit)

              const totalHnormal = heureCalculator.getTotalHnormale()
              const totalHTravailEffectif = heureCalculator.getTotalHTravailEffectif()
              const tableauHsHebdo = heureCalculator.getTableauHsHebdo()
              const tableauHs130Hebdo = heureCalculator.getTableauHs130Hebdo()
              const tableauHs150Hebdo = heureCalculator.getTableauHs150Hebdo()
              const totalHs130Monsuel = heureCalculator.getTotalHs130Monsuel()
              const totalHs150Monsuel = heureCalculator.getTotalHs150Monsuel()
              const totalHsNuitHabit = heureCalculator.getTotalHsNuitHabit()
              const totalHsNuitOccas = heureCalculator.getTotalHsNuitOccas()
              const totalHdim = heureCalculator.getTotalHdim()
              const totalHFerie = heureCalculator.getTotalHFerie()

              console.log(
                totalHnormal,
                totalHTravailEffectif,
                tableauHsHebdo,
                tableauHs130Hebdo,
                tableauHs150Hebdo,
                totalHs130Monsuel,
                totalHs150Monsuel,
                totalHsNuitHabit,
                totalHsNuitOccas,
                totalHdim,
                totalHFerie,
              )
            }
          }
        } catch (error) {
          console.error('Erreur lors de la dispatch :', error)
        }
      }
    }

    fetchData()
  }, [salarie, dateFinFormated, dateDebutFormated, dispatch])

  // console.log(salaireBrut)

  // useEffect(() => {
  //   if (calcul.osie) {
  //     dispatch(setBulletinDePaie({ osie: calcul.osie }))
  //   }
  //   if (calcul.cnaps) {
  //     dispatch(setBulletinDePaie({ cnaps: calcul.cnaps }))
  //   }
  //   if (calcul.hsni130) {
  //     dispatch(setBulletinDePaie({ hsni130: calcul.hsni130 }))
  //   }
  //   if (calcul.hsni150) {
  //     dispatch(setBulletinDePaie({ hsni150: calcul.hsni150 }))
  //   }
  //   if (calcul.hsi130) {
  //     dispatch(setBulletinDePaie({ hsi130: calcul.hsi130 }))
  //   }
  //   if (calcul.hsi150) {
  //     dispatch(setBulletinDePaie({ hsi150: calcul.hsi150 }))
  //   }
  //   if (calcul.totalHs30) {
  //     dispatch(setBulletinDePaie({ totalHs30: calcul.totalHs30 }))
  //   }
  //   if (calcul.totalHs50) {
  //     dispatch(setBulletinDePaie({ totalHs50: calcul.totalHs50 }))
  //   }
  //   if (calcul.totalHDim) {
  //     dispatch(setBulletinDePaie({ totalHDim: calcul.totalHDim }))
  //   }
  //   if (calcul.totalHFerie) {
  //     dispatch(setBulletinDePaie({ totalHFerie: calcul.totalHFerie }))
  //   }
  //   if (calcul.valHsni130) {
  //     dispatch(setBulletinDePaie({ valHsni130: calcul.valHsni130 }))
  //   }
  //   if (calcul.valHsni150) {
  //     dispatch(setBulletinDePaie({ valHsni150: calcul.valHsni150 }))
  //   }
  //   if (calcul.valHsi130) {
  //     dispatch(setBulletinDePaie({ valHsi130: calcul.valHsi130 }))
  //   }
  //   if (calcul.valHsi150) {
  //     dispatch(setBulletinDePaie({ valHsi150: calcul.valHsi150 }))
  //   }
  //   if (calcul.valHs30) {
  //     dispatch(setBulletinDePaie({ valHs30: calcul.valHs30 }))
  //   }
  //   if (calcul.valHs50) {
  //     dispatch(setBulletinDePaie({ valHs50: calcul.valHs50 }))
  //   }
  //   if (calcul.valHdim) {
  //     dispatch(setBulletinDePaie({ valHdim: calcul.valHdim }))
  //   }
  //   if (calcul.valHFerie) {
  //     dispatch(setBulletinDePaie({ valHFerie: calcul.valHFerie }))
  //   }
  //   if (calcul.salaireBrut) {
  //     dispatch(setBulletinDePaie({ salaireBrut: calcul.salaireBrut }))
  //   }
  //   if (calcul.baseIrsa) {
  //     dispatch(setBulletinDePaie({ baseIrsa: calcul.baseIrsa }))
  //   }
  //   if (calcul.baseIrsaArrondi) {
  //     dispatch(setBulletinDePaie({ baseIrsaArrondi: calcul.baseIrsaArrondi }))
  //   }
  //   if (calcul.irsaAPayer) {
  //     dispatch(setBulletinDePaie({ irsaAPayer: calcul.irsaAPayer }))
  //   }
  //   if (calcul.salaireNet) {
  //     dispatch(setBulletinDePaie({ salaireNet: calcul.salaireNet }))
  //   }
  //   if (calcul.salaireNetAPayer) {
  //     dispatch(setBulletinDePaie({ salaireNetAPayer: calcul.salaireNetAPayer }))
  //   }
  // }, [calcul])

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
