import React from 'react'
import InputWithLabel, { IInputWithLabelProps, IInputWithLabelOptionsProps } from './InputWithLable'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { EnumTravailDeNuit } from '@src/interfaces/interfaceEmploye'

const InfoPro = () => {
  const dispatch = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)
  const catOptions = useSelector((state: any) => state.cateogieEmploye.data)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target ?? { name: '', value: '' }
    dispatch(
      setFormEmploye({
        ...formEmploye,
        [name]: name === 'cadre' || name === 'travail_de_nuit' ? parseInt(value) : value,
      }),
    )
  }

  const radioOption: IInputWithLabelOptionsProps[] = [
    { label: 'Oui', value: EnumTravailDeNuit.OUI },
    { label: 'Non', value: EnumTravailDeNuit.NON },
  ]

  const inputs: IInputWithLabelProps[] = [
    {
      label: 'Matricule',
      name: 'matricule',
      value: formEmploye.matricule,
      type: 'text',
      required: true,
      placeholder: 'Matricule',
      onChange: handleInputChange,
    },
    {
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
      name: 'cat',
      value: formEmploye.categorie,
      type: 'select',
      required: true,
      options: catOptions,
      placeholder: 'Catégorie ...',
      onChange: handleInputChange,
    },
    {
      label: 'Département',
      name: 'departement',
      value: formEmploye.departement,
      type: 'text',
      required: true,
      placeholder: 'Sérvice ...',
      onChange: handleInputChange,
    },
    {
      label: "Date d'embauche",
      name: 'date_embauche',
      value: formEmploye.date_embauche,
      type: 'date',
      required: true,
      onChange: handleInputChange,
    },
    {
      label: 'Lieu de travail',
      name: 'lieu_travail',
      value: formEmploye.lieu_travail,
      type: 'text',
      required: true,
      placeholder: 'Toamasina ...',
      onChange: handleInputChange,
    },
    {
      label: 'Est un cadre',
      name: 'cadre',
      value: formEmploye.est_cadre,
      type: 'radio',
      required: true,
      options: radioOption,
      onChange: (value: any) => handleInputChange(value, 0),
    },
    {
      label: 'Travail de nuit',
      name: 'travail_de_nuit',
      value: formEmploye.travail_de_nuit,
      type: 'radio',
      required: true,
      options: radioOption,
      onChange: (value: any) => handleInputChange(value, 0),
    },
  ]

  return (
    <div className="border-y my-4">
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
    </div>
  )
}

export default InfoPro
