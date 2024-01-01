import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import React from 'react'

const CardPrimes = () => {
  const Body = () => {
    return (
      <div className="w-full text-sm flex flex-col gap-2">
        <CustomInputWithLabel
          type="number"
          min={0}
          required
          id="prime-assiduite"
          name="prime-assiduite"
          label="Prime d’assiduité"
        />
        <CustomInputWithLabel type="text" id="test" name="test" label="test" />
      </div>
    )
  }
  return <CustomSection title="Primes et gratification" body={<Body />} />
}

export default CardPrimes
