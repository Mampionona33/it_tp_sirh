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

  const [formData, setFormData] = useState<IEnfantEmploye>(
    formEmploye.enfant.find((enfant) => enfant.id === index) || {
      id: index,
      nom: '',
      prenom: '',
      date_naissance: '',
      lieu_naissance: '',
      genre: EnumGenre.MASCULIN,
    },
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    event.preventDefault()
    const { name, value } = event.target
    // Mettre à jour l'état local avec useState
    setFormData({
      ...formData,
      [name]: value,
    })
    // Mette à jour le stat global
    dispatch(
      setFormEmploye({
        ...formEmploye,
        enfant: formEmploye.enfant.map((enf) => {
          if (enf.id === index) {
            return {
              ...enf,
              [name]: value,
            }
          }
          return enf
        }),
      }),
    )
  }

  const inputs: IInputWithLabelProps[] = [
    {
      label: 'Nom',
      required: true,
      name: 'nom',
      type: 'text',
      value: formData.nom || '',
      onChange: (ev) => handleInputChange(ev, index),
      placeholder: "Nom de l'enfant",
    },
  ]

  return (
    <>
      <div className="flex relative bg-customRed-25 mt-2 shadow-sm border-y">
        <ButtonWithIcon
          className="absolute h-[20px] right-0 top-0"
          onClick={(event) => handleClose(event, index)}
          icon={<XMarkIcon width={18} height={18} />}
        ></ButtonWithIcon>
        <div className="grid grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
          {inputs.map((input, index) => (
            <InputWithLabel key={index} index={index} {...input} />
          ))}
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
