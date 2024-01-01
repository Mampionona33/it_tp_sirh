import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import React, { useState } from 'react'

const CardDeduction = () => {
  const Body = () => {
    const [state, setState] = useState({
      absence: 0,
      retard: 0,
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
          id="absence"
          name="absence"
          label="Absence"
          value={state.absence}
          onChange={handleInputChange}
        />
        <CustomInputWithLabel
          type="number"
          min={0}
          required
          id="retard"
          name="retard"
          label="Retard"
          value={state.retard}
          onChange={handleInputChange}
        />
      </div>
    )
  }

  return <CustomSection title="Déductions" body={<Body />} />
}

export default CardDeduction
