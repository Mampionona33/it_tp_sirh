import React from 'react'
import InputWithLabel, { IInputWithLabelProps } from './InputWithLable'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

const InformationPaie = () => {
  const dispatch = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)

  const inputs: IInputWithLabelProps[] = [
    {
      id: 'salaire_de_base',
      label: 'Salaire de base',
      value: formEmploye.salaire_de_base,
      name: 'salaire_de_base',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      id: 'rib',
      label: 'RIB',
      value: formEmploye.rib,
      name: 'rib',
      type: 'text',
      placeholder: 'RIB',
    },
    {
      id: 'mode_paiement_salaire',
      label: 'Mode de paiement',
      value: formEmploye.mode_paiement_salaire,
      name: 'mode_paiement_salaire',
      type: 'text',
      required: true,
      placeholder: 'Virement bancaire...',
    },
    {
      id: 'num_cnaps',
      label: 'Numéros cnaps',
      value: formEmploye.num_cnaps,
      name: 'num_cnaps',
      type: 'text',
    },
    {
      id: 'num_osie',
      label: 'Numéros OSIE',
      value: formEmploye.num_osie,
      name: 'num_osie',
      type: 'text',
    },
  ]

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target ?? { name: '', value: '' }

    dispatch(
      setFormEmploye({
        ...formEmploye,
        [name]: value,
      }),
    )
  }
  return (
    <>
      <h1 className="text-lg border-t text-customRed-930 ml-4 uppercase pt-3 mb-3">
        Information sur la paie
      </h1>
      <div className="flex border-y bg-customRed-25 mt-2 shadow-sm">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
          {inputs.map((input, index) => (
            <InputWithLabel
              key={index}
              {...input}
              onChange={(event) => handleInputChange(event, index)}
              onInput={(event) => handleInputChange(event, index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default InformationPaie
