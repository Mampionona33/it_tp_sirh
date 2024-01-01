import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import React, { useState } from 'react'

const CardAvances = () => {
  const Body = () => {
    const [state, setState] = useState({
      avance: 0,
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
          id="avance"
          name="avance"
          label="Avances"
          value={state.avance}
          onChange={handleInputChange}
        />
      </div>
    )
  }

  return <CustomSection title="Avances" body={<Body />} />
}

export default CardAvances
