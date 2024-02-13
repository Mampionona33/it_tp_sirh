import React, { useEffect } from 'react'
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
import { ICardResiliationContratProps } from '@src/interfaces/interfaceCardResiliationContrat'
import { format } from 'date-fns'
import { useController, useFieldArray, useForm, Controller } from 'react-hook-form'
import formEmployeSchema from '@src/schema/formEmployeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import useFetchSalarie from '@src/hooks/useFetchSalarie'
import Loading from '../loadings/Loading'
import Page404 from '@src/views/pages/page404/Page404'
import { isNull } from 'util'
import employeService from '@src/services/EmployeeService'

interface IFormEmploye {
  id?: string | number
}

const classeInput: string =
  'border-b border-b-customRed-800 focus:border-b-2 focus:outline-none w-full px-1 text-sm'
const classeCardBody: string =
  'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 px-8 w-full'
const classeCardTitle = 'mx-3 mb-0 mt-3 uppercase text-customRed-930 text-base'
const classeCard: string = 'rounded-sm pb-3 px-3'

const CardInfoPersoEmploye: React.FC<ICardInfoPersoEmploye> = ({
  data,
  register,
  formEmployeValidationError,
  setValue,
}) => {
  const dispatch = useDispatch()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = event.target
    dispatch(setFormEmploye({ [name]: value }))
  }

  return (
    <CCard className={classeCard}>
      <h2 className={classeCardTitle}>Information personnelles</h2>
      <CCardBody className={classeCardBody}>
        <div>
          <InputWithFloatingLabel
            label="Nom employé"
            required
            placeholder="Nom"
            id="nom"
            className={classeInput}
            {...register('nom')}
            // value={data?.nom}
            // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            //   setValue('nom', event.target.value)
            // }
          />
          {formEmployeValidationError.nom && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.nom.message}
            </span>
          )}
        </div>

        <div>
          <InputWithFloatingLabel
            label="Prénom employé"
            required
            id="prenom"
            placeholder="Prénom employé"
            className={classeInput}
            {...register('prenom')}
            // value={data?.prenom}
            // onChange={handleInputChange}
          />
          {formEmployeValidationError.prenom && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.prenom.message}
            </span>
          )}
        </div>

        <div>
          <InputWithFloatingLabel
            label="Adresse"
            required
            id="adresse"
            placeholder="Adresse"
            className={classeInput}
            {...register('adresse')}
            // value={data?.adresse}
            // onChange={handleInputChange}
          />
          {formEmployeValidationError.adresse && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.adresse.message}
            </span>
          )}
        </div>

        <div>
          <InputWithFloatingLabel
            label="Date de naissance"
            type="date"
            required
            id="date_naissance"
            placeholder="Date de naissance"
            className={classeInput}
            {...register('date_naissance')}
            // value={data?.date_naissance}
            // onChange={handleInputChange}
          />
          {formEmployeValidationError.date_naissance && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.date_naissance.message}
            </span>
          )}
        </div>

        <div>
          <InputWithFloatingLabel
            label="Lieu de naissance"
            required
            id="lieu_naissance"
            placeholder="Lieu de naissance"
            {...register('lieu_naissance')}
            className={classeInput}
            // value={data?.lieu_naissance}
            // onChange={handleInputChange}
          />
          {formEmployeValidationError.lieu_naissance && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.lieu_naissance.message}
            </span>
          )}
        </div>

        <div>
          <InputWithFloatingLabel
            label="N° CIN"
            required
            id="num_cin"
            placeholder="N° CIN: 000 000 000 000"
            className={classeInput}
            {...register('num_cin')}
            // value={data?.num_cin}
            // onChange={handleInputChange}
          />
          {formEmployeValidationError.num_cin && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.num_cin.message}
            </span>
          )}
        </div>

        <div>
          <InputWithFloatingLabel
            label="Date de delivrance CIN"
            type="date"
            required
            {...register('date_delivrance_cin')}
            id="date_delivrance_cin"
            placeholder="Date de delivrance CIN"
            className={classeInput}
            // value={data?.date_delivrance_cin}
            // onChange={handleInputChange}
          />
          {formEmployeValidationError.date_delivrance_cin && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.date_delivrance_cin.message}
            </span>
          )}
        </div>

        <div>
          <InputWithFloatingLabel
            label="Nom du père"
            // name="nom_pere"
            {...register('nom_pere')}
            id="nom_pere"
            placeholder="Nom du père"
            className={classeInput}
            // value={data?.nom_pere}
            // onChange={handleInputChange}
          />
          {formEmployeValidationError.nom_pere && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.nom_pere.message}
            </span>
          )}
        </div>

        <div>
          <InputWithFloatingLabel
            label="Nom de la mère"
            // name="nom_mere"
            {...register('nom_mere')}
            id="nom_mere"
            placeholder="Nom de la mère"
            className={classeInput}
            // value={data?.nom_mere}
            // onChange={handleInputChange}
          />
          {formEmployeValidationError.nom_mere && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.nom_mere.message}
            </span>
          )}
        </div>
        <fieldset id="genre" className="border border-solid border-gray-300 p-3">
          <legend className="text-sm">Genre</legend>
          <div className="flex gap-1 flex-col">
            <label htmlFor="genre_masculin" className="flex gap-3 items-center text-sm">
              <input
                type="radio"
                {...register('genre')}
                id="genre_masculin"
                value={EnumGenre.MASCULIN}
                className="w-3 h-3 text-sm"
                // name="genre"
                // checked={data?.genre === EnumGenre.MASCULIN}
                // onChange={handleInputChange}
              />
              <span>Masculin</span>
            </label>
            <label htmlFor="genre_feminin" className="flex gap-3 items-center text-sm">
              <input
                type="radio"
                {...register('genre')}
                id="genre_feminin"
                value={EnumGenre.FEMININ}
                className="w-3 h-3 text-sm"
                // name="genre"
                // onChange={handleInputChange}
                // checked={data?.genre === EnumGenre.FEMININ}
              />
              <span>Féminin</span>
            </label>
          </div>
          {formEmployeValidationError.genre && (
            <span className="text-sm text-customRed-800">
              {formEmployeValidationError.genre.message}
            </span>
          )}
        </fieldset>
      </CCardBody>
    </CCard>
  )
}

const CardEnfantEmploye: React.FC<ICardEnfantEmployeProps> = ({
  index,
  data,
  formEmployeValidationError,
  register,
  control,
  setValue,
  value,
  remove,
  update,
}) => {
  const { enfant: listeEnfants } = useAppSelector((state) => state.formEmploye)
  const dispatch = useDispatch()
  const handleDeleteEnf = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(formEmployeSupprimerEnfant(data.id))
    remove(Number(index))
  }

  const idNom = uuidV4()
  const certificat = uuidV4()
  const idPrenom = uuidV4()
  const idDateNaissance = uuidV4()
  const idLieuNaissance = uuidV4()
  const idGenreMasculin = uuidV4()
  const idGenreFeminin = uuidV4()
  const idGenre = uuidV4()

  const optionCertificat: { label: string; value: EnumCertificatEnfant }[] = [
    { label: '---', value: EnumCertificatEnfant.AUCUN },
    { label: 'Certificat de vie', value: EnumCertificatEnfant.VIE },
    { label: 'Certificat de scolarité', value: EnumCertificatEnfant.SCOLARITE },
    { label: 'Certificat de médical', value: EnumCertificatEnfant.MEDICAL },
  ]

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target

  //   const updatedEnfants = listeEnfants!.map((enfant: IEnfantEmploye) => {
  //     if (enfant.id === data.id) {
  //       if (name.includes('genre_enfant')) {
  //         return {
  //           ...enfant,
  //           genre_enfant: value,
  //         }
  //       }
  //       return {
  //         ...enfant,
  //         [name]: value,
  //       }
  //     }
  //     return enfant
  //   })
  //   setValue('enfant', updatedEnfants as IEnfantEmploye[], {
  //     shouldDirty: true,
  //     shouldValidate: true,
  //   })
  //   dispatch(setFormEmploye({ enfant: updatedEnfants }))
  // }

  const handleSelectChange = (newValue: CertificatEnfantProps, action: SetValueAction) => {
    if (action === 'select-option') {
      setValue(`enfant.${index}.certificat` as any, newValue)

      // const updatedEnfants = listeEnfants!.map((enfant) => {
      //   console.log(newValue)

      //   if (enfant.id === data.id) {
      //     return {
      //       ...enfant,
      //       categorie: newValue,
      //     }
      //   }
      //   return enfant
      // })
      // dispatch(setFormEmploye({ enfant: updatedEnfants }))
    }
  }

  return (
    <>
      <div className="max-w-full border border-slate-300 rounded-sm m-3 relative ">
        <ButtonWithIcon
          className="absolute h-[20px] right-0 top-0"
          onClick={handleDeleteEnf}
          icon={<XMarkIcon width={18} height={18} />}
        ></ButtonWithIcon>
        <div className="grid mx-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 p-3">
          <div>
            <InputWithFloatingLabel
              label="Nom"
              required
              placeholder="Nom"
              {...register(`enfant.${index}.nom` as any)}
              id={idNom}
              className={classeInput}
              // name="nom"
              // value={value.nom}
              // onChange={handleInputChange}
            />
          </div>

          <div>
            <InputWithFloatingLabel
              label="Prènom"
              required
              placeholder="Prènom"
              // name="prenom"
              {...register(`enfant.${index}.prenom` as any)}
              id={idPrenom}
              className={classeInput}
              // value={value.prenom}
            />
          </div>

          <InputWithFloatingLabel
            label="Lieu de naissance"
            required
            placeholder="Lieu de naissance"
            id={idLieuNaissance}
            className={classeInput}
            {...register(`enfant.${index}.lieu_naissance` as any)}
            // name="lieu_naissance"
            // value={data.lieu_naissance}
            // onChange={handleInputChange}
          />
          <InputWithFloatingLabel
            label="Date de naissance"
            type="date"
            required
            {...register(`enfant.${index}.date_naissance` as any)}
            id={idDateNaissance}
            placeholder="Date de naissance"
            className={classeInput}
            // name="date_naissance"
            // value={data.date_naissance}
            // onChange={handleInputChange}
          />

          {/**
           * Utilisation de Controller pour intégrer React-select.
           * Controller permet de gérer les champs de formulaire avec React-hook-form.
           * Cela nous permet de synchroniser facilement les valeurs du formulaire avec les composants externes comme React-select.
           */}
          <Controller
            control={control}
            name="enfant"
            render={({ field: { onBlur, onChange, value, name, ref, ...rest } }) => {
              const handleChange = (newValue: any) => {
                // Mettre à jour la valeur sélectionnée pour le certificat dans le tableau value
                const updatedValue = value!.map((enfant: IEnfantEmploye, idx: number) => {
                  if (idx === Number(index)) {
                    return {
                      ...enfant,
                      certificat: newValue,
                    }
                  }
                  return enfant
                })
                onChange(updatedValue)
              }

              const enfantValue = value && value[Number(index)]
              const valueCertificat =
                enfantValue && enfantValue.certificat
                  ? enfantValue.certificat
                  : {
                      label: '---',
                      value: EnumCertificatEnfant.AUCUN,
                    }

              return (
                <SelectFloatingLable
                  {...rest}
                  label="Certificat"
                  placeholder="Certificat"
                  id={certificat}
                  defaultValue={valueCertificat}
                  options={optionCertificat}
                  value={valueCertificat}
                  name="certificat"
                  ref={ref}
                  onBlur={onBlur}
                  onChange={(newValue) => handleChange(newValue)} // Utiliser la fonction handleChange
                />
              )
            }}
          />

          <fieldset id={idGenre} className="border border-solid border-gray-300 p-3">
            <legend className="text-sm">Genre</legend>
            <div className="flex gap-1 flex-col">
              <label htmlFor={idGenreMasculin} className="flex gap-3 items-center text-sm">
                <input
                  type="radio"
                  {...register(`enfant.${index}.genre_enfant` as any)}
                  id={idGenreMasculin}
                  className="w-3 h-3 text-sm"
                  value={EnumGenre.MASCULIN}
                  // name={`genre_enfant_${data.id}`}
                  // checked={data.genre_enfant === EnumGenre.MASCULIN}
                  // onChange={handleInputChange}
                />
                <span>Masculin</span>
              </label>
              <label htmlFor={idGenreFeminin} className="flex gap-3 items-center text-sm">
                <input
                  type="radio"
                  id={idGenreFeminin}
                  {...register(`enfant.${index}.genre_enfant` as any)}
                  className="w-3 h-3 text-sm"
                  value={EnumGenre.FEMININ}
                  // name={`genre_enfant_${data.id}`}
                  // onChange={handleInputChange}
                  // checked={data.genre_enfant === EnumGenre.FEMININ}
                />
                <span>Féminin</span>
              </label>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  )
}

const CardInfoProEmploye: React.FC<ICardInfoProEmployeProps> = ({
  data,
  register,
  formEmployeValidationError,
  control,
  setValue,
}) => {
  const {
    matricule,
    titre_poste,
    departement,
    date_embauche,
    lieu_travail,
    telephone,
    email,
    travail_de_nuit,
    categorie,
  } = data

  const dispatch = useDispatch()

  React.useEffect(() => {
    if (categorie) {
      setValue('categorie', categorie)
    }
  }, [categorie, setValue])

  const {
    field: { value: categorieValue, onChange: catOnChange, ...refCategorie },
  } = useController({ name: 'categorie', control: control })

  const {
    data: categories,
    isError: isErrorCategorieEmploye,
    error,
    isLoading: isLoadingCategorieEmploye,
  } = useFetchCategorieEmploye()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch(setFormEmploye({ [name]: value }))
  }

  const handleSelectChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      dispatch(setFormEmploye({ categorie: newValue }))
      catOnChange(newValue, action)
    }
  }

  if (isErrorCategorieEmploye) {
    return <CAlert color="danger">{(error as Error).message}</CAlert>
  }

  return (
    <>
      <CCard className={classeCard}>
        <h2 className={classeCardTitle}>Information professionnelles</h2>
        <CCardBody className={classeCardBody}>
          <div>
            <InputWithFloatingLabel
              label="Matricule"
              required
              placeholder="Matricule"
              {...register('matricule')}
              id="matricule"
              className={classeInput}
              // name="matricule"
              // value={matricule}
              // onChange={handleInputChange}
            />
            {formEmployeValidationError.matricule && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.matricule.message}
              </span>
            )}
          </div>

          <div>
            <InputWithFloatingLabel
              label="Titre du poste"
              required
              placeholder="Titre du poste"
              id="titre_poste"
              {...register('titre_poste')}
              className={classeInput}
              // name="titre_poste"
              // value={titre_poste}
              // onChange={handleInputChange}
            />
            {formEmployeValidationError.titre_poste && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.titre_poste.message}
              </span>
            )}
          </div>

          <Controller
            control={control}
            name="categorie"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              // console.log(value, 'value')
              return (
                <div>
                  <SelectFloatingLable
                    label="Catégorie"
                    placeholder="Categorie"
                    {...rest}
                    required
                    value={value ? value : categorieValue}
                    onChange={(e) => handleSelectChange(e as string, 'select-option')}
                    options={categories}
                    isLoading={isLoadingCategorieEmploye}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <div>
            <InputWithFloatingLabel
              label="Département"
              required
              placeholder="Département"
              {...register('departement')}
              id="departement"
              className={classeInput}
              // name="departement"
              // value={departement}
              // onChange={handleInputChange}
            />
            {formEmployeValidationError.departement && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.departement.message}
              </span>
            )}
          </div>

          <div>
            <InputWithFloatingLabel
              label="Date d'embauche"
              type="date"
              required
              placeholder="Département"
              {...register('date_embauche')}
              id="date_embauche"
              className={classeInput}
              // name="date_embauche"
              // value={date_embauche}
              // onChange={handleInputChange}
            />
            {formEmployeValidationError.date_embauche && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.date_embauche.message}
              </span>
            )}
          </div>

          <div>
            <InputWithFloatingLabel
              label="Lieu de travail"
              required
              placeholder="Lieu de travail"
              {...register('lieu_travail')}
              id="lieu_travail"
              className={classeInput}
              // name="lieu_travail"
              // value={lieu_travail}
              // onChange={handleInputChange}
            />
            {formEmployeValidationError.lieu_travail && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.lieu_travail.message}
              </span>
            )}
          </div>

          <div>
            <InputWithFloatingLabel
              label="Telephone"
              placeholder="Telephone"
              {...register('telephone')}
              id="telephone"
              className={classeInput}
              // name="telephone"
              // value={telephone}
              // onChange={handleInputChange}
            />
            {formEmployeValidationError.telephone && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.telephone.message}
              </span>
            )}
          </div>

          <div>
            <InputWithFloatingLabel
              label="Email"
              type="email"
              placeholder="Email: employe@example.com"
              {...register('email')}
              id="email"
              className={classeInput}
              // name="email"
              // value={email}
              // onChange={handleInputChange}
            />
            {formEmployeValidationError.email && (
              <span className="text-red-500 text-sm">
                {' '}
                {formEmployeValidationError.email.message}
              </span>
            )}
          </div>
          <fieldset id="travail_de_nuit" className="border border-solid border-gray-300 p-3">
            <legend className="text-sm">Travail de nuit</legend>
            <div className="flex gap-1 flex-col">
              <label htmlFor="travail_de_nuit_oui" className="flex items-center gap-3 text-sm">
                <input
                  type="radio"
                  {...register('travail_de_nuit')}
                  id="travail_de_nuit_oui"
                  className="w-3 h-3 text-sm"
                  value={EnumBoolean.OUI}
                  // name="travail_de_nuit"
                  // checked={travail_de_nuit === EnumBoolean.OUI}
                  // onChange={handleInputChange}
                />
                <span>Oui</span>
              </label>

              <label htmlFor="travail_de_nuit_non" className="flex gap-3 items-center text-sm">
                <input
                  type="radio"
                  {...register('travail_de_nuit')}
                  id="travail_de_nuit_non"
                  className="w-3 h-3 text-sm text-center"
                  value={EnumBoolean.NON}
                  // name="travail_de_nuit"
                  // onChange={handleInputChange}
                  // checked={travail_de_nuit === EnumBoolean.NON}
                />
                <span>Non</span>
              </label>
            </div>
            {formEmployeValidationError.travail_de_nuit && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.travail_de_nuit.message}
              </span>
            )}
          </fieldset>
        </CCardBody>
      </CCard>
    </>
  )
}

const CardInfoPaieEmploye: React.FC<ICardInfoPaieEmployeProps> = ({
  data,
  register,
  formEmployeValidationError,
  contol,
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
    control: contol,
  })

  const handleSelectChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      onChangeModeDePaiement(newValue, action)
      dispatch(setFormEmploye({ mode_paiement_salaire: newValue }))
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
        <h2 className={classeCardTitle}>Information de paie</h2>
        <CCardBody className={classeCardBody}>
          <div>
            <InputWithFloatingLabel
              label="Salaire de base"
              type="number"
              min={0}
              required
              placeholder="Salaire de base"
              {...register('salaire_de_base')}
              id="salaire_de_base"
              className={classeInput}
              // name="salaire_de_base"
              // value={data.salaire_de_base}
              // onChange={handleInputChange}
              // onFocus={handleFocusInputTypeNumber}
            />
            {formEmployeValidationError.salaire_de_base && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.salaire_de_base.message}
              </span>
            )}
          </div>

          <div>
            <InputWithFloatingLabel
              label="RIB"
              placeholder="RIB: 00000 00000 00000000000 00"
              {...register('rib')}
              id="rib"
              className={classeInput}
              // name="rib"
              // value={data.rib}
              // onChange={handleInputChange}
            />
            {formEmployeValidationError.rib && (
              <span className="text-red-500 text-sm">{formEmployeValidationError.rib.message}</span>
            )}
          </div>

          <div>
            <InputWithFloatingLabel
              label="Numero CNAPS"
              placeholder="Numero CNAPS"
              {...register('num_cnaps')}
              id="num_cnaps"
              className={classeInput}
              // name="num_cnaps"
              // value={data.num_cnaps}
              // onChange={handleInputChange}
            />
            {formEmployeValidationError.num_cnaps && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.num_cnaps.message}
              </span>
            )}
          </div>

          <Controller
            name="mode_paiement_salaire"
            control={contol}
            render={({ field: { onChange, value, ...rest }, fieldState: { error } }) => (
              <div>
                <SelectFloatingLable
                  {...rest}
                  required
                  label="Mode de paiement"
                  placeholder="Mode de paiement"
                  options={modeDePaiement ? modeDePaiement : selectedModeDePaiment}
                  value={value}
                  onChange={(e) => handleSelectChange(e as string, 'select-option')}
                  isLoading={isLoadingModeDePaiement}
                />
                {error && <span className="text-red-500 text-sm">{error.message}</span>}
              </div>
            )}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

const CardResiliationContrat: React.FC<ICardResiliationContratProps> = ({ data }) => {
  const { depart } = data
  const dispatch = useDispatch()
  const handleTexteAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    dispatch(setFormEmploye({ depart: { ...depart, [name]: value } }))
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const dateDepart = new Date()
    dispatch(setFormEmploye({ depart: { ...depart, date: format(dateDepart, 'yyyy-MM-dd') } }))
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <CCard>
        <h2 className={classeCardTitle}>Résiliation du contrat</h2>
        <CCardBody className="p-3 flex flex-col gap-3">
          <CCardText className="text-sm text-customRed-930">
            Veuillez confirmer la résiliation en saisissant les informations suivantes: nom,
            matricule de l'employe, ainsi que le motif de la resiliation. Merci de noter que cette
            action et irréversible. Assurez-vous de suivre le format suivant:
            <strong>nom matricule</strong>.
          </CCardText>
          <div className="w-1/3">
            <label htmlFor="nom_matricule" className="visually-hidden">
              nom et matricule
            </label>
            <input
              type="text"
              name="nom_matricule"
              id="nom_matricule"
              placeholder="Nom matricule"
              required
              className="border text-sm p-2 h-[28px] w-full outline-customRed-930"
            />
          </div>
          <textarea
            name="motif"
            id="motif"
            cols={10}
            rows={3}
            placeholder="Motif de la resiliation du contrat"
            required
            className="border outline-customRed-930 text-sm p-1"
            value={data.depart?.motif}
            onChange={handleTexteAreaChange}
          ></textarea>
        </CCardBody>
        <CCardFooter className="flex justify-end">
          <ButtonWithIcon label="Résilier" type="submit" name="submit-resiliation" />
        </CCardFooter>
      </CCard>
    </form>
  )
}

const FormEmploye: React.FC<IFormEmploye> = ({ id }) => {
  const { data: employe, error, isError, isLoading, refetch, isSuccess } = useFetchSalarie(id)

  const submitForm = (data: IEmploye) => {
    console.log(data)
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formEmployeValidationError },
    control: controlFormEmploye,
    setValue,
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
          num_osie: '',
          prime_et_avantage_permanent: [],
          rib: '',
          telephone: '',
        }
      }
    },
  })

  // React.useEffect(() => {
  //   const subscri = watch((value, { name, type }) => {
  //     console.log(value, name, type)
  //   })
  //   return () => {
  //     subscri.unsubscribe()
  //   }
  // }, [watch])

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

  if (formEmployeValidationError) {
    console.log(formEmployeValidationError)
  }

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
        method="post"
        className="flex gap-3 flex-col"
        onSubmit={handleSubmit(submitForm)}
        // onSubmit={submitForm}
      >
        <input type="text" className="hidden" value={id} {...register('id')} />
        <CardInfoPersoEmploye
          register={register}
          formEmployeValidationError={formEmployeValidationError}
          setValue={setValue}
          data={{
            nom: employe?.nom || '',
            adresse: employe?.adresse || '',
            date_delivrance_cin: employe?.date_delivrance_cin || '',
            date_naissance: employe?.date_naissance || '',
            genre: employe?.genre || EnumGenre.MASCULIN,
            lieu_naissance: employe?.lieu_naissance || '',
            num_cin: employe?.num_cin || '',
            prenom: employe?.prenom || '',
            nom_mere: employe?.nom_mere,
            nom_pere: employe?.nom_pere,
          }}
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
                  data={enfant}
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
          contol={controlFormEmploye}
          register={register}
          formEmployeValidationError={formEmployeValidationError}
          data={{
            salaire_de_base: employe?.salaire_de_base || 0,
            mode_paiement_salaire: employe?.mode_paiement_salaire,
            rib: employe?.rib || '',
            num_cnaps: employe?.num_cnaps || '',
          }}
        />
        <CCard>
          <pre>{JSON.stringify(watch, null, 2)}</pre>
          <FormEmployeGroupButton />
        </CCard>
      </form>
      {/* <CardResiliationContrat data={{ depart }} /> */}
    </div>
  )
}

export default FormEmploye
