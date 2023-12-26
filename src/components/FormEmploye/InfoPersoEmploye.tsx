import * as React from 'react'
import InputWithLabel, { IInputWithLabelOptionsProps, IInputWithLabelProps } from './InputWithLable'
import { EnumGenre } from '@src/interfaces/interfaceEmploye'
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

  const genreOptions: IInputWithLabelOptionsProps[] = [
    { label: 'Homme', value: EnumGenre.MASCULIN },
    { label: 'Femme', value: EnumGenre.FEMININ },
  ]

  const inputs: IInputWithLabelProps[] = [
    {
      id: 'nom_employe',
      label: 'Nom',
      required: true,
      name: 'nom',
      type: 'text',
      value: formEmploye.nom,
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
      onChange: handleInputChange,
    },
    {
      id: 'lieu_naissance_employe',
      label: 'Lieu de naissance',
      required: true,
      name: 'lieu_naissance',
      type: 'text',
      value: formEmploye.lieu_naissance,
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
      onChange: handleInputChange,
      placeholder: '000.000.000.000',
    },
    {
      id: 'genre_employe',
      label: 'Genre',
      required: true,
      name: 'genre',
      type: 'radio',
      options: genreOptions,
      value: formEmploye.genre,
      onChange: handleInputChange,
    },
  ]

  return (
    <div className="flex bg-customRed-25 mt-2 shadow-sm border-y">
      <div className="grid grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
        {inputs.map((input, index) => (
          <InputWithLabel key={index} {...input} />
        ))}
      </div>
    </div>
  )
}

export default InfoPersoEmploye
