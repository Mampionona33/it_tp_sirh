import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useEmployeeExists from '@src/hooks/useEmployeeExists'
import Page404 from '@src/views/pages/page404/Page404'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean } from '@src/interfaces/interfaceEmploye'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { DDMMYYYYFormat } from '@src/types/DateType'
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
import { fetchHeureEmploye } from '@src/redux/employeHours/employeHoursActions'
import CalculHeures_v2 from '@src/utils/CalculHeures_v2'
import CalculPaie_v2 from '@src/utils/CalculPaie_v2'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const ValidePaie = () => {
  const isEmployeExist = useEmployeeExists()
  const isDateValidationexist = useDateValidationExist()
  const { salarie } = useAppSelector((store) => store.bulletinDePaie)
  const { listDateDebutDateFin } = useAppSelector((store) => store.parametreCalendrier)

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
              // const totalHTravailEffectif = heureCalculator.getTotalHTravailEffectif()
              // const tableauHsHebdo = heureCalculator.getTableauHsHebdo()
              // const tableauHs130Hebdo = heureCalculator.getTableauHs130Hebdo()
              // const tableauHs150Hebdo = heureCalculator.getTableauHs150Hebdo()
              // const totalHs130Monsuel = heureCalculator.getTotalHs130Monsuel()
              // const totalHs150Monsuel = heureCalculator.getTotalHs150Monsuel()
              // const totalHsNuitHabit = heureCalculator.getTotalHsNuitHabit()
              // const totalHsNuitOccas = heureCalculator.getTotalHsNuitOccas()
              const totalHdim = heureCalculator.getTotalHdim()
              const totalHFerie = heureCalculator.getTotalHFerie()
              const totalHsni130 = heureCalculator.getTotalHsni130()
              const totalHsni150 = heureCalculator.getTotalHsni150()
              const totalHsi130 = heureCalculator.getTotalHsi130()
              const totalHsi150 = heureCalculator.getTotalHsi150()
              const totalHs30 = heureCalculator.getTotalHs30NuitHabit()
              const totalHs50 = heureCalculator.getTotalHs50NuitHabit()
              const totalHs = heureCalculator.getTotalHsMonsuel()

              const calculPaie = new CalculPaie_v2()
              const salaireDeBase = salarie.salaire_de_base
              calculPaie.setSalaireBase(salaireDeBase)
              calculPaie.setTauxHoraire(173.33)

              const valHsni130 = calculPaie.calculateValHsni130(totalHsni130)
              const valHsni150 = calculPaie.calculateValHsni150(totalHsni150)
              const valHsi130 = calculPaie.calculateValHsi130(totalHsi130)
              const valHsi150 = calculPaie.calculateValHsi150(totalHsi150)
              const valHdim = calculPaie.calculateValHdim(totalHdim)
              const valHs30 = calculPaie.calculateValHs30(totalHs30)
              const valHs50 = calculPaie.calculateValHs50(totalHs50)
              const valHFerie = calculPaie.calculateValHFerie(totalHFerie)

              // const salaireBrut = calculPaie.calculateSalaireBrut({
              //   rappel: rappel,
              //   totalPrimeEtGratification: totalPrimeEtGratification,
              //   totalDeduction: totalDeduction,
              //   valHdim: valHdim,
              //   valHs30: valHs30,
              //   valHs50: valHs50,
              //   valHFerie: valHFerie,
              //   valHsi130: valHsi130,
              //   valHsi150: valHsi150,
              //   valHsni130: valHsni130,
              //   valHsni150: valHsni150,
              // })

              dispatch(
                setBulletinDePaie({
                  totalHn: totalHnormal,
                  totalHs: totalHs,
                  hsi130: totalHsi130,
                  hsi150: totalHsi150,
                  hsni130: totalHsni130,
                  hsni150: totalHsni150,
                  totalHDim: totalHdim,
                  totalHs30: totalHs30,
                  totalHs50: totalHs50,
                  totalHFerie: totalHFerie,

                  valHdim: valHdim,
                  valHs30: valHs30,
                  valHs50: valHs50,
                  valHFerie: valHFerie,
                  valHsi130: valHsi130,
                  valHsi150: valHsi150,
                  valHsni130: valHsni130,
                  valHsni150: valHsni150,
                } as IBulletinDePaieProps),
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
