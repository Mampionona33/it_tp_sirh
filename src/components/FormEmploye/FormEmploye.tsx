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
  // data,
  register,
  formEmployeValidationError,
  setValue,
  control,
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
        <Controller
          control={control}
          name="nom"
          render={({ field: { onBlur, onChange, value, ref, ...rest } }) => (
            <>
              <InputWithFloatingLabel
                label="Nom employé"
                required
                placeholder="Nom"
                id="nom"
                className={classeInput}
                {...rest}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                // {...register('nom')}
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
            </>
          )}
        />

        <Controller
          control={control}
          name="prenom"
          render={({ field: { onBlur, onChange, value, ref, ...rest }, fieldState: { error } }) => {
            return (
              <div>
                <InputWithFloatingLabel
                  label="Prénom employé"
                  required
                  id="prenom"
                  placeholder="Prénom employé"
                  className={classeInput}
                  {...rest}
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  // {...register('prenom')}
                  // value={data?.prenom}
                  // onChange={handleInputChange}
                />
                {error && <span className="text-sm text-customRed-800">{error.message}</span>}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="adresse"
          render={({ field: { onBlur, onChange, value, ref, ...rest }, fieldState: { error } }) => {
            return (
              <div>
                <InputWithFloatingLabel
                  label="Adresse"
                  required
                  id="adresse"
                  placeholder="Adresse"
                  className={classeInput}
                  {...rest}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  // {...register('adresse')}
                  // value={data?.adresse}
                  // onChange={handleInputChange}
                />
                {error && <span className="text-sm text-customRed-800">{error.message}</span>}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="date_naissance"
          render={({ field: { onBlur, onChange, value, ref, ...rest }, fieldState: { error } }) => {
            return (
              <div>
                <InputWithFloatingLabel
                  label="Date de naissance"
                  type="date"
                  required
                  id="date_naissance"
                  placeholder="Date de naissance"
                  className={classeInput}
                  {...rest}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  // {...register('date_naissance')}
                  // value={data?.date_naissance}
                  // onChange={handleInputChange}
                />
                {error && <span className="text-sm text-customRed-800">{error.message}</span>}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="lieu_naissance"
          render={({ field: { onBlur, onChange, value, ref, ...rest }, fieldState: { error } }) => {
            return (
              <div>
                <InputWithFloatingLabel
                  label="Lieu de naissance"
                  required
                  id="lieu_naissance"
                  placeholder="Lieu de naissance"
                  className={classeInput}
                  {...rest}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  // {...register('lieu_naissance')}
                  // value={data?.lieu_naissance}
                  // onChange={handleInputChange}
                />
                {formEmployeValidationError.lieu_naissance && (
                  <span className="text-sm text-customRed-800">
                    {formEmployeValidationError.lieu_naissance.message}
                  </span>
                )}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="num_cin"
          render={({ field: { onBlur, onChange, value, ref, ...rest }, fieldState: { error } }) => {
            return (
              <div>
                <InputWithFloatingLabel
                  label="N° CIN"
                  required
                  id="num_cin"
                  placeholder="N° CIN: 000 000 000 000"
                  className={classeInput}
                  {...rest}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  // {...register('num_cin')}
                  // value={data?.num_cin}
                  // onChange={handleInputChange}
                />
                {error && <span className="text-sm text-customRed-800">{error.message}</span>}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="date_delivrance_cin"
          render={({ field: { onBlur, onChange, value, ref, ...rest }, fieldState: { error } }) => {
            return (
              <div>
                <InputWithFloatingLabel
                  label="Date de delivrance CIN"
                  type="date"
                  required
                  id="date_delivrance_cin"
                  placeholder="Date de delivrance CIN"
                  className={classeInput}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  // {...register('date_delivrance_cin')}
                  // value={data?.date_delivrance_cin}
                  // onChange={handleInputChange}
                />
                {error && <span className="text-sm text-customRed-800">{error.message}</span>}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="nom_pere"
          render={({ field: { onBlur, onChange, value, ref, ...rest }, fieldState: { error } }) => {
            return (
              <div>
                <InputWithFloatingLabel
                  label="Nom du père"
                  id="nom_pere"
                  placeholder="Nom du père"
                  className={classeInput}
                  {...rest}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  // {...register('nom_pere')}
                  // name="nom_pere"
                  // value={data?.nom_pere}
                  // onChange={handleInputChange}
                />
                {error && <span className="text-sm text-customRed-800">{error.message}</span>}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="nom_mere"
          render={({ field: { onBlur, onChange, value, ref, ...rest }, fieldState: { error } }) => {
            return (
              <div>
                <InputWithFloatingLabel
                  label="Nom de la mère"
                  id="nom_mere"
                  placeholder="Nom de la mère"
                  className={classeInput}
                  {...rest}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  // name="nom_mere"
                  // {...register('nom_mere')}
                  // value={data?.nom_mere}
                  // onChange={handleInputChange}
                />
                {error && <span className="text-sm text-customRed-800">{error.message}</span>}
              </div>
            )
          }}
        />

        <Controller
          control={control}
          name="genre"
          render={({ field: { onBlur, onChange, value, ...rest }, fieldState: { error } }) => {
            return (
              <fieldset id="genre" className="border border-solid border-gray-300 p-3">
                <legend className="text-sm">Genre</legend>
                <div className="flex gap-1 flex-col">
                  <label htmlFor="genre_masculin" className="flex gap-3 items-center text-sm">
                    <input
                      type="radio"
                      value={EnumGenre.MASCULIN}
                      onChange={onChange}
                      checked={value === EnumGenre.MASCULIN}
                      className="w-3 h-3 text-sm"
                    />
                    <span>Masculin</span>
                  </label>
                  <label htmlFor="genre_feminin" className="flex gap-3 items-center text-sm">
                    <input
                      type="radio"
                      value={EnumGenre.FEMININ}
                      onChange={onChange}
                      checked={value === EnumGenre.FEMININ}
                      className="w-3 h-3 text-sm"
                    />
                    <span>Féminin</span>
                  </label>
                </div>
                {error && <span className="text-sm text-customRed-800">{error.message}</span>}
              </fieldset>
            )
          }}
        />
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
          <Controller
            control={control}
            name={`enfant.${index}.nom` as any}
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Nom"
                    required
                    placeholder="Nom"
                    id={idNom}
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // {...register(`enfant.${index}.nom` as any)}
                    // name="nom"
                    // value={value.nom}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name={`enfant.${index}.prenom` as any}
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Prènom"
                    required
                    placeholder="Prènom"
                    id={idPrenom}
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="prenom"
                    // {...register(`enfant.${index}.prenom` as any)}
                    // value={value.prenom}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name={`enfant.${index}.lieu_naissance` as any}
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Lieu de naissance"
                    required
                    placeholder="Lieu de naissance"
                    id={idLieuNaissance}
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // {...register(`enfant.${index}.lieu_naissance` as any)}
                    // name="lieu_naissance"
                    // value={data.lieu_naissance}
                    // onChange={handleInputChange}
                  />
                  {formEmployeValidationError && formEmployeValidationError.enfant && (
                    <span className="text-red-500 text-sm">
                      {formEmployeValidationError.enfant![Number(index)]?.lieu_naissance?.message}
                    </span>
                  )}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name={`enfant.${index}.date_naissance` as any}
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Date de naissance"
                    type="date"
                    required
                    id={idDateNaissance}
                    placeholder="Date de naissance"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="date_naissance"
                    // value={data.date_naissance}
                    // onChange={handleInputChange}
                    // {...register(`enfant.${index}.date_naissance` as any)}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          {/**
           * Utilisation de Controller pour intégrer React-select.
           * Controller permet de gérer les champs de formulaire avec React-hook-form.
           * Cela nous permet de synchroniser facilement les valeurs du formulaire avec les composants externes comme React-select.
           */}
          <Controller
            control={control}
            name={`enfant.${index}.certificat` as any}
            render={({
              field: { onBlur, onChange, value, name, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <SelectFloatingLable
                    label="Certificat"
                    placeholder="Certificat"
                    id={certificat}
                    options={optionCertificat}
                    value={value}
                    {...rest}
                    ref={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    // name="certificat"
                    // onChange={(newValue) => handleChange(newValue)} // Utiliser la fonction handleChange
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
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
          <Controller
            control={control}
            name="matricule"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Matricule"
                    required
                    placeholder="Matricule"
                    id="matricule"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    {...rest}
                    // {...register('matricule')}
                    // name="matricule"
                    // value={matricule}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="titre_poste"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Titre du poste"
                    required
                    placeholder="Titre du poste"
                    id="titre_poste"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // {...register('titre_poste')}
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
              )
            }}
          />

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

          <Controller
            control={control}
            name="departement"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Département"
                    required
                    placeholder="Département"
                    id="departement"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    // {...register('departement')}
                    // name="departement"
                    // value={departement}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="date_embauche"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Date d'embauche"
                    type="date"
                    required
                    placeholder="Date d'embauche"
                    id="date_embauche"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="date_embauche"
                    // value={date_embauche}
                    // {...register('date_embauche')}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="lieu_travail"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Lieu de travail"
                    required
                    placeholder="Lieu de travail"
                    id="lieu_travail"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="lieu_travail"
                    // value={lieu_travail}
                    // {...register('lieu_travail')}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="telephone"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Telephone"
                    placeholder="Telephone"
                    id="telephone"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="telephone"
                    // value={telephone}
                    // {...register('telephone')}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Email"
                    type="email"
                    placeholder="Email: employe@example.com"
                    id="email"
                    className={classeInput}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="email"
                    // value={email}
                    // {...register('email')}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="travail_de_nuit"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <fieldset id="travail_de_nuit" className="border border-solid border-gray-300 p-3">
                <legend className="text-sm">Travail de nuit</legend>
                <div className="flex gap-1 flex-col">
                  <label htmlFor="travail_de_nuit_oui" className="flex items-center gap-3 text-sm">
                    <input
                      type="radio"
                      id="travail_de_nuit_oui"
                      className="w-3 h-3 text-sm"
                      value={EnumBoolean.OUI}
                      onChange={onChange}
                      onBlur={onBlur}
                      checked={value === EnumBoolean.OUI}
                    />
                    <span>Oui</span>
                  </label>

                  <label htmlFor="travail_de_nuit_non" className="flex gap-3 items-center text-sm">
                    <input
                      type="radio"
                      id="travail_de_nuit_non"
                      className="w-3 h-3 text-sm text-center"
                      value={EnumBoolean.NON}
                      onChange={onChange}
                      onBlur={onBlur}
                      checked={value === EnumBoolean.NON}
                    />
                    <span>Non</span>
                  </label>
                </div>
                {error && <span className="text-red-500 text-sm">{error.message}</span>}
              </fieldset>
            )}
          />
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

const CardResiliationContrat: React.FC<ICardResiliationContratProps> = ({
  control,
  handleSubmit,
  register,
  formEmployeValidationError,
}) => {
  const dispatch = useDispatch()
  const handleTexteAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    // dispatch(setFormEmploye({ depart: { ...depart, [name]: value } }))
  }
  const submitForm = (data: IEmploye) => {
    console.log(data)
  }

  return (
    <>
      {/* <form action="" onSubmit={handleSubmit(submitForm)}> */}
      <Controller
        name="depart"
        control={control}
        render={({
          field: { onChange, value, ref, ...rest },
          fieldState: { error, invalid, isDirty, isTouched },
        }) => {
          // console.log(value)

          return (
            <CCard>
              <h2 className={classeCardTitle}>Résiliation du contrat</h2>
              <CCardBody className="p-3 flex flex-col gap-3">
                <CCardText className="text-sm text-customRed-930">
                  Veuillez confirmer la résiliation en saisissant les informations suivantes: nom,
                  matricule de l'employe, ainsi que le motif de la resiliation. Merci de noter que
                  cette action et irréversible. Assurez-vous de suivre le format suivant:
                  <strong>nom matricule</strong>.
                </CCardText>
                <input
                  type="date"
                  // name="date"
                  id="date_resiliation"
                  className="hidden"
                  value={format(new Date(), 'yyyy-MM-dd')}
                  {...register('depart.date')}
                />
                <div className="w-1/3">
                  <label htmlFor="nom_matricule" className="visually-hidden">
                    nom et matricule
                  </label>
                  <div>
                    <input
                      {...rest}
                      type="text"
                      id="nom_matricule"
                      placeholder="Nom matricule"
                      {...register('depart.nom_matricule')}
                      // name="nom_matricule"
                      // value={value!.nom_matricule}
                      required
                      className="border text-sm p-2 h-[28px] w-full outline-customRed-930"
                    />
                    {formEmployeValidationError && (
                      <span className="text-red-500 text-sm">
                        {formEmployeValidationError.depart?.nom_matricule?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <textarea
                    {...rest}
                    // name="motif"
                    id="motif"
                    rows={3}
                    placeholder="Motif de la resiliation du contrat"
                    required
                    className="border outline-customRed-930 text-sm p-1 w-full"
                    {...register('depart.motif')}
                    // name="motif"
                    // value={data.depart?.motif}
                    // onChange={handleTexteAreaChange}
                  ></textarea>
                  {formEmployeValidationError && (
                    <span className="text-red-500 text-sm">
                      {formEmployeValidationError.depart?.motif?.message}
                    </span>
                  )}
                </div>
              </CCardBody>
              <CCardFooter className="flex justify-end">
                <ButtonWithIcon
                  label="Résilier"
                  type="button"
                  name="submit-resiliation"
                  onClick={handleSubmit(submitForm)}
                />
              </CCardFooter>
            </CCard>
          )
        }}
      />
      {/* </form> */}
    </>
  )
}

const FormEmploye: React.FC<IFormEmploye> = ({ id }) => {
  const { data: employe, error, isError, isLoading, refetch, isSuccess } = useFetchSalarie(id)
  const [showResiliationCard, setShowResiliationCard] = React.useState(false)

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

  React.useEffect(() => {
    const subscri = watch((value, { name, type }) => {
      console.log(value, name, type)
    })
    return () => {
      subscri.unsubscribe()
    }
  }, [watch])

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
    if (!showResiliationCard) {
      setValue('depart', undefined)
    }
  }, [showResiliationCard, setValue])

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
        method="POST"
        className="flex gap-3 flex-col"
        onSubmit={handleSubmit(submitForm)}
        // onSubmit={submitForm}
      >
        <input type="text" className="hidden" value={id} {...register('id')} />
        <CardInfoPersoEmploye
          control={controlFormEmploye}
          register={register}
          formEmployeValidationError={formEmployeValidationError}
          setValue={setValue}
          // data={{
          //   nom: employe?.nom || '',
          //   adresse: employe?.adresse || '',
          //   date_delivrance_cin: employe?.date_delivrance_cin || '',
          //   date_naissance: employe?.date_naissance || '',
          //   genre: employe?.genre || EnumGenre.MASCULIN,
          //   lieu_naissance: employe?.lieu_naissance || '',
          //   num_cin: employe?.num_cin || '',
          //   prenom: employe?.prenom || '',
          //   nom_mere: employe?.nom_mere,
          //   nom_pere: employe?.nom_pere,
          // }}
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
          <FormEmployeGroupButton
            resiliationCardOpen={showResiliationCard}
            setShowResiliationCard={setShowResiliationCard}
          />
        </CCard>
      </form>
      {showResiliationCard ? (
        <CardResiliationContrat
          control={controlFormEmploye}
          register={register}
          handleSubmit={handleSubmit}
          formEmployeValidationError={formEmployeValidationError}
        />
      ) : null}
    </div>
  )
}

export default FormEmploye
