import React from 'react'
import InputWithFloatingLabel from '../Inputs/InputFloatingLabel'
import { CAlert, CCard, CCardBody, CCardFooter, CCardText } from '@coreui/react'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { v4 as uuidV4 } from 'uuid'
import { ICardEnfantEmployeProps } from '@src/interfaces/interfaceCardEnfantEmploye'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import { SetValueAction } from 'react-select'
import {
  CertificatEnfantProps,
  EnumBoolean,
  EnumCertificatEnfant,
  EnumGenre,
  IEmploye,
  IEnfantEmploye,
} from '@src/interfaces/interfaceEmploye'
import { useDispatch } from 'react-redux'
import {
  formEmployeAjoutEnfant,
  formEmployeSupprimerEnfant,
  setFormEmploye,
} from '@src/redux/FormEmploye/formEmployeReducer'
import { ICardInfoPersoEmploye } from '@src/interfaces/interfaceCardInfoPersoEmploye'
import SelectFloatingLable from '../Inputs/SelectFloatingLable'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import { ICardInfoProEmployeProps } from '@src/interfaces/interfaceCardInfoProEmploye'
import useFetchCategorieEmploye from '@src/hooks/useFetchCategorieEmploye'
import { ICardInfoPaieEmployeProps } from '@src/interfaces/interfaceCardInfoPaieEmploye'
import useFetchListModeDePayement from '@src/hooks/useFetchListModeDePayement'
import {
  ICardResiliationContratProps,
  ResiliationState,
} from '@src/interfaces/interfaceCardResiliationContrat'
import { format } from 'date-fns'
import { useController, useFieldArray, useForm, Controller, SubmitHandler } from 'react-hook-form'
import formEmployeSchema from '@src/schema/formEmployeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import useFetchSalarie from '@src/hooks/useFetchSalarie'
import Loading from '../loadings/Loading'
import employeService from '@src/services/EmployeeService'
import useMutateSalarie from '@src/hooks/useMutateSalarie'
import CustomCAlert from '../CustomAlert'
import { useNavigate } from 'react-router-dom'
import CardInfoPersoEmploye from './CardInfoPersoEmploye'
import CardEnfantEmploye from './CardEnfantEmploye'
import CardInfoProEmploye from './CardInfoProEmploye'

interface IFormEmploye {
  id?: string | number
}

const classeInput: string =
  'border-b border-b-customRed-800 focus:border-b-2 focus:outline-none w-full px-1 text-sm'
const classeCardBody: string =
  'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 px-8 w-full'
const classeCardTitle = 'mx-3 mb-0 mt-3 uppercase text-customRed-930 text-base'
const classeCard: string = 'rounded-sm pb-3 px-3'

const CardInfoPaieEmploye: React.FC<ICardInfoPaieEmployeProps> = ({
  data,
  register,
  formEmployeValidationError,
  control,
  setValue,
}) => {
  const dispatch = useDispatch()
  const {
    data: modeDePaiement,
    isLoading: isLoadingModeDePaiement,
    isError: isErrorModeDePaiement,
    error,
  } = useFetchListModeDePayement()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch(setFormEmploye({ [name]: value }))
  }

  React.useEffect(() => {
    if (data.mode_paiement_salaire) {
      setValue('mode_paiement_salaire', data.mode_paiement_salaire)
    }
  }, [setValue, data.mode_paiement_salaire])

  const {
    field: { value: selectedModeDePaiment, onChange: onChangeModeDePaiement, ...refModeDePaiement },
  } = useController({
    name: 'mode_paiement_salaire',
    control: control,
  })

  const handleSelectChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      onChangeModeDePaiement(newValue, action)
      // dispatch(setFormEmploye({ mode_paiement_salaire: newValue }))
    }
  }

  const handleFocusInputTypeNumber = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }

  if (isErrorModeDePaiement) {
    return <CAlert color="danger">Une erreur est survenue.</CAlert>
  }

  return (
    <>
      <CCard className={classeCard}>
        <h2 className={classeCardTitle}>Information sur la paie</h2>
        <CCardBody className={classeCardBody}>
          <Controller
            control={control}
            name="salaire_de_base"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Salaire de base"
                    type="number"
                    min={0}
                    required
                    placeholder="Salaire de base"
                    id="salaire_de_base"
                    className={classeInput}
                    onFocus={handleFocusInputTypeNumber}
                    value={value ? value.toString() : ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    {...rest}
                    // {...register('salaire_de_base')}
                    // name="salaire_de_base"
                    // value={data.salaire_de_base}
                    // onChange={handleInputChange}
                    // onFocus={handleFocusInputTypeNumber}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="rib"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="RIB"
                    placeholder="RIB: 00000 00000 00000000000 00"
                    id="rib"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    {...rest}
                    // name="rib"
                    // {...register('rib')}
                    // value={data.rib}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="num_cnaps"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Numero CNAPS"
                    placeholder="Numero CNAPS"
                    id="num_cnaps"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    {...rest}
                    // name="num_cnaps"
                    // {...register('num_cnaps')}
                    // value={data.num_cnaps}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            name="mode_paiement_salaire"
            control={control}
            render={({ field: { onChange, onBlur, value, ...rest }, fieldState: { error } }) => {
              // console.log(value)
              return (
                <div>
                  <SelectFloatingLable
                    {...rest}
                    required
                    label="Mode de paiement"
                    placeholder="Mode de paiement"
                    options={modeDePaiement ? modeDePaiement : selectedModeDePaiment}
                    value={value}
                    onBlur={onBlur}
                    onChange={(e) => handleSelectChange(e as string, 'select-option')}
                    isLoading={isLoadingModeDePaiement}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

const CardResiliationContrat: React.FC<ICardResiliationContratProps> = ({
  control,
  handleSubmit,
  register,
  formEmployeValidationError,
  id,
}) => {
  const dispatch = useDispatch()
  const handleTexteAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    // dispatch(setFormEmploye({ depart: { ...depart, [name]: value } }))
  }

  const {
    mutateAsync: mutateSalarie,
    error: errorMutate,
    isError: isErrorMutate,
    isSuccess: isSuccessMutate,
  } = useMutateSalarie()

  // const submitForm = async (data: IEmploye) => {
  //   const updatedData = {
  //     ...data,
  //     actif: EnumBoolean.NON,
  //   }
  //   console.log(updatedData)
  //   await mutateSalarie({ id, data: updatedData })
  // }

  return (
    <>
      <CCard>
        <h2 className={classeCardTitle}>Résiliation du contrat</h2>
        <CCardBody className="p-3 flex flex-col gap-3">
          <CCardText className="text-sm text-customRed-930">
            Veuillez confirmer la résiliation en saisissant les informations suivantes: nom,
            matricule de l'employe, ainsi que le motif de la resiliation. Merci de noter que cette
            action et irréversible. Assurez-vous de suivre le format suivant:
            <strong>nom matricule</strong>.
          </CCardText>

          <input
            type="hidden"
            value={format(new Date(), 'yyyy-MM-dd')}
            {...register('depart.date')}
          />

          <Controller
            name="depart.nom_matricule"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div className="w-1/3">
                  <label htmlFor="nom_matricule" className="visually-hidden">
                    nom et matricule
                  </label>
                  <div>
                    <input
                      type="text"
                      id="nom_matricule"
                      placeholder="Nom matricule"
                      {...rest}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ''}
                      ref={ref}
                      // name="nom_matricule"
                      // value={value!.nom_matricule}
                      // {...register('depart.nom_matricule')}
                      required
                      className="border text-sm p-2 h-[28px] w-full outline-customRed-930"
                    />
                    {error && <span className="text-red-500 text-sm">{error.message}</span>}
                  </div>
                </div>
              )
            }}
          />

          <Controller
            name="depart.motif"
            control={control}
            render={({ field: { onChange, onBlur, value, ...rest }, fieldState: { error } }) => {
              return (
                <div>
                  <textarea
                    {...rest}
                    id="motif"
                    rows={3}
                    placeholder="Motif de la resiliation du contrat"
                    required
                    className="border outline-customRed-930 text-sm p-1 w-full"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    // {...register('depart.motif')}
                    // name="motif"
                    // value={data.depart?.motif}
                    // onChange={handleTexteAreaChange}
                  ></textarea>
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />
        </CCardBody>
        <CCardFooter className="flex justify-end">
          <ButtonWithIcon
            label="Résilier"
            type="submit"
            name="submit-resiliation"
            // onClick={handleSubmit(submitForm)}
          />
        </CCardFooter>
      </CCard>
    </>
  )
}

const FormEmploye: React.FC<IFormEmploye> = ({ id }) => {
  const { data: employe, error, isError, isLoading, refetch } = useFetchSalarie(id)
  const [showResiliationCard, setShowResiliationCard] = React.useState(false)
  const navigate = useNavigate()
  const [etatResiliation, setEtatResiliation] = React.useState<ResiliationState>('idle')

  const [notification, setNotification] = React.useState<{ message: string; color: string }>({
    message: '',
    color: '',
  })

  const {
    mutateAsync: mutateSalarie,
    error: errorMutate,
    isError: isErrorMutate,
    isSuccess: isSuccessMutate,
  } = useMutateSalarie()

  const updateEmploye: SubmitHandler<IEmploye> = async (data: IEmploye): Promise<void> => {
    const depart = getValues('depart')

    if (etatResiliation !== 'canceled') {
      if (!depart) {
        console.log('update employe', data)
        await mutateSalarie({ id, data })
      } else {
        const updatedData: IEmploye = {
          ...data,
          actif: EnumBoolean.NON,
        }
        console.log('resilié contrat', updatedData)
        await mutateSalarie({ id, data: updatedData })
      }
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formEmployeValidationError },
    control: controlFormEmploye,
    setValue,
    reset,
    getValues,
  } = useForm<IEmploye>({
    resolver: zodResolver(formEmployeSchema),
    defaultValues: async () => {
      if (id) {
        const resp = await employeService.getById(String(id))
        const data = resp.data as IEmploye
        return { ...data }
      } else {
        return {
          id: '',
          nom: '',
          prenom: '',
          adresse: '',
          date_delivrance_cin: '',
          date_embauche: '',
          date_naissance: '',
          departement: '',
          genre: EnumGenre.MASCULIN,
          lieu_naissance: '',
          lieu_travail: '',
          categorie: undefined,
          matricule: '',
          num_cin: '',
          salaire_de_base: 0,
          titre_poste: '',
          travail_de_nuit: EnumBoolean.NON,
          actif: EnumBoolean.OUI,
          avance: undefined,
          conjoint: undefined,
          contact_urgence: undefined,
          depart: undefined,
          email: '',
          enfant: undefined,
          est_cadre: EnumBoolean.NON,
          indemnites: undefined,
          nom_mere: '',
          nom_pere: '',
          mode_paiement_salaire: undefined,
          num_cnaps: '',
          rib: '',
          telephone: '',
        }
      }
    },
  })

  const {
    fields: listeEnfant,
    append: ajoutEnfant,
    remove: supprimerEnfant,
    update: updateEnfant,
  } = useFieldArray({ control: controlFormEmploye, name: 'enfant' })

  const addEnfant = () => {
    const newId = uuidV4()
    const nouvelEnfant: IEnfantEmploye = {
      id: newId,
      nom: '',
      prenom: '',
      date_naissance: '',
      lieu_naissance: '',
      certificat: undefined,
      genre_enfant: EnumGenre.MASCULIN,
      action: 'ajout',
    }
    ajoutEnfant(nouvelEnfant)
    // dispatch(formEmployeAjoutEnfant(nouvelEnfant))
  }

  React.useEffect(() => {
    if (isSuccessMutate) {
      if (!id) {
        reset()
        setNotification({
          message: 'Le salarie a bien été ajouté avec success',
          color: 'success',
        })
        setValue('enfant', undefined)
        navigate('/employees/ajout')
      } else {
        const depart = getValues('depart')
        if (etatResiliation !== 'canceled') {
          if (!depart) {
            setNotification({
              message: 'Le salarie a bien été modifié avec success',
              color: 'success',
            })
          }
        }
        if (etatResiliation === 'open' && depart) {
          navigate('/employees/list')
        }
      }
    }

    if (isErrorMutate) {
      setNotification({
        message: 'Une erreur est survenue',
        color: 'danger',
      })
    }

    if (!showResiliationCard) {
      setValue('depart', undefined)
    }

    if (formEmployeValidationError && Object.keys(formEmployeValidationError).length > 0) {
      console.log(formEmployeValidationError)
      setNotification({
        message: 'Veuillez vérifier tous les champs.',
        color: 'danger',
      })
    }

    // Juste verification des valeur
    // A supprimer après mod dev
    const subscri = watch((value, { name, type }) => {
      // console.log(value, name, type)
    })
    return () => {
      subscri.unsubscribe()
    }
  }, [
    watch,
    isSuccessMutate,
    getValues,
    id,
    etatResiliation,
    navigate,
    reset,
    showResiliationCard,
    setValue,
    isErrorMutate,
    setNotification,
    formEmployeValidationError,
  ])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <CAlert color="danger">Une erreur est survenue</CAlert>
  }

  return (
    <div className="flex flex-col gap-3">
      <form
        action=""
        method="POST"
        className="flex gap-3 flex-col"
        onSubmit={handleSubmit(updateEmploye)}
        // onSubmit={submitForm}
      >
        <input type="text" className="hidden" {...register('id')} />
        <CardInfoPersoEmploye
          control={controlFormEmploye}
          register={register}
          setValue={setValue}
        />
        <CCard className={classeCard}>
          <div className="flex flex-col gap-2">
            <h2 className={classeCardTitle}>Enfants</h2>
            <div className="mx-3">
              <ButtonWithIcon
                type="button"
                label="Ajouter un enfant"
                icon={<PlusIcon width={18} height={18} />}
                onClick={addEnfant}
              />
            </div>
          </div>

          <div className="flex flex-col">
            {listeEnfant &&
              listeEnfant.map((enfant, index) => (
                <CardEnfantEmploye
                  setValue={setValue}
                  control={controlFormEmploye}
                  key={enfant.id}
                  index={index}
                  register={register}
                  value={enfant}
                  update={updateEnfant}
                  remove={supprimerEnfant}
                  formEmployeValidationError={formEmployeValidationError}
                />
              ))}
          </div>
        </CCard>

        <CardInfoProEmploye
          setValue={setValue}
          control={controlFormEmploye}
          register={register}
          formEmployeValidationError={formEmployeValidationError}
          data={{
            travail_de_nuit: employe?.travail_de_nuit || EnumBoolean.NON,
            matricule: employe?.matricule || '',
            date_embauche: employe?.date_embauche || '',
            departement: employe?.departement || '',
            titre_poste: employe?.titre_poste || '',
            categorie: employe?.categorie,
            lieu_travail: employe?.lieu_travail || '',
            telephone: employe?.telephone || '',
            email: employe?.email || '',
          }}
        />
        <CardInfoPaieEmploye
          setValue={setValue}
          control={controlFormEmploye}
          register={register}
          formEmployeValidationError={formEmployeValidationError}
          data={{
            salaire_de_base: employe?.salaire_de_base || 0,
            mode_paiement_salaire: employe?.mode_paiement_salaire,
            rib: employe?.rib || '',
            num_cnaps: employe?.num_cnaps || '',
          }}
        />

        {formEmployeValidationError && Object.keys(formEmployeValidationError).length > 0 ? (
          <CustomCAlert color={notification.color}>{notification.message}</CustomCAlert>
        ) : null}
        {isSuccessMutate && (
          <CustomCAlert color={notification.color}>{notification.message}</CustomCAlert>
        )}
        {isErrorMutate && (
          <CustomCAlert color={notification.color}>{notification.message}</CustomCAlert>
        )}

        <CCard>
          <FormEmployeGroupButton
            id={id}
            resiliationCardOpen={showResiliationCard}
            setShowResiliationCard={setShowResiliationCard}
            setEtatResiliation={setEtatResiliation}
          />
        </CCard>
        {showResiliationCard ? (
          <CardResiliationContrat
            id={id}
            control={controlFormEmploye}
            register={register}
            handleSubmit={handleSubmit}
            formEmployeValidationError={formEmployeValidationError}
          />
        ) : null}
      </form>
    </div>
  )
}

export default FormEmploye
