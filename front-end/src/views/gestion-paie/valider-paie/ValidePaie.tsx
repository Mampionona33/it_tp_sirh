import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useEmployeeExists from '@src/hooks/useEmployeeExists'
import Page404 from '@src/views/pages/page404/Page404'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean } from '@src/interfaces/interfaceEmploye'
import { format, parseISO } from 'date-fns'
import { enGB, fr } from 'date-fns/locale'
import { DDMMYYYYFormat } from '@src/types/DateType'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import CardSalaireBrut from './ValiderCalculPaie/CardSalaireBrut'
import CardSalaireNet from './ValiderCalculPaie/CardSalaireNet'
import CardSalaireNetAPayer from './ValiderCalculPaie/CardSalaireNetAPayer'
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
import AppModal from '@src/components/Modal/AppModal'
import FormValidateCalculPaie from './FormValidateCalculPaie'
import { setModalOpen } from '@src/redux/modal/modalReducer'
import useValidMonthFrMMMM from '@src/hooks/useValidMonth'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import Loading from '@src/components/loadings/Loading'
import { CAlert } from '@coreui/react'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import useFetchSalarie from '@src/hooks/useFetchSalarie'
import useFetchSalarieHsByDate from '@src/hooks/useFetchSalarieHsByDate'
import { IGetSalarieHsByDateProps } from '@src/interfaces/interfaceGetSalarieHsByDate'

const ValidePaie = () => {
  const isEmployeExist = useEmployeeExists()

  const { id, validationYear, validationMonth } = useParams()

  // const { salarie, dateDeVirement, validation } = useAppSelector((store) => store.bulletinDePaie)
  const { dateDeVirement, validation } = useAppSelector((store) => store.bulletinDePaie)
  const bulletinDePaie = useAppSelector((store) => store.bulletinDePaie)
  const { listDateDebutDateFin } = useAppSelector((store) => store.parametreCalendrier)
  const { loading: loadingListEmploye, error: errorFetchingListEmployee } = useAppSelector(
    (store) => store.employeesList,
  )

  const {
    data: salarie,
    error: errorFetchingSalarie,
    isLoading,
    isError: isErrorFetchingSalarie,
  } = useFetchSalarie(id)

  const { loading: loadingHours, error: errorFetchingHours } = useAppSelector(
    (store) => store.employeHours,
  )
  const formatErrorMessage = useErrorFormatter()

  const dispatch = useAppDispatch()

  const isMonthValid = useValidMonthFrMMMM(validationMonth!)

  const convetMonthFrToNumber = (monthFr: string): number => {
    let monthNumber = 0
    const tempDate = new Date()
    for (let i = 0; i < 12; i++) {
      tempDate.setMonth(i)
      tempDate.setDate(1) // Réinitialisez le jour à 1
      const tempDateMonthFr = format(tempDate, 'MMMM', { locale: fr })
      if (tempDateMonthFr === monthFr) {
        monthNumber = i + 1
      }
    }
    return monthNumber
  }

  const formatValidationDate = (): string => {
    const convertedMonthToNumber = convetMonthFrToNumber(validationMonth!)
    return `${validationYear}-${convertedMonthToNumber.toString().padStart(2, '0')}-01`
  }

  const dateValidation = formatValidationDate()

  const getMonthValidation = (): string => {
    if (dateValidation && isMonthValid) {
      const month = format(new Date(dateValidation), 'MMM', { locale: enGB })
      return month.slice(0, 3).toLowerCase()
    }
    return ''
  }
  const getDateDebutDateFin = (): { dateDebut: string; dateFin: string } | undefined => {
    const actualMonth = getMonthValidation()

    // Utilisez une assertion de type pour indiquer à TypeScript que la clé est valide
    return listDateDebutDateFin && (listDateDebutDateFin as any)[actualMonth]
  }

  let dateDebut: string = '00/00/0000'
  let dateFin: string = '00/00/0000'

  if (isMonthValid) {
    const dateObj = getDateDebutDateFin()
    if (dateObj) {
      dateDebut = dateObj.dateDebut
      dateFin = dateObj.dateFin
    }
  }

  const formatDateFin = (): DDMMYYYYFormat => {
    const parsedDateValidation = parseISO(dateValidation)
    const dayOfMonth = parseInt(dateFin)

    const formattedDateFin = new Date(
      parsedDateValidation.getFullYear(),
      parsedDateValidation.getMonth(),
      dayOfMonth,
    )
    if (isMonthValid) {
      return format(formattedDateFin, 'dd/MM/yyyy') as DDMMYYYYFormat
    }
    return '00/00/0000'
  }

  const formatDateDebut = (): DDMMYYYYFormat => {
    const parsedDateValidation = parseISO(dateValidation)

    const adjustedDate = new Date(parsedDateValidation)
    adjustedDate.setDate(Number(dateDebut))
    adjustedDate.setMonth(parsedDateValidation.getMonth() - 1)
    if (isMonthValid) {
      return format(adjustedDate, 'dd/MM/yyyy') as DDMMYYYYFormat
    }
    return '00/00/0000'
  }

  const dateDebutFormated = formatDateDebut()
  const dateFinFormated = formatDateFin()

  // Vérifier si les valeurs des paramètres d'URL sont définies
  const decodedYear = validationYear ? decodeURIComponent(validationYear) : undefined
  const decodedMonth = validationMonth ? decodeURIComponent(validationMonth) : undefined
  const data: IGetSalarieHsByDateProps = {
    annee: decodedYear,
    mois: decodedMonth,
    matricule: salarie?.matricule ?? '',
  }

  const {
    isLoading: isLoadingSalarieHsByDate,
    refetch,
    isError: isErrorFetchHs,
    error: errorFetchHs,
    salarieHs,
  } = useFetchSalarieHsByDate(data)

  useEffect(() => {
    if (salarie) {
      dispatch(
        setBulletinDePaie({
          salarie: salarie,
          salaireDeBase: salarie.salaire_de_base,
        } as unknown as IBulletinDePaieProps),
      )

      if (salarieHs) {
        const estCadre = salarie.categorie?.value === 'hc'
        const travailleurDeNuit = salarie.travail_de_nuit === EnumBoolean.OUI
        const { hs: totalHs, hsi, hsni, hsni130, hsni150 } = salarieHs

        dispatch(
          setBulletinDePaie({
            hsni130: hsni130 ? hsni130 : 0,
            hsni150: hsni150 ? hsni150 : 0,
            hsi150: hsi ? hsi : 0,
            totalHs: totalHs ? totalHs : 0,
          } as unknown as IBulletinDePaieProps),
        )
        const calculPaie = new CalculPaie_v2()
        const salaireDeBase = salarie.salaire_de_base
        calculPaie.setSalaireBase(salaireDeBase)
        calculPaie.setTauxHoraire(173.33)

        const valHsni130 = estCadre ? 0 : calculPaie.calculateValHsni130(hsni130)
        const valHsni150 = estCadre ? 0 : calculPaie.calculateValHsni150(hsni150)
        const valHsi150 = estCadre ? 0 : calculPaie.calculateValHsi150(hsi)

        dispatch(
          setBulletinDePaie({
            valHsni130: valHsni130 ? valHsni130 : 0,
            valHsni150: valHsni150 ? valHsni150 : 0,
            valHsi150: valHsi150 ? valHsi150 : 0,
          } as unknown as IBulletinDePaieProps),
        )
      }
    }
  }, [salarie, dateFinFormated, dateDebutFormated, dispatch, salarieHs])

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const validationStatus = EnumBoolean.OUI
    const validationDate = dateValidation
    const validationDay = validation.day ?? format(new Date(), 'yyyy-MM-dd')
    const validDateDevirement = dateDeVirement ?? format(new Date(), 'yyyy-MM-dd')

    dispatch(
      setBulletinDePaie({
        dateDeVirement: validDateDevirement,
        validation: {
          status: validationStatus,
          date: validationDate,
          day: validationDay,
        },
      } as IBulletinDePaieProps),
    )

    dispatch(setModalOpen())
  }

  // afficher les données au modifications
  // useEffect(() => {
  //   if (bulletinDePaie) {
  //     console.log(bulletinDePaie)
  //   }
  // }, [bulletinDePaie])

  const handleDateVirBancChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(setBulletinDePaie({ dateDeVirement: event.target.value } as IBulletinDePaieProps))
  }

  if (loadingListEmploye === 'loading' || loadingHours === 'loading') {
    return <Loading />
  }

  if (isLoading) {
    return <Loading />
  }

  if (isErrorFetchingSalarie) {
    return <CAlert color="danger">{formatErrorMessage(errorFetchingSalarie)}</CAlert>
  }

  return (
    <>
      <div>
        <AppModal>
          <FormValidateCalculPaie />
        </AppModal>
        {errorFetchingHours && (
          <CAlert color="danger">{formatErrorMessage(errorFetchingHours)}</CAlert>
        )}
        {isErrorFetchHs && <CAlert color="danger">{formatErrorMessage(errorFetchHs)}</CAlert>}
        {isMonthValid && salarie ? (
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 mt-2 mb-3">
              <div className="flex flex-row justify-between pt-2 pl-4 pr-4 pb-2 w-full bg-white shadow-sm rounded-sm">
                <div className="text-sm mt-1">
                  <p className="mb-1">Nom : {salarie.nom}</p>
                  <p className="mb-1">Prenom : {salarie.prenom}</p>
                  <p className="mb-1">Matricule : {salarie.matricule!}</p>
                </div>
                <div className="w-fit">
                  <CustomInputWithLabel
                    label="Date du bulletin de paie"
                    id="dateVirementBancaire"
                    name="dateVirementBancaire"
                    type="date"
                    value={dateDeVirement || format(new Date(), 'yyyy-MM-dd')}
                    required
                    onChange={handleDateVirBancChange}
                  />
                </div>
              </div>
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
