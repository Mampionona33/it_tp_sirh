import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import React, { useState } from 'react'

const CardAvantages = () => {
  const Body = () => {
    const [state, setState] = useState({
      primeAssiduite: 0,
      primeExcellence: 0,
      vehicule: 0,
      logement: 0,
      domestique: 0,
      autresAvantages: 0,
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }))
    }

    return (
      <div className="w-full text-sm flex flex-col gap-4 p-4 ">
        <CustomInputWithLabel
          type="number"
          min={0}
          required
          id="vehicule"
          name="vehicule"
          label="Véhicules"
          value={state.vehicule}
          onChange={handleInputChange}
        />
        <CustomInputWithLabel
          type="number"
          min={0}
          required
          id="logement"
          name="logement"
          label="Logement"
          value={state.logement}
          onChange={handleInputChange}
        />
        <CustomInputWithLabel
          type="number"
          min={0}
          required
          id="domestique"
          name="domestique"
          label="Domestique"
          value={state.domestique}
          onChange={handleInputChange}
        />
        <CustomInputWithLabel
          type="number"
          min={0}
          required
          id="autresAvantages"
          name="autresAvantages"
          label="Autres"
          value={state.autresAvantages}
          onChange={handleInputChange}
        />
      </div>
    )
  }

  return <CustomSection title="Avantages" body={<Body />} />
}

export default CardAvantages
