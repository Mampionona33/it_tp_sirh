import React from 'react'
import InputWithLabel, { IInputWithLabelProps } from './InputWithLable'

const InfoPro = () => {
  const [formData, setFormData] = React.useState({
    titre_poste: '',
    matricule: '',
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const inputs: IInputWithLabelProps[] = [
    {
      label: 'Matricule',
      name: 'matricule',
      value: formData.matricule,
      type: 'text',
      required: true,
      onChange: handleInputChange,
    },
    {
      label: 'Titre du poste',
      name: 'titre_poste',
      value: formData.titre_poste,
      type: 'text',
      required: true,
      onChange: handleInputChange,
    },
  ]

  return (
    <div>
      <h1 className="text-lg text-customRed-930 uppercase m-3">Informations professionnelles</h1>
      <div className="flex bg-customRed-25 mt-2 shadow-md">
        <div className="grid grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
          {inputs.map((input, index) => (
            <InputWithLabel key={index} {...input} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoPro
