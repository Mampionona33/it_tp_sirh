import React from 'react'
import InputWithLabel, { IInputWithLabelProps, IInputWithLabelOptionsProps } from './InputWithLable'
import { useSelector } from 'react-redux'

const InfoPro = () => {
  const catOptions = useSelector((state: any) => state.cateogieEmploye.data)
  const [formData, setFormData] = React.useState({
    titre_poste: '',
    matricule: '',
    cat: '',
    departement: '',
    date_embauche: '',
    lieu_travail: '',
    cadre: 0,
    travail_de_nuit: 0,
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target ?? { name: '', value: '' }
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: name === 'cadre' || name === 'travail_de_nuit' ? parseInt(value) : value,
      }
    })
  }

  const radioOption: IInputWithLabelOptionsProps[] = [
    { label: 'Oui', value: 1 },
    { label: 'Non', value: 0 },
  ]

  const inputs: IInputWithLabelProps[] = [
    {
      label: 'Matricule',
      name: 'matricule',
      value: formData.matricule,
      type: 'text',
      required: true,
      placeholder: 'Matricule',
      onChange: handleInputChange,
    },
    {
      label: 'Titre du poste',
      name: 'titre_poste',
      value: formData.titre_poste,
      type: 'text',
      required: true,
      placeholder: 'Directeur ...',
      onChange: handleInputChange,
    },
    {
      label: 'Catégorie',
      name: 'cat',
      value: formData.cat,
      type: 'select',
      required: true,
      options: catOptions,
      placeholder: 'Catégorie ...',
      onChange: handleInputChange,
    },
    {
      label: 'Département',
      name: 'departement',
      value: formData.departement,
      type: 'text',
      required: true,
      placeholder: 'Sérvice ...',
      onChange: handleInputChange,
    },
    {
      label: "Date d'embauche",
      name: 'date_embauche',
      value: formData.date_embauche,
      type: 'date',
      required: true,
      onChange: handleInputChange,
    },
    {
      label: 'Lieu de travail',
      name: 'lieu_travail',
      value: formData.lieu_travail,
      type: 'text',
      required: true,
      placeholder: 'Toamasina ...',
      onChange: handleInputChange,
    },
    {
      label: 'Est un cadre',
      name: 'cadre',
      value: formData.cadre,
      type: 'radio',
      required: true,
      options: radioOption,
      onChange: (value: any) => handleInputChange(value, 0),
    },
    {
      label: 'Travail de nuit',
      name: 'travail_de_nuit',
      value: formData.travail_de_nuit,
      type: 'radio',
      required: true,
      options: radioOption,
      onChange: (value: any) => handleInputChange(value, 0),
    },
  ]

  return (
    <div>
      <h1 className="text-lg text-customRed-930 uppercase m-3">Informations professionnelles</h1>
      <div className="flex bg-customRed-25 mt-2 shadow-sm">
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
