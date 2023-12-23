import React, { useEffect, useState } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import InputWithLabel, { IInputWithLabelProps } from './InputWithLable'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import { EnumGenre, IEnfantEmploye } from '@src/interfaces/interfaceEmploye'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import {
  formEmployeAjoutEnfant,
  formEmployeSupprimerEnfant,
  setFormEmploye,
} from '@src/redux/FormEmploye/formEmployeReducer'

// interface IFormEnfant {
//   nom: string
//   prenom: string
//   date_naissance: string
//   adresse: string
//   lieu_naissance: string
//   cin: string
//   genre: string
// }

interface IFormEnfantsProps {
  index: number
  handleClose: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void
}

const FormEnfants: React.FC<IFormEnfantsProps> = ({ index, handleClose }) => {
  const dispatch = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)

  const [formData, setFormData] = useState<IEnfantEmploye>({
    id: 0,
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    genre: EnumGenre.MASCULIN,
  })

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
  //   event.preventDefault()
  //   const { name, value } = event.target
  //   console.log('handleInputChange', name, value, index)

  //   dispatch(
  //     setFormEmploye({
  //       ...formEmploye,
  //       enfant: formEmploye.enfant.map((enf) => {
  //         if (enf.id === index) {
  //           console.log(enf.id, index)
  //           const preValue = Object.values(enf[name.slice(0, name.indexOf('_enfant'))]).toString()

  //           return {
  //             ...enf,
  //             [name.slice(0, name.indexOf('_enfant'))]:
  //               value !== ',' ? preValue.replace(/,/g, '') + value : preValue + value,
  //           }
  //         }
  //         return enf
  //       }),
  //     }),
  //   )
  // }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    event.preventDefault()
    const { name, value } = event.target
    console.log('handleInputChange', name, value, index)

    // Mettre à jour l'état local avec useState
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    // Mettre à jour l'état global avec Redux
    // dispatch(
    //   setFormEmploye({
    //     ...formEmploye,
    //     enfant: formEmploye.enfant.map((enf) => {
    //       if (enf.id === index) {
    //         return {
    //           ...enf,
    //           [name.slice(0, name.indexOf('_enfant'))]: Object.values(formData[name]),
    //         }
    //       }
    //       return enf
    //     }),
    //   }),
    // )
  }

  // useEffect(() => {
  //   if (index) {
  //     const defaultGenre = index % 2 === 0 ? 'masculin' : 'feminin'
  //   }
  // }, [index])

  return (
    <>
      <div className="relative border-y grid grid-cols-3 gap-x-4 gap-y-2 px-8 py-3 w-full">
        <ButtonWithIcon
          className="absolute h-[20px] right-0 top-0"
          onClick={(event) => handleClose(event, index)}
          icon={<XMarkIcon width={18} height={18} />}
        ></ButtonWithIcon>
        <div style={{ display: 'none' }}>
          <input type="number" name={`id_enfant_${index}`} value={index} readOnly />
        </div>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor={`nom_enfant_${index}`}>
            Nom *
          </label>
          <input
            type="text"
            name={`nom_enfant_${index}`}
            id={`nom_enfant_${index}`}
            value={formEmploye.enfant[index]?.nom || ''}
            onChange={(event) => handleInputChange(event, index)}
            placeholder="Nom de l'enfant"
            required
            className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px] text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor={`prenom_enfant_${index}`}>
            Prénom *
          </label>
          <input
            type="text"
            name={`prenom_enfant_${index}`}
            id={`prenom_enfant_${index}`}
            value={formEmploye.enfant[index]?.prenom || ''}
            onChange={(event) => handleInputChange(event, index)}
            required
            placeholder="Prénom de l'enfant"
            className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px] text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor={`date_naissance_enfant_${index}`}>
            Date de naissance *
          </label>
          <input
            type="date"
            name={`date_naissance_enfant_${index}`}
            id={`date_naissance_enfant_${index}`}
            value={formEmploye.enfant[index]?.date_naissance || ''}
            onChange={(event) => handleInputChange(event, index)}
            required
            className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px] text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor={`lieu_naissance_enfant_${index}`}>
            Lieu de naissance *
          </label>
          <input
            type="text"
            name={`lieu_naissance_enfant_${index}`}
            id={`lieu_naissance_enfant_${index}`}
            value={formEmploye.enfant[index]?.lieu_naissance || ''}
            onChange={(event) => handleInputChange(event, index)}
            required
            placeholder="Toamasina..."
            className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px] text-sm"
          />
        </div>

        <div className="flex shadow-inner p-2">
          <fieldset>
            <legend className="text-sm">Genre</legend>
            <div className="grid grid-cols-2">
              <div className="text-center">
                <input
                  type="radio"
                  name={`genre_enfant_${index}`}
                  id={`masculin_${index}`}
                  value={EnumGenre.MASCULIN}
                  checked={formEmploye.enfant[index]?.genre === EnumGenre.MASCULIN}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <label className="text-sm" htmlFor={`masculin_${index}`}>
                Masculin
              </label>
            </div>

            <div className="grid grid-cols-2">
              <div className="text-center">
                <input
                  type="radio"
                  name={`genre_enfant_${index}`}
                  id={`feminin_${index}`}
                  value={EnumGenre.FEMININ}
                  checked={formEmploye.enfant[index]?.genre === EnumGenre.FEMININ}
                  onChange={(event) => handleInputChange(event, index)}
                />
              </div>
              <label className="text-sm" htmlFor={`feminin_${index}`}>
                Féminin
              </label>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  )
}

/**
 * Renders a component for managing personal information of employed children.
 *
 * @return {ReactElement} The rendered component.
 */
const InfoPersoEnfantEmploye: React.FC = () => {
  const formEmploye = useAppSelector((state) => state.formEmploye)
  const dispatch = useAppDispatch()

  const addEnfant = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const nouvelEnfant: IEnfantEmploye = {
      id: formEmploye.enfant.length + 1,
      nom: '',
      prenom: '',
      date_naissance: '',
      lieu_naissance: '',
      genre: EnumGenre.MASCULIN,
    }

    dispatch(formEmployeAjoutEnfant(nouvelEnfant))
  }

  const handleCloseEnfant = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault()
    dispatch(formEmployeSupprimerEnfant(index))
  }

  return (
    <>
      <div className="flex mt-6 gap-y-2 flex-col">
        <div className="pl-5">
          <ButtonWithIcon
            type="button"
            label="Ajouter un enfant"
            icon={<PlusIcon width={18} height={18} />}
            onClick={addEnfant}
          />
        </div>
        {formEmploye.enfant.map((enfant, index) => (
          <div key={enfant.id} className="flex bg-customRed-25 gap-y-2 mt-2 shadow-md">
            <FormEnfants
              key={index}
              index={enfant.id}
              handleClose={(event, index) => handleCloseEnfant(event, enfant.id)}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default InfoPersoEnfantEmploye
