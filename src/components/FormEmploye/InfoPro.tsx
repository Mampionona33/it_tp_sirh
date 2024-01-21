import React from 'react'
import InputWithLabel, { IInputWithLabelProps, IInputWithLabelOptionsProps } from './InputWithLable'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { EnumBoolean } from '@src/interfaces/interfaceEmploye'
import { useQuery } from '@tanstack/react-query'
import categorieEmployeService from '@src/services/CategorieEmployeService'
import { ICategorieEmployeState } from '@src/interfaces/intefaceCategorieEmploye'
import { setCategorieEmployeState } from '@src/redux/categorieEmploye/CategorieEmployeReducer'
import Loading from '../loadings/Loading'

const InfoPro = () => {
  const dispatch = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)
  const { data: catOptions } = useAppSelector((store) => store.cateogieEmploye)

  const { isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      categorieEmployeService
        .getAll()
        .then((resp) =>
          dispatch(
            setCategorieEmployeState({
              data: [...resp.data],
              error: null,
              loading: 'succeeded',
            } as ICategorieEmployeState),
          ),
        )
        .catch((error) => {
          dispatch(
            setCategorieEmployeState({
              data: [],
              error: error,
              loading: 'failed',
            } as ICategorieEmployeState),
          )
        }),
  })

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
      placeholder: 'Titre du poste',
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
      placeholder: 'Catégorie',
      onSelectChange: handleCategorieChange,
    },
    {
      id: 'departement',
      label: 'Département',
      name: 'departement',
      value: formEmploye.departement,
      type: 'text',
      required: true,
      placeholder: 'Département',
      onChange: handleInputChange,
    },
    {
      id: 'date_embauche',
      label: "Date d'embauche",
      name: 'date_embauche',
      type: 'date',
      placeholder: "Date d'embauche",
      required: true,
      value: formEmploye.date_embauche,
      onChange: handleInputChange,
    },
    {
      id: 'lieu_travail',
      name: 'lieu_travail',
      required: true,
      label: 'Lieu de travail',
      type: 'text',
      value: formEmploye.lieu_travail,
      placeholder: 'Lieu de travail',
      onChange: handleInputChange,
    },
    {
      id: 'telephone',
      label: 'Telephone',
      name: 'telephone',
      value: formEmploye.telephone,
      type: 'text',
      placeholder: 'Télephone',
      onChange: handleInputChange,
    },
    {
      id: 'email',
      label: 'Email',
      name: 'email',
      autoComplete: 'on',
      value: formEmploye.email,
      type: 'email',
      placeholder: 'Email',
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
      placeholder: 'Travail de nuit',
      options: radioOption,
      onChange: handleInputChange,
    },
  ]

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className="flex flex-col border-y border-y-customBlue-200 mt-4 py-4 shadow-sm">
        <p className="text-lg  text-customRed-930 uppercase mx-8">Informations professionnelles</p>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0 px-8 w-full">
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
