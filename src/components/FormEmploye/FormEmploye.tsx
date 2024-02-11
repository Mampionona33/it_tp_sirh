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
import { useForm } from 'react-hook-form'
import formEmployeSchema from '@src/schema/formEmployeSchema'
import { zodResolver } from '@hookform/resolvers/zod'

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
            value={data?.nom}
            {...register('nom')}
            onChange={handleInputChange}
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
            value={data?.prenom}
            onChange={handleInputChange}
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
            value={data?.adresse}
            {...register('adresse')}
            onChange={handleInputChange}
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
            value={data?.date_naissance}
            onChange={handleInputChange}
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
            value={data?.lieu_naissance}
            onChange={handleInputChange}
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
            value={data?.num_cin}
            onChange={handleInputChange}
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
            value={data?.date_delivrance_cin}
            onChange={handleInputChange}
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
            value={data?.nom_pere}
            onChange={handleInputChange}
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
            value={data?.nom_mere}
            onChange={handleInputChange}
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
                name="genre"
                id="genre_masculin"
                value={EnumGenre.MASCULIN}
                checked={data?.genre === EnumGenre.MASCULIN}
                className="w-3 h-3 text-sm"
                onChange={handleInputChange}
              />
              <span>Masculin</span>
            </label>
            <label htmlFor="genre_feminin" className="flex gap-3 items-center text-sm">
              <input
                type="radio"
                name="genre"
                id="genre_feminin"
                checked={data?.genre === EnumGenre.FEMININ}
                value={EnumGenre.FEMININ}
                className="w-3 h-3 text-sm"
                onChange={handleInputChange}
              />
              <span>Féminin</span>
            </label>
          </div>
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
}) => {
  const { enfant: listeEnfants } = useAppSelector((state) => state.formEmploye)
  const dispatch = useDispatch()
  const handleDeleteEnf = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(formEmployeSupprimerEnfant(data.id))
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    const updatedEnfants = listeEnfants!.map((enfant: IEnfantEmploye) => {
      if (enfant.id === data.id) {
        if (name.includes('genre_enfant')) {
          return {
            ...enfant,
            genre_enfant: value,
          }
        }
        return {
          ...enfant,
          [name]: value,
        }
      }
      return enfant
    })

    dispatch(setFormEmploye({ enfant: updatedEnfants }))
  }

  const handleSelectChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      const updatedEnfants = listeEnfants!.map((enfant) => {
        if (enfant.id === data.id) {
          return {
            ...enfant,
            categorie: newValue,
          }
        }
        return enfant
      })
      dispatch(setFormEmploye({ enfant: updatedEnfants }))
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
              name="nom"
              // {...register(`enfant[${index}].nom` as string)}
              id={idNom}
              className={classeInput}
              value={data.nom}
              onChange={handleInputChange}
            />
            {/* {formEmployeValidationError.enfant &&
              Array.isArray(formEmployeValidationError.enfant) && (
                <span className="text-red-500 text-sm">
                  {formEmployeValidationError.enfant
                    .filter((error) => error.id === data.id)
                    .map((error, index) => (
                      <span key={index}>{error.message}</span>
                    ))}
                </span>
              )} */}
          </div>

          <div>
            <InputWithFloatingLabel
              label="Prènom"
              required
              placeholder="Prènom"
              name="prenom"
              // {...register(`enfant[${index}].prenom` as any)}
              id={idPrenom}
              className={classeInput}
              value={data.prenom}
              onChange={handleInputChange}
            />
            {/* {formEmployeValidationError.enfant &&
              Array.isArray(formEmployeValidationError.enfant) && (
                <span className="text-red-500 text-sm">
                  {formEmployeValidationError.enfant
                    .filter((error) => error.id === data.id)
                    .map((error, index) => (
                      <span key={index}>{error.message}</span>
                    ))}
                </span>
              )} */}
          </div>

          <InputWithFloatingLabel
            label="Lieu de naissance"
            required
            placeholder="Lieu de naissance"
            name="lieu_naissance"
            id={idLieuNaissance}
            className={classeInput}
            value={data.lieu_naissance}
            onChange={handleInputChange}
          />
          <InputWithFloatingLabel
            label="Date de naissance"
            type="date"
            required
            name="date_naissance"
            id={idDateNaissance}
            placeholder="Date de naissance"
            className={classeInput}
            value={data.date_naissance}
            onChange={handleInputChange}
          />
          <SelectFloatingLable
            label="Certificat"
            placeholder="Certificat"
            id={certificat}
            value={data.certificat}
            options={optionCertificat}
            onChange={(e) => handleSelectChange(e as string, 'select-option')}
          />
          <fieldset id={idGenre} className="border border-solid border-gray-300 p-3">
            <legend className="text-sm">Genre</legend>
            <div className="flex gap-1 flex-col">
              <label htmlFor={idGenreMasculin} className="flex gap-3 items-center text-sm">
                <input
                  type="radio"
                  name={`genre_enfant_${data.id}`}
                  id={idGenreMasculin}
                  className="w-3 h-3 text-sm"
                  value={EnumGenre.MASCULIN}
                  checked={data.genre_enfant === EnumGenre.MASCULIN}
                  onChange={handleInputChange}
                />
                <span>Masculin</span>
              </label>
              <label htmlFor={idGenreFeminin} className="flex gap-3 items-center text-sm">
                <input
                  type="radio"
                  name={`genre_enfant_${data.id}`}
                  id={idGenreFeminin}
                  className="w-3 h-3 text-sm"
                  value={EnumGenre.FEMININ}
                  checked={data.genre_enfant === EnumGenre.FEMININ}
                  onChange={handleInputChange}
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
              // name="matricule"
              {...register('matricule')}
              value={matricule}
              id="matricule"
              className={classeInput}
              onChange={handleInputChange}
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
              // name="titre_poste"
              id="titre_poste"
              {...register('titre_poste')}
              className={classeInput}
              value={titre_poste}
              onChange={handleInputChange}
            />
            {formEmployeValidationError.titre_poste && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.titre_poste.message}
              </span>
            )}
          </div>

          <div>
            <SelectFloatingLable
              label="Catégorie"
              placeholder="Categorie"
              // name="categorie"
              {...register('categorie')}
              required
              value={categorie}
              onChange={(e) => handleSelectChange(e as string, 'select-option')}
              options={categories}
              isLoading={isLoadingCategorieEmploye}
            />
            {formEmployeValidationError.categorie && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.categorie.message}
              </span>
            )}
          </div>

          <div>
            <InputWithFloatingLabel
              label="Département"
              required
              placeholder="Département"
              // name="departement"
              {...register('departement')}
              id="departement"
              className={classeInput}
              value={departement}
              onChange={handleInputChange}
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
              // name="date_embauche"
              {...register('date_embauche')}
              id="date_embauche"
              className={classeInput}
              value={date_embauche}
              onChange={handleInputChange}
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
              // name="lieu_travail"
              {...register('lieu_travail')}
              id="lieu_travail"
              className={classeInput}
              value={lieu_travail}
              onChange={handleInputChange}
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
              // name="telephone"
              {...register('telephone')}
              id="telephone"
              className={classeInput}
              value={telephone}
              onChange={handleInputChange}
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
              // name="email"
              {...register('email')}
              id="email"
              className={classeInput}
              value={email}
              onChange={handleInputChange}
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
                  name="travail_de_nuit"
                  id="travail_de_nuit_oui"
                  className="w-3 h-3 text-sm"
                  value={EnumBoolean.OUI}
                  checked={travail_de_nuit === EnumBoolean.OUI}
                  onChange={handleInputChange}
                />
                <span>Oui</span>
              </label>

              <label htmlFor="travail_de_nuit_non" className="flex gap-3 items-center text-sm">
                <input
                  type="radio"
                  name="travail_de_nuit"
                  id="travail_de_nuit_non"
                  className="w-3 h-3 text-sm text-center"
                  value={EnumBoolean.NON}
                  checked={travail_de_nuit === EnumBoolean.NON}
                  onChange={handleInputChange}
                />
                <span>Non</span>
              </label>
            </div>
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
  const handleSelectChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
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
              // name="salaire_de_base"
              {...register('salaire_de_base')}
              id="salaire_de_base"
              className={classeInput}
              value={data.salaire_de_base}
              onChange={handleInputChange}
              onFocus={handleFocusInputTypeNumber}
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
              // name="rib"
              {...register('rib')}
              id="rib"
              className={classeInput}
              value={data.rib}
              onChange={handleInputChange}
            />
            {formEmployeValidationError.rib && (
              <span className="text-red-500 text-sm">{formEmployeValidationError.rib.message}</span>
            )}
          </div>

          <div>
            <InputWithFloatingLabel
              label="Numero CNAPS"
              placeholder="Numero CNAPS"
              // name="num_cnaps"
              {...register('num_cnaps')}
              id="num_cnaps"
              className={classeInput}
              value={data.num_cnaps}
              onChange={handleInputChange}
            />
            {formEmployeValidationError.num_cnaps && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.num_cnaps.message}
              </span>
            )}
          </div>

          <div>
            <SelectFloatingLable
              required
              label="Mode de paiement"
              placeholder="Mode de paiement"
              // name="mode_paiement"
              options={modeDePaiement}
              value={data.mode_paiement_salaire}
              onChange={(e) => handleSelectChange(e as string, 'select-option')}
              isLoading={isLoadingModeDePaiement}
            />
            {formEmployeValidationError.mode_paiement_salaire && (
              <span className="text-red-500 text-sm">
                {formEmployeValidationError.mode_paiement_salaire.message}
              </span>
            )}
          </div>
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
  const {
    enfant,
    nom,
    prenom,
    date_naissance,
    lieu_naissance,
    num_cin,
    nom_pere,
    nom_mere,
    adresse,
    genre,
    date_delivrance_cin,
    travail_de_nuit,
    matricule,
    date_embauche,
    departement,
    titre_poste,
    categorie,
    lieu_travail,
    telephone,
    email,
    salaire_de_base,
    mode_paiement_salaire,
    rib,
    num_cnaps,
    depart,
  } = useAppSelector((state) => state.formEmploye)
  const dispatch = useDispatch()

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
    dispatch(formEmployeAjoutEnfant(nouvelEnfant))
  }

  const submitForm = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event.target)
  }

  const {
    register,
    handleSubmit,
    formState: { errors: formEmployeValidationError },
    setError,
  } = useForm<IEmploye>({ resolver: zodResolver(formEmployeSchema) })

  return (
    <div className="flex flex-col gap-3">
      <form
        action=""
        method="post"
        className="flex gap-3 flex-col"
        onSubmit={handleSubmit(async () => await submitForm)}
      >
        <CardInfoPersoEmploye
          register={register}
          formEmployeValidationError={formEmployeValidationError}
          data={{
            nom,
            prenom,
            date_naissance,
            lieu_naissance,
            num_cin,
            nom_pere,
            nom_mere,
            adresse,
            genre,
            date_delivrance_cin,
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
            {enfant &&
              enfant.map((enfant, index) => (
                <CardEnfantEmploye
                  key={index}
                  index={index}
                  data={enfant}
                  register={register}
                  formEmployeValidationError={formEmployeValidationError}
                />
              ))}
          </div>
        </CCard>

        <CardInfoProEmploye
          register={register}
          formEmployeValidationError={formEmployeValidationError}
          data={{
            travail_de_nuit,
            matricule,
            date_embauche,
            departement,
            titre_poste,
            categorie,
            lieu_travail,
            telephone,
            email,
          }}
        />
        <CardInfoPaieEmploye
          register={register}
          formEmployeValidationError={formEmployeValidationError}
          data={{ salaire_de_base, mode_paiement_salaire, rib, num_cnaps }}
        />
        <CCard>
          <FormEmployeGroupButton />
        </CCard>
      </form>
      <CardResiliationContrat data={{ depart }} />
    </div>
  )
}

export default FormEmploye
