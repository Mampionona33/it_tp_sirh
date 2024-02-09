import React, { useState } from 'react'
import InputWithFloatingLabel from '../Inputs/InputFloatingLabel'
import { CCard, CCardBody } from '@coreui/react'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Select from 'react-select'
import { ICardEnfantEmployeProps } from '@src/interfaces/interfaceCardEnfantEmploye'

interface IFormEmploye {
  id?: string | number
}

const classeInput: string =
  'border-b border-b-customRed-800 focus:border-b-2 focus:outline-none w-full px-1 text-sm'
const classeCardBody: string =
  'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 px-8 w-full'
const classeCardTitle = 'mx-3 mb-0 mt-3 uppercase text-customRed-930 text-base'
const classeCard: string = 'rounded-sm pb-3 px-3'

const CardEnfantEmploye: React.FC<ICardEnfantEmployeProps> = ({ index, onDelete }) => {
  const handleDelete = () => {
    onDelete(index)
  }
  return (
    <>
      <div className="max-w-full border border-slate-300 rounded-sm m-3 relative ">
        <ButtonWithIcon
          className="absolute h-[20px] right-0 top-0"
          onClick={handleDelete}
          icon={<XMarkIcon width={18} height={18} />}
        ></ButtonWithIcon>
        <div className="grid mx-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 p-3">
          <InputWithFloatingLabel
            label="Nom"
            required
            placeholder="Nom"
            name="nom"
            id={`nom_enfant_${index}`}
            className={classeInput}
          />
          <InputWithFloatingLabel
            label="Prènom"
            required
            placeholder="Prènom"
            name="prenom"
            id={`prenom_enfant_${index}`}
            className={classeInput}
          />
          <InputWithFloatingLabel
            label="Lieu de naissance"
            required
            placeholder="Lieu de naissance"
            name="lieu_naissance"
            id={`lieu_naissance_${index}`}
            className={classeInput}
          />
          <InputWithFloatingLabel
            label="Date de naissance"
            type="date"
            required
            name="date_naissance"
            id={`date_naissance_${index}`}
            placeholder="Date de naissance"
            className={classeInput}
          />
          <fieldset className="border border-solid border-gray-300 p-3">
            <legend className="text-sm">Genre</legend>
            <div className="flex gap-1 flex-col">
              <label
                htmlFor={`genre_enfant_m_${index}`}
                className="flex gap-3 align-middle text-sm"
              >
                <input
                  type="radio"
                  name="genre_enfant"
                  id={`genre_enfant_m_${index}`}
                  value="MASCULIN"
                  className="w-3 h-3 text-sm"
                />
                Masculin
              </label>
              <label
                htmlFor={`genre_enfant_f_${index}`}
                className="flex gap-3 align-middle text-sm"
              >
                <input
                  type="radio"
                  name="genre_enfant"
                  id={`genre_enfant_f_${index}`}
                  value="FEMININ"
                  className="w-3 h-3 text-sm"
                />
                Féminin
              </label>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  )
}

const FormEmploye: React.FC<IFormEmploye> = ({ id }) => {
  const [enfants, setEnfants] = useState<JSX.Element[]>([])

  const handleDeleteEnfant = (index: number) => {
    const updatedEnfants = enfants.filter((_, i) => i !== index)
    setEnfants(updatedEnfants)
  }

  const addEnfant = () => {
    const newEnfant = (
      <CardEnfantEmploye
        key={enfants.length}
        index={enfants.length}
        onDelete={handleDeleteEnfant}
      />
    )
    setEnfants([...enfants, newEnfant])
  }

  return (
    <div>
      <form action="" method="post" className="flex gap-3 flex-col">
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
          <div className="flex flex-col gap-3">{enfants}</div>
        </CCard>
      </form>
    </div>
  )
}

export default FormEmploye
