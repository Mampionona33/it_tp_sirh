import React, { useState } from 'react'
import InputWithFloatingLabel from '../Inputs/InputFloatingLabel'
import { CCard, CCardBody } from '@coreui/react'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Select from 'react-select'
import { v4 as uuidV4 } from 'uuid'
import { ICardEnfantEmployeProps } from '@src/interfaces/interfaceCardEnfantEmploye'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumCertificatEnfant, EnumGenre, IEnfantEmploye } from '@src/interfaces/interfaceEmploye'
import { useDispatch } from 'react-redux'
import {
  formEmployeAjoutEnfant,
  formEmployeSupprimerEnfant,
} from '@src/redux/FormEmploye/formEmployeReducer'
import { ICardInfoPersoEmploye } from '@src/interfaces/interfaceCardInfoPersoEmploye'
import SelectFloatingLable from '../Inputs/SelectFloatingLable'

interface IFormEmploye {
  id?: string | number
}

const classeInput: string =
  'border-b border-b-customRed-800 focus:border-b-2 focus:outline-none w-full px-1 text-sm'
const classeCardBody: string =
  'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 px-8 w-full'
const classeCardTitle = 'mx-3 mb-0 mt-3 uppercase text-customRed-930 text-base'
const classeCard: string = 'rounded-sm pb-3 px-3'

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
            <label htmlFor={idGenreMasculin} className="flex gap-3 items-middle text-sm">
              <input
                type="radio"
                name="genre_enfant"
                id={idGenreMasculin}
                value="MASCULIN"
                className="w-3 h-3 text-sm"
              />
              <span>Masculin</span>
            </label>
            <label htmlFor={idGenreFeminin} className="flex gap-3 items-middle text-sm">
              <input
                type="radio"
                name="genre_enfant"
                id={idGenreFeminin}
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

const CardInfoPersoEmploye: React.FC<ICardInfoPersoEmploye> = ({ data }) => {
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
        />
        <InputWithFloatingLabel
          label="Prénom employé"
          required
          name="prenom"
          id="prenom"
          placeholder="Prénom employé"
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="Adresse"
          required
          name="adresse"
          id="adresse"
          placeholder="Adresse"
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="Date de naissance"
          type="date"
          required
          name="date_naissance"
          id="date_naissance"
          placeholder="Date de naissance"
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="Lieu de naissance"
          required
          name="lieu_naissance"
          id="lieu_naissance"
          placeholder="Lieu de naissance"
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="N° CIN"
          required
          name="num_cin"
          id="num_cin"
          placeholder="N° CIN: 000 000 000 000"
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="Date de delivrance CIN"
          type="date"
          required
          name="date_delivrance_cin"
          id="date_delivrance_cin"
          placeholder="Date de delivrance CIN"
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="Nom du père"
          name="nom_pere"
          id="nom_pere"
          placeholder="Nom du père"
          className={classeInput}
        />
        <InputWithFloatingLabel
          label="Nom de la mère"
          name="nom_mere"
          id="nom_mere"
          placeholder="Nom de la mère"
          className={classeInput}
        />
        <fieldset id="genre" className="border border-solid border-gray-300 p-3">
          <legend className="text-sm">Genre</legend>
          <div className="flex gap-1 flex-col">
            <label htmlFor="genre_masculin" className="flex gap-3 items-middle text-sm">
              <input
                type="radio"
                name="genre_enfant"
                id="genre_masculin"
                value="MASCULIN"
                className="w-3 h-3 text-sm"
              />
              <span>Masculin</span>
            </label>
            <label htmlFor="genre_feminin" className="flex gap-3 items-middle text-sm">
              <input
                type="radio"
                name="genre_feminin"
                id="genre_feminin"
                value="FEMININ"
                className="w-3 h-3 text-sm"
              />
              <span>Féminin</span>
            </label>
          </div>
        </fieldset>
      </CCardBody>
    </CCard>
  )
}

const CardInfoPro: React.FC = () => {
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
            id="matricule"
            className={classeInput}
          />{' '}
          <InputWithFloatingLabel
            label="Titre du poste"
            required
            placeholder="Titre du poste"
            name="titre_poste"
            id="titre_poste"
            className={classeInput}
          />
          <SelectFloatingLable label="Catégorie" placeholder="Categorie" required />
          <InputWithFloatingLabel
            label="Département"
            required
            placeholder="Département"
            name="departement"
            id="departement"
            className={classeInput}
          />
          <InputWithFloatingLabel
            label="Date d'embauche"
            type="date"
            required
            placeholder="Département"
            name="date_embauche"
            id="date_embauche"
            className={classeInput}
          />
          <InputWithFloatingLabel
            label="Lieu de travail"
            required
            placeholder="Lieu de travail"
            name="lieu_travail"
            id="lieu_travail"
            className={classeInput}
          />
          <InputWithFloatingLabel
            label="Telephone"
            placeholder="Telephone"
            name="telephone"
            id="telephone"
            className={classeInput}
          />
          <InputWithFloatingLabel
            label="Email"
            type="email"
            placeholder="Email: employe@example.com"
            name="email"
            id="email"
            className={classeInput}
          />
          <fieldset id="travail_de_nuit" className="border border-solid border-gray-300 p-3">
            <legend className="text-sm">Travail de nuit</legend>
            <div className="flex gap-1 flex-col">
              <label htmlFor="travail_de_nuit_oui" className="flex items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="travail_de_nuit"
                  id="travail_de_nuit_oui"
                  value="OUI"
                  className="w-3 h-3 text-sm"
                />
                <span>Oui</span>
              </label>

              <label htmlFor="travail_de_nuit_non" className="flex gap-3 items-center text-sm">
                <input
                  type="radio"
                  name="travail_de_nuit"
                  id="travail_de_nuit_non"
                  value="NON"
                  className="w-3 h-3 text-sm text-center"
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
    <div>
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
        <CardInfoPro />
        <CardInfoPaieEmploye />
      </form>
    </div>
  )
}

export default FormEmploye
