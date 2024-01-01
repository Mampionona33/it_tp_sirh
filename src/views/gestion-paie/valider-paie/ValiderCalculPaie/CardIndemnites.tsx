import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import React, { useState } from 'react'

const CardIndemnites = () => {
  const Body = () => {
    const [state, setState] = useState({
      transport: 0,
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
          id="transport"
          name="transport"
          label="Transport"
          value={state.transport}
          onChange={handleInputChange}
        />
      </div>
    )
  }

  return <CustomSection title="Indemnite" body={<Body />} />
}

export default CardIndemnites
