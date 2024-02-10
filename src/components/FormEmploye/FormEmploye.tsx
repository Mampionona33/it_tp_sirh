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
        <fieldset id={idGenre} className="border border-solid border-gray-300 p-3">
          <legend className="text-sm">Genre</legend>
          <div className="flex gap-1 flex-col">
            <label htmlFor={idGenreMasculin} className="flex gap-3 align-middle text-sm">
              <input
                type="radio"
                name="genre_enfant"
                id={idGenreMasculin}
                value="MASCULIN"
                className="w-3 h-3 text-sm"
              />
              Masculin
            </label>
            <label htmlFor={idGenreFeminin} className="flex gap-3 align-middle text-sm">
              <input
                type="radio"
                name="genre_enfant"
                id={idGenreFeminin}
                value="FEMININ"
                className="w-3 h-3 text-sm"
              />
              Féminin
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
      </CCardBody>
    </CCard>
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

          <div className="flex flex-col gap-3">
            {enfant?.map((enfant, index) => (
              <CardEnfantEmploye key={index} index={index} data={enfant} />
            ))}
          </div>
        </CCard>
      </form>
    </div>
  )
}

export default FormEmploye
