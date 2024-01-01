import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import React, { useState } from 'react'

const CardPrimes = () => {
  const Body = () => {
    const [state, setState] = useState({
      primeAssiduite: 0,
      primeExcellence: 0,
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
          id="prime-assiduite"
          name="primeAssiduite"
          label="Prime d’assiduité"
          value={state.primeAssiduite}
          onChange={handleInputChange}
        />
        <CustomInputWithLabel
          type="number"
          min={0}
          required
          id="prime-excellence"
          name="primeExcellence"
          label="Prime d'excellence"
          value={state.primeExcellence}
          onChange={handleInputChange}
        />
      </div>
    )
  }

  return <CustomSection title="Primes et gratification" body={<Body />} />
}

export default CardPrimes
