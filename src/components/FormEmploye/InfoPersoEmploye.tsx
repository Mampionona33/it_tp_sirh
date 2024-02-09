import * as React from 'react'
import InputWithLabel, { IInputWithLabelOptionsProps, IInputWithLabelProps } from './InputWithLable'
import { EnumGenre, genreOptions } from '@src/interfaces/interfaceEmploye'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { IInfoPersoEmployeProps } from '@src/interfaces/interfaceInfoPersoEmploye'

function InfoPersoEmploye({ register, formErrors }: IInfoPersoEmployeProps) {
  const dispach = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    console.log(name, value)
    dispach(
      setFormEmploye({
        ...formEmploye,
        [name]: value,
      }),
    )
  }

  if (formErrors) {
    console.log(formErrors)
  }

  const inputs: IInputWithLabelProps[] = [
    {
      id: 'nom_employe',
      label: 'Nom employé',
      required: true,
      name: 'nom',
      type: 'text',
      value: formEmploye.nom,
      onInput: handleInputChange,
      onChange: handleInputChange,
      placeholder: 'Nom employé',
      register: register,
      registerPath: 'nom',
      errorMessage: formErrors?.nom?.message,
    },
    {
      id: 'prenom_employe',
      label: 'Prénom employé',
      required: true,
      name: 'prenom',
      type: 'text',
      value: formEmploye.prenom,
      onInput: handleInputChange,
      onChange: handleInputChange,
      placeholder: 'Prénom employé',
      register: register,
      registerPath: 'prenom',
      errorMessage: formErrors?.prenom?.message,
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
      placeholder: 'Adresse',
      register: register,
      registerPath: 'adresse',
      errorMessage: formErrors?.adresse?.message,
    },
    {
      id: 'date_naissance_employe',
      type: 'date',
      required: true,
      label: 'Date de naissance',
      name: 'date_naissance',
      placeholder: 'Date de naissance',
      value: formEmploye.date_naissance,
      onInput: handleInputChange,
      onChange: handleInputChange,
      register: register,
      registerPath: 'date_naissance',
      errorMessage: formErrors?.date_naissance?.message,
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
      placeholder: 'Lieu de naissance',
      register: register,
      registerPath: 'lieu_naissance',
      errorMessage: formErrors?.lieu_naissance?.message,
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
      placeholder: 'N° CIN: 000 000 000 000',
      register: register,
      registerPath: 'num_cin',
      errorMessage: formErrors?.num_cin?.message,
    },
    {
      id: 'date_delivrance_cin',
      label: 'Date de delivrance CIN',
      name: 'date_delivrance_cin',
      type: 'date',
      required: true,
      value: formEmploye.date_delivrance_cin,
      onInput: handleInputChange,
      onChange: handleInputChange,
      placeholder: 'Date de delivrance CIN',
      register: register,
      registerPath: 'date_delivrance_cin',
      errorMessage: formErrors?.date_delivrance_cin?.message,
    },
    {
      id: 'nom_pere',
      label: 'Nom du père',
      name: 'nom_pere',
      type: 'text',
      placeholder: 'Nom du père',
      value: formEmploye.nom_pere,
      onChange: handleInputChange,
      onInput: handleInputChange,
      register: register,
      registerPath: 'nom_pere',
      errorMessage: formErrors?.nom_pere?.message,
    },
    {
      id: 'nom_mere',
      label: 'Nom de la mère',
      name: 'nom_mere',
      type: 'text',
      placeholder: 'Nom de la mère',
      value: formEmploye.nom_mere,
      onChange: handleInputChange,
      onInput: handleInputChange,
      register: register,
      registerPath: 'nom_mere',
      errorMessage: formErrors?.nom_mere?.message,
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
      register: register,
      registerPath: 'genre',
      errorMessage: formErrors?.genre?.message,
    },
  ]

  return (
    <div className="my-3">
      <div className="flex flex-col border-y border-y-customBlue-200 mt-4 shadow-sm py-4">
        <p className="text-lg text-customRed-930 uppercase mx-8 mb-3">Informations personnelles</p>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0 px-8 w-full">
          {inputs.map((input, index) => (
            <InputWithLabel register={register} key={index} {...input} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoPersoEmploye
