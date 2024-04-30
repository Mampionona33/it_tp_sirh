import React from 'react'
import { CAlert, CCard } from '@coreui/react'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import { PlusIcon } from '@heroicons/react/24/outline'
import { v4 as uuidV4 } from 'uuid'
import { EnumBoolean, EnumGenre, IEmploye, IEnfantEmploye } from '@src/interfaces/interfaceEmploye'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import { ResiliationState } from '@src/interfaces/interfaceCardResiliationContrat'
import { useFieldArray, useForm, SubmitHandler } from 'react-hook-form'
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
import CardInfoPaieEmploye from './CardInfoPaieEmploye'
import CardResiliationContrat from './CardResiliationContrat'

interface IFormEmploye {
  id?: string | number
}

const classeCardTitle = 'mx-3 mb-0 mt-3 uppercase text-customRed-930 text-base'
const classeCard: string = 'rounded-sm pb-3 px-3'

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
      // console.log(formEmployeValidationError)
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
