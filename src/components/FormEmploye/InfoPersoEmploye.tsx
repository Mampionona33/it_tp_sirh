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
      id: 'date_delivrance_cin',
      label: 'Date de delivrance CIN',
      name: 'date_delivrance_cin',
      type: 'date',
      required: true,
      value: formEmploye.date_delivrance_cin,
      onChange: handleInputChange,
    },
    {
      id: 'nom_pere',
      label: 'Nom du père',
      name: 'nom_pere',
      type: 'text',
      value: formEmploye.nom_pere,
      onChange: handleInputChange,
    },
    {
      id: 'nom_mere',
      label: 'Nom de la mère',
      name: 'nom_mere',
      type: 'text',
      value: formEmploye.nom_mere,
      onChange: handleInputChange,
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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
          {inputs.map((input, index) => (
            <InputWithLabel key={index} {...input} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoPersoEmploye
