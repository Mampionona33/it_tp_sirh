import React from 'react'
import InputWithLabel, { IInputWithLabelProps } from './InputWithLable'
import { useSelector } from 'react-redux'

const InfoPro = () => {
  const catOptions = useSelector((state: any) => state.cateogieEmploye.data)
  const [formData, setFormData] = React.useState({
    titre_poste: '',
    matricule: '',
    cat: '',
  })
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target ?? { name: '', value: '' }
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
    {
      label: 'Catégorie',
      name: 'cat',
      value: formData.cat,
      type: 'select',
      required: true,
      options: catOptions,
      onChange: handleInputChange,
    },
  ]
  // change
  return (
    <div>
      <h1 className="text-lg text-customRed-930 uppercase m-3">
        Informations professionnelles
      </h1>
      <div className="flex bg-customRed-25 mt-2 shadow-md">
        <div className="grid grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
          {inputs.map((input, index) => (
            <InputWithLabel
              key={index}
              {...input}
              onChange={(event) => handleInputChange(event, index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoPro
