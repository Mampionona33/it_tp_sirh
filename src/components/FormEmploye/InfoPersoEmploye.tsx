import * as React from 'react'
import InputWithLabel, { IInputWithLabelOptionsProps, IInputWithLabelProps } from './InputWithLable'

function InfoPersoEmploye() {
  const [formData, setFormData] = React.useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    adresse: '',
    lieu_naissance: '',
    cin: '',
    genre: 'homme',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const genreOptions: IInputWithLabelOptionsProps[] = [
    { label: 'Homme', value: 'homme' },
    { label: 'Femme', value: 'Femme' },
  ]

  const inputs: IInputWithLabelProps[] = [
    {
      label: 'Nom',
      required: true,
      name: 'nom',
      type: 'text',
      value: formData.nom,
      onChange: handleInputChange,
      placeholder: 'Nom employé',
    },
    {
      label: 'Prénom',
      required: true,
      name: 'prenom',
      type: 'text',
      value: formData.prenom,
      onChange: handleInputChange,
      placeholder: 'Prénom employé',
    },
    {
      label: 'Adresse',
      required: true,
      name: 'adresse',
      type: 'text',
      value: formData.adresse,
      onChange: handleInputChange,
      placeholder: 'Toamasina ...',
    },
    {
      label: 'Date de naissance',
      required: true,
      name: 'date_naissance',
      type: 'date',
      value: formData.date_naissance,
      onChange: handleInputChange,
    },
    {
      label: 'Lieu de naissance',
      required: true,
      name: 'lieu_naissance',
      type: 'text',
      value: formData.lieu_naissance,
      onChange: handleInputChange,
      placeholder: 'Toamasina...',
    },
    {
      label: 'N° CIN',
      required: true,
      name: 'cin',
      type: 'text',
      value: formData.cin,
      onChange: handleInputChange,
      placeholder: '000.000.000.000',
    },
    {
      label: 'Genre',
      required: true,
      name: 'genre',
      type: 'radio',
      options: genreOptions,
      value: formData.genre,
      onChange: handleInputChange,
    },
  ]

  return (
    <div className="flex bg-customRed-25 mt-2 shadow-sm">
      <div className="grid grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
        {inputs.map((input, index) => (
          <InputWithLabel key={index} {...input} />
        ))}
      </div>
    </div>
  )
}

export default InfoPersoEmploye
