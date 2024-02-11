import React from 'react'
import InputWithFloatingLabel from '../Inputs/InputFloatingLabel'
import { CAlert, CCard, CCardBody, CCardFooter, CCardText } from '@coreui/react'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { v4 as uuidV4 } from 'uuid'
import { ICardEnfantEmployeProps } from '@src/interfaces/interfaceCardEnfantEmploye'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import { InputActionMeta, SelectOptionActionMeta, SetValueAction } from 'react-select'
import {
  EnumBoolean,
  EnumCertificatEnfant,
  EnumGenre,
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
import { IInputWithLabelOptionsProps } from './InputWithLable'

interface IFormEmploye {
  id?: string | number
}

const classeInput: string =
  'border-b border-b-customRed-800 focus:border-b-2 focus:outline-none w-full px-1 text-sm'
const classeCardBody: string =
  'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 px-8 w-full'
const classeCardTitle = 'mx-3 mb-0 mt-3 uppercase text-customRed-930 text-base'
const classeCard: string = 'rounded-sm pb-3 px-3'

const CardInfoPersoEmploye: React.FC<ICardInfoPersoEmploye> = ({ data }) => {
  const dispatch = useDispatch()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = event.target
    dispatch(setFormEmploye({ [name]: value }))
  }

  return (
    <CCard className={classeCard}>
      <h2 className={classeCardTitle}>Information personnelles</h2>
      <CCardBody className={classeCardBody}>
        <InputWithFloatingLabel
          label="Nom employé"
          required
          placeholder="Nom"
          name="nom"
          id="nom"
          className={classeInput}
          value={data?.nom}
          onChange={handleInputChange}
        />
        <InputWithFloatingLabel
          label="Prénom employé"
          required
          name="prenom"
          id="prenom"
          placeholder="Prénom employé"
          className={classeInput}
          value={data?.prenom}
          onChange={handleInputChange}
        />
        <InputWithFloatingLabel
          label="Adresse"
          required
          name="adresse"
          id="adresse"
          placeholder="Adresse"
          className={classeInput}
          value={data?.adresse}
          onChange={handleInputChange}
        />
        <InputWithFloatingLabel
          label="Date de naissance"
          type="date"
          required
          name="date_naissance"
          id="date_naissance"
          placeholder="Date de naissance"
          className={classeInput}
          value={data?.date_naissance}
          onChange={handleInputChange}
        />
        <InputWithFloatingLabel
          label="Lieu de naissance"
          required
          name="lieu_naissance"
          id="lieu_naissance"
          placeholder="Lieu de naissance"
          className={classeInput}
          value={data?.lieu_naissance}
          onChange={handleInputChange}
        />
        <InputWithFloatingLabel
          label="N° CIN"
          required
          name="num_cin"
          id="num_cin"
          placeholder="N° CIN: 000 000 000 000"
          className={classeInput}
          value={data?.num_cin}
          onChange={handleInputChange}
        />
        <InputWithFloatingLabel
          label="Date de delivrance CIN"
          type="date"
          required
          name="date_delivrance_cin"
          id="date_delivrance_cin"
          placeholder="Date de delivrance CIN"
          className={classeInput}
          value={data?.date_delivrance_cin}
          onChange={handleInputChange}
        />
        <InputWithFloatingLabel
          label="Nom du père"
          name="nom_pere"
          id="nom_pere"
          placeholder="Nom du père"
          className={classeInput}
          value={data?.nom_pere}
          onChange={handleInputChange}
        />
        <InputWithFloatingLabel
          label="Nom de la mère"
          name="nom_mere"
          id="nom_mere"
          placeholder="Nom de la mère"
          className={classeInput}
          value={data?.nom_mere}
          onChange={handleInputChange}
        />
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

const CardEnfantEmploye: React.FC<ICardEnfantEmployeProps> = ({ index, data }) => {
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

  return (
    <div className="max-w-full border border-slate-300 rounded-sm m-3 relative ">
      <ButtonWithIcon
        className="absolute h-[20px] right-0 top-0"
        onClick={handleDeleteEnf}
        icon={<XMarkIcon width={18} height={18} />}
      ></ButtonWithIcon>
      <div className="grid mx-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 p-3">
        <InputWithFloatingLabel
          label="Nom"
          required
          placeholder="Nom"
          name="nom"
          id={idNom}
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="Prènom"
          required
          placeholder="Prènom"
          name="prenom"
          id={idPrenom}
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="Lieu de naissance"
          required
          placeholder="Lieu de naissance"
          name="lieu_naissance"
          id={idLieuNaissance}
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="Date de naissance"
          type="date"
          required
          name="date_naissance"
          id={idDateNaissance}
          placeholder="Date de naissance"
          className={classeInput}
        />
        <SelectFloatingLable required label="Certificat" id={certificat} placeholder="Certificat" />
        <fieldset id={idGenre} className="border border-solid border-gray-300 p-3">
          <legend className="text-sm">Genre</legend>
          <div className="flex gap-1 flex-col">
            <label htmlFor="genre_masculin" className="flex gap-3 items-center text-sm">
              <input
                type="radio"
                name="genre"
                id="genre_masculin"
                value="MASCULIN"
                className="w-3 h-3 text-sm"
              />
              <span>Masculin</span>
            </label>
            <label htmlFor="genre_feminin" className="flex gap-3 items-center text-sm">
              <input
                type="radio"
                name="genre"
                id="genre_feminin"
                value="FEMININ"
                className="w-3 h-3 text-sm"
              />
              <span>Féminin</span>
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  )
}

const CardInfoProEmploye: React.FC<ICardInfoProEmployeProps> = ({ data }) => {
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
          <InputWithFloatingLabel
            label="Matricule"
            required
            placeholder="Matricule"
            name="matricule"
            value={matricule}
            id="matricule"
            className={classeInput}
            onChange={handleInputChange}
          />
          <InputWithFloatingLabel
            label="Titre du poste"
            required
            placeholder="Titre du poste"
            name="titre_poste"
            id="titre_poste"
            className={classeInput}
            value={titre_poste}
            onChange={handleInputChange}
          />
          <SelectFloatingLable
            label="Catégorie"
            placeholder="Categorie"
            name="categorie"
            required
            value={categorie}
            onChange={(e) => handleSelectChange(e as string, 'select-option')}
            options={categories}
            isLoading={isLoadingCategorieEmploye}
          />
          <InputWithFloatingLabel
            label="Département"
            required
            placeholder="Département"
            name="departement"
            id="departement"
            className={classeInput}
            value={departement}
            onChange={handleInputChange}
          />
          <InputWithFloatingLabel
            label="Date d'embauche"
            type="date"
            required
            placeholder="Département"
            name="date_embauche"
            id="date_embauche"
            className={classeInput}
            value={date_embauche}
            onChange={handleInputChange}
          />
          <InputWithFloatingLabel
            label="Lieu de travail"
            required
            placeholder="Lieu de travail"
            name="lieu_travail"
            id="lieu_travail"
            className={classeInput}
            value={lieu_travail}
            onChange={handleInputChange}
          />
          <InputWithFloatingLabel
            label="Telephone"
            placeholder="Telephone"
            name="telephone"
            id="telephone"
            className={classeInput}
            value={telephone}
            onChange={handleInputChange}
          />
          <InputWithFloatingLabel
            label="Email"
            type="email"
            placeholder="Email: employe@example.com"
            name="email"
            id="email"
            className={classeInput}
            value={email}
            onChange={handleInputChange}
          />
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

const CardInfoPaieEmploye: React.FC = () => {
  return (
    <>
      <CCard className={classeCard}>
        <h2 className={classeCardTitle}>Information de paie</h2>
        <CCardBody className={classeCardBody}>
          <InputWithFloatingLabel
            label="Salaire de base"
            type="number"
            min={0}
            required
            placeholder="Salaire de base"
            name="salaire_de_base"
            id="salaire_de_base"
            className={classeInput}
          />
          <InputWithFloatingLabel
            label="RIB"
            placeholder="RIB: 00000 00000 00000000000 00"
            name="rib"
            id="rib"
            className={classeInput}
          />
          <InputWithFloatingLabel
            label="Numero CNAPS"
            placeholder="Numero CNAPS"
            name="num_cnaps"
            id="num_cnaps"
            className={classeInput}
          />
          <SelectFloatingLable required label="Mode de paiement" placeholder="Mode de paiement" />
        </CCardBody>
      </CCard>
    </>
  )
}

const CardResiliationContrat: React.FC = () => {
  return (
    <form action="">
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
      certificat: EnumCertificatEnfant.AUCUN,
      genre_enfant: EnumGenre.MASCULIN,
      action: 'ajout',
    }
    dispatch(formEmployeAjoutEnfant(nouvelEnfant))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event.target)
  }

  return (
    <div className="flex flex-col gap-3">
      <form action="" method="post" className="flex gap-3 flex-col" onSubmit={handleSubmit}>
        <CardInfoPersoEmploye
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
            {enfant?.map((enfant, index) => (
              <CardEnfantEmploye key={index} index={index} data={enfant} />
            ))}
          </div>
        </CCard>
        <CardInfoProEmploye
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
        <CardInfoPaieEmploye />
        <CCard>
          <FormEmployeGroupButton />
        </CCard>
      </form>
      <CardResiliationContrat />
    </div>
  )
}

export default FormEmploye
