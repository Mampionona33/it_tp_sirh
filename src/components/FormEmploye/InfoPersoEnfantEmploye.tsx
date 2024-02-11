import React, { useEffect, useMemo, useState } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import InputWithLabel, { IInputWithLabelProps } from './InputWithLable'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import {
  EnumCertificatEnfant,
  EnumGenre,
  IEnfantEmploye,
  genreOptions,
} from '@src/interfaces/interfaceEmploye'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import {
  formEmployeAjoutEnfant,
  formEmployeSupprimerEnfant,
  setFormEmploye,
} from '@src/redux/FormEmploye/formEmployeReducer'

interface IFormEnfantsProps {
  index: number
  handleClose: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void
}

const FormEnfants: React.FC<IFormEnfantsProps> = ({ index, handleClose }) => {
  const dispatch = useAppDispatch()
  const { enfant: listEnfant } = useAppSelector((state) => state.formEmploye)
  const enfant = listEnfant
    ? listEnfant.find((enfant: IEnfantEmploye) => enfant.id === index)
    : null

  const idEnfant = listEnfant ? listEnfant.find((enfant) => enfant.id === index)!.id : null

  const initialFormData: IEnfantEmploye = useMemo(() => {
    return {
      id: index,
      nom: '',
      prenom: '',
      date_naissance: '',
      lieu_naissance: '',
      genre_enfant: EnumGenre.MASCULIN,
      certificat: {
        id: index,
        value: EnumCertificatEnfant.AUCUN,
        label: '',
      },
    }
  }, [index])

  const [formData, setFormData] = useState<IEnfantEmploye>(enfant || initialFormData)

  useEffect(() => {
    if (enfant) {
      setFormData(enfant)
    }
  }, [enfant])

  const optionCertificat: { label: string; value: EnumCertificatEnfant }[] = [
    { label: '---', value: EnumCertificatEnfant.AUCUN },
    { label: 'Certificat de vie', value: EnumCertificatEnfant.VIE },
    { label: 'Certificat de scolarité', value: EnumCertificatEnfant.SCOLARITE },
    { label: 'Certificat de médical', value: EnumCertificatEnfant.MEDICAL },
  ]

  const handleCertificatChange = (selectedOption: {
    label: string
    value: EnumCertificatEnfant
  }) => {
    if (listEnfant) {
      dispatch(
        setFormEmploye({
          enfant: listEnfant.map((enf) => ({ ...enf, certificat: selectedOption.value })),
        }),
      )
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target
    // Mettre à jour l'état local avec useState

    if (name === `genre_enfant_${idEnfant}`) {
      setFormData({
        ...formData,
        [name]: value as EnumGenre,
      })
    }
    setFormData({
      ...formData,
      [name]: value,
    })
    // Mette à jour le stat global
    if (listEnfant) {
      dispatch(
        setFormEmploye({
          enfant: listEnfant.map((enf) => {
            if (enf.id === index) {
              if (name === `genre_enfant_${idEnfant}`) {
                return {
                  ...enf,
                  genre_enfant: value as EnumGenre,
                }
              }
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
  }

  const inputs: IInputWithLabelProps[] = [
    {
      id: `nom_enfant_${idEnfant}`,
      label: 'Nom',
      required: true,
      name: 'nom',
      type: 'text',
      value: formData.nom || '',
      onChange: (ev) => handleInputChange(ev, index),
      onInput: (ev) => handleInputChange(ev, index),
      placeholder: "Nom de l'enfant",
    },
    {
      id: `prenom_enfant_${idEnfant}`,
      label: 'Prénom',
      required: true,
      name: 'prenom',
      type: 'text',
      value: formData.prenom || '',
      placeholder: "Prénom de l'enfant",
      onChange: (ev) => handleInputChange(ev, index),
      onInput: (ev) => handleInputChange(ev, index),
    },
    {
      id: `date_naissance_${idEnfant}`,
      label: 'Date de naissance',
      required: true,
      name: 'date_naissance',
      type: 'date',
      value: formData.date_naissance,
      onChange: (ev) => handleInputChange(ev, index),
      onInput: (ev) => handleInputChange(ev, index),
    },
    {
      id: `lieu_naissance_${idEnfant}`,
      label: 'Lieu de naissance',
      required: true,
      name: 'lieu_naissance',
      type: 'text',
      value: formData.lieu_naissance || '',
      onChange: (ev) => handleInputChange(ev, index),
      onInput: (ev) => handleInputChange(ev, index),
      placeholder: 'Toamasina...',
    },
    {
      id: `certificat_${idEnfant}`,
      label: 'Certificat',
      name: `certificat_enfant_${idEnfant}`,
      value: formData.certificat || EnumCertificatEnfant.AUCUN,
      type: 'select',
      placeholder: 'Certificat',
      options: optionCertificat,
      onSelectChange: handleCertificatChange,
    },
    {
      id: `genre_enfant_${idEnfant}`,
      label: 'Genre',
      dynamiqueId: true,
      required: true,
      name: `genre_enfant_${idEnfant}`, // Dynamic property name
      type: 'radio',
      options: genreOptions,
      value: formData[`genre_enfant`] || EnumGenre.MASCULIN, // Dynamic property name
      onChange: (ev) => handleInputChange(ev, index),
    },
  ]

  return (
    <>
      <div className="flex relative w-full">
        <ButtonWithIcon
          className="absolute h-[20px] right-0 top-0"
          onClick={(event) => handleClose(event, index)}
          icon={<XMarkIcon width={18} height={18} />}
        ></ButtonWithIcon>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
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
      id: formEmploye.enfant!.length + 1,
      nom: '',
      prenom: '',
      date_naissance: '',
      lieu_naissance: '',
      genre_enfant: EnumGenre.MASCULIN,
      action: 'ajout',
    }

    dispatch(formEmployeAjoutEnfant(nouvelEnfant))
  }

  const handleCloseEnfant = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault()
    dispatch(formEmployeSupprimerEnfant(index))
  }

  return (
    <>
      <div className="flex mt-6 gap-y-4 flex-col">
        <div className="pl-5">
          <ButtonWithIcon
            type="button"
            label="Ajouter un enfant"
            icon={<PlusIcon width={18} height={18} />}
            onClick={addEnfant}
          />
        </div>
        {formEmploye.enfant!.map((enfant, index) => (
          <div key={index} className="flex border-y border-y-customBlue-200 gap-y-2 my-2 shadow-sm">
            <FormEnfants
              index={Number(enfant.id)}
              handleClose={(event, index) => handleCloseEnfant(event, Number(enfant.id))}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default InfoPersoEnfantEmploye
