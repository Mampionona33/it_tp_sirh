import React, { useState } from 'react'
import InputWithLabel, { IInputWithLabelProps } from './InputWithLable'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

const InformationPaie = () => {
  const dispatch = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)
  const [state, setState] = useState({
    salaire_de_base: 0,
    rib: '',
    mode_payement_salaire: '',
    num_cnaps: '',
    num_osie: '',
  })

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
      id: 'mode_payement_salaire',
      label: 'Mode de payement',
      value: formEmploye.mode_payement_salaire,
      name: 'mode_payement_salaire',
      type: 'text',
      required: true,
      placeholder: 'Virement bancaire...',
    },
    {
      id: 'num_cnaps',
      label: "Numéros d'identification fiscale",
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
    // setState((prevState) => {
    //   return {
    //     ...prevState,
    //     [name]: name === 'cadre' || name === 'travail_de_nuit' ? parseInt(value) : value,
    //   }
    // })
    dispatch(
      setFormEmploye({
        ...formEmploye,
        // [name]: name === 'cadre' || name === 'travail_de_nuit' ? parseInt(value) : value,
        [name]: value,
      }),
    )
  }
  return (
    <>
      <div className="mt-6">
        <h1 className="text-lg border-t text-customRed-930 ml-4 uppercase pt-3 mb-3">
          Information sur la paie
        </h1>
        <div className="flex border-y bg-customRed-25 mt-2 shadow-sm">
          <div className="grid grid-cols-3 gap-x-4 gap-y-0 px-8 py-3 w-full">
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
      </div>
    </>
  )
}

export default InformationPaie
