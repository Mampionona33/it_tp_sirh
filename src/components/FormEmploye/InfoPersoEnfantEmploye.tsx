import React, { useState } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import InputWithLabel, { IInputWithLabelProps } from './InputWithLable'

const InfoPersoEnfantEmploye: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    genre_enfant: '',
  })

  const [nombreEnfant, setNombreEnfant] = useState(0)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target
    console.log(name, value, index)

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const addEnfant = () => {
    setNombreEnfant((prevNombreEnfant) => prevNombreEnfant + 1)
    // creer l'input radio genre pour chaque enfant
    // par exemple on vas push le inputs
  }

  const removeEnfant = (index: number) => {
    setNombreEnfant((prevNombreEnfant) => prevNombreEnfant - 1)
  }

  const inputs: (IInputWithLabelProps | (() => IInputWithLabelProps))[] = [
    {
      label: 'Nom',
      required: true,
      name: 'nom',
      type: 'text',
      value: formData.nom,
      onChange: (event) => handleInputChange(event, nombreEnfant),
    },
    {
      label: 'Prénom',
      required: true,
      name: 'prenom',
      type: 'text',
      value: formData.prenom,
      onChange: (event) => handleInputChange(event, nombreEnfant),
    },
    {
      label: 'Date de naissance',
      required: true,
      name: 'date_naissance',
      type: 'date',
      value: formData.date_naissance,
      onChange: (event) => handleInputChange(event, nombreEnfant),
    },
    {
      label: 'Lieu de naissance',
      required: true,
      name: 'lieu_naissance',
      type: 'text',
      value: formData.lieu_naissance,
      onChange: (event) => handleInputChange(event, nombreEnfant),
    },
  ]

  return (
    <div className="my-3">
      <div className="flex justify-between ">
        <button
          onClick={addEnfant}
          className="flex mx-3 bg-customRed-900 text-white px-3 py-1 items-center gap-2 shadow-sm hover:shadow-md"
        >
          <PlusIcon width={20} height={20} /> <span>Ajouter enfant</span>
        </button>
      </div>
      {Array.from({ length: nombreEnfant }, (_, index) => (
        <div key={index} className="flex bg-customRed-25 mt-2 relative">
          <button
            onClick={() => removeEnfant(index)}
            className="flex bg-customRed-900 text-white p-1 items-center shadow-sm absolute right-1 top-1 hover:shadow-md"
          >
            <span>
              <XMarkIcon width={20} height={20} />
            </span>
          </button>
          <div className="grid grid-cols-3 gap-x-3 gap-y-0 px-8 py-3 w-full">
            {inputs.map((input, inputIndex) =>
              typeof input === 'function' ? (
                <InputWithLabel
                  key={inputIndex}
                  {...input()}
                  onChange={(event) => handleInputChange(event, index)}
                />
              ) : (
                <InputWithLabel
                  key={inputIndex}
                  {...input}
                  onChange={(event) => handleInputChange(event, inputIndex)}
                />
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default InfoPersoEnfantEmploye
