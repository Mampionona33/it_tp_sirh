import React, { useState } from 'react'
import InputWithLabel, { IInputWithLabelProps } from './InputWithLable'

const InformationPaie = () => {
  const [state, setState] = useState({
    salaire_de_base: 0,
    rib: '',
    mode_payement_salaire: '',
    num_cnaps: '',
    num_osie: '',
  })

  const inputs: IInputWithLabelProps[] = [
    {
      label: 'Salaire de base',
      value: state.salaire_de_base,
      name: 'salaire_de_base',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      label: 'RIB',
      value: state.rib,
      name: 'rib',
      type: 'text',
    },
    {
      label: 'Mode de payement',
      value: state.mode_payement_salaire,
      name: 'mode_payement_salaire',
      type: 'text',
      required: true,
    },
    {
      label: "Numéros d'identification fiscale",
      value: state.num_cnaps,
      name: 'num_cnaps',
      type: 'text',
    },
    {
      label: 'Numéros OSIE',
      value: state.num_osie,
      name: 'num_osie',
      type: 'text',
    },
  ]

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target ?? { name: '', value: '' }
    setState((prevState) => {
      return {
        ...prevState,
        [name]: name === 'cadre' || name === 'travail_de_nuit' ? parseInt(value) : value,
      }
    })
  }
  return (
    <>
      <h1 className="text-lg text-customRed-930 uppercase m-3">Information sur la paie</h1>
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
    </>
  )
}

export default InformationPaie
