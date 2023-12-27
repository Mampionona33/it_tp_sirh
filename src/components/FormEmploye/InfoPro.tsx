import React from 'react'
import InputWithLabel, { IInputWithLabelProps, IInputWithLabelOptionsProps } from './InputWithLable'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { EnumBoolean } from '@src/interfaces/interfaceEmploye'

const InfoPro = () => {
  const dispatch = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)
  const catOptions = useSelector((state: any) => state.cateogieEmploye.data)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target ?? { name: '', value: '' }
    dispatch(
      setFormEmploye({
        ...formEmploye,
        [name]: value,
      }),
    )
  }

  const handleCategorieChange = (selectedOption: IInputWithLabelOptionsProps) => {
    dispatch(setFormEmploye({ ...formEmploye, categorie: selectedOption.value }))
  }

  const radioOption: IInputWithLabelOptionsProps[] = [
    { label: 'Oui', value: EnumBoolean.OUI },
    { label: 'Non', value: EnumBoolean.NON },
  ]

  const inputs: IInputWithLabelProps[] = [
    {
      label: 'Matricule',
      id: 'matricule',
      name: 'matricule',
      value: formEmploye.matricule,
      type: 'text',
      required: true,
      placeholder: 'Matricule',
      onChange: handleInputChange,
    },
    {
      id: 'titre_poste',
      label: 'Titre du poste',
      name: 'titre_poste',
      value: formEmploye.titre_poste,
      type: 'text',
      required: true,
      placeholder: 'Directeur ...',
      onChange: handleInputChange,
    },
    {
      label: 'Catégorie',
      name: 'categorie',
      id: 'categorie',
      value: formEmploye.categorie,
      type: 'select',
      required: true,
      options: catOptions,
      placeholder: 'Catégorie ...',
      onSelectChange: handleCategorieChange,
    },
    {
      id: 'departement',
      label: 'Département',
      name: 'departement',
      value: formEmploye.departement,
      type: 'text',
      required: true,
      placeholder: 'Sérvice ...',
      onChange: handleInputChange,
    },
    {
      id: 'date_embauche',
      label: "Date d'embauche",
      name: 'date_embauche',
      value: formEmploye.date_embauche,
      type: 'date',
      required: true,
      onChange: handleInputChange,
    },
    {
      id: 'lieu_travail',
      name: 'lieu_travail',
      required: true,
      label: 'Lieu de travail',
      type: 'text',
      value: formEmploye.lieu_travail,
      placeholder: 'Toamasina...',
      onChange: handleInputChange,
    },
    {
      id: 'telephone',
      label: 'Telephone',
      name: 'telephone',
      value: formEmploye.telephone,
      type: 'text',
      onChange: handleInputChange,
    },
    {
      id: 'email',
      label: 'Email',
      name: 'email',
      autoComplete: 'on',
      value: formEmploye.email,
      type: 'email',
      onChange: handleInputChange,
    },
    {
      id: 'est_cadre',
      dynamiqueId: true,
      label: 'Est cadre',
      name: 'est_cadre',
      value: formEmploye.est_cadre,
      type: 'radio',
      required: true,
      options: radioOption,
      onChange: handleInputChange,
    },
    {
      id: 'travail_de_nuit',
      dynamiqueId: true,
      label: 'Travail de nuit',
      name: 'travail_de_nuit',
      value: formEmploye.travail_de_nuit,
      type: 'radio',
      required: true,
      options: radioOption,
      onChange: handleInputChange,
    },
  ]

  return (
    <>
      <h1 className="text-lg  text-customRed-930 uppercase m-3">Informations professionnelles</h1>
      <div className="flex border-t bg-customRed-25 mt-2 shadow-sm">
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
    </>
  )
}

export default InfoPro
