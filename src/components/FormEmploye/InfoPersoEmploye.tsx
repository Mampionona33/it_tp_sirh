import * as React from 'react'
import InputWithLabel, { IInputWithLabelOptionsProps, IInputWithLabelProps } from './InputWithLable'
import { EnumGenre, genreOptions } from '@src/interfaces/interfaceEmploye'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

function InfoPersoEmploye() {
  const dispach = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispach(
      setFormEmploye({
        ...formEmploye,
        [name]: value,
      }),
    )
  }

  const inputs: IInputWithLabelProps[] = [
    {
      id: 'nom_employe',
      label: 'Nom',
      required: true,
      name: 'nom',
      type: 'text',
      value: formEmploye.nom,
      onInput: handleInputChange,
      onChange: handleInputChange,
      placeholder: 'Nom employé',
    },
    {
      id: 'prenom_employe',
      label: 'Prénom',
      required: true,
      name: 'prenom',
      type: 'text',
      value: formEmploye.prenom,
      onInput: handleInputChange,
      onChange: handleInputChange,
      placeholder: 'Prénom employé',
    },
    {
      id: 'adresse_employe',
      label: 'Adresse',
      required: true,
      name: 'adresse',
      type: 'text',
      value: formEmploye.adresse,
      onInput: handleInputChange,
      onChange: handleInputChange,
      placeholder: 'Toamasina ...',
    },
    {
      id: 'date_naissance_employe',
      label: 'Date de naissance',
      required: true,
      name: 'date_naissance',
      type: 'date',
      value: formEmploye.date_naissance,
      onInput: handleInputChange,
      onChange: handleInputChange,
    },
    {
      id: 'lieu_naissance_employe',
      label: 'Lieu de naissance',
      required: true,
      name: 'lieu_naissance',
      type: 'text',
      value: formEmploye.lieu_naissance,
      onInput: handleInputChange,
      onChange: handleInputChange,
      placeholder: 'Toamasina...',
    },
    {
      id: 'num_cin_employe',
      label: 'N° CIN',
      required: true,
      name: 'num_cin',
      type: 'text',
      value: formEmploye.num_cin,
      onInput: handleInputChange,
      onChange: handleInputChange,
      placeholder: '000.000.000.000',
    },
    {
      id: 'genre_employe',
      label: 'Genre',
      dynamiqueId: true,
      required: true,
      name: 'genre',
      type: 'radio',
      options: genreOptions,
      value: formEmploye.genre,
      onInput: handleInputChange,
      onChange: handleInputChange,
    },
  ]

  return (
    <div className="my-3">
      <h1 className="text-lg  text-customRed-930 uppercase m-3"> Informations personnelles</h1>
      <div className="flex bg-customRed-25 mt-2 shadow-sm border-y">
        <div className="grid grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
          {inputs.map((input, index) => (
            <InputWithLabel key={index} {...input} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoPersoEmploye
