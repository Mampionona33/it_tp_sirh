import React from 'react'
import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'

const Body = () => {
  const dispatch = useAppDispatch()
  const { primeEtGratification } = useAppSelector((store) => store.bulletinDePaie)

  const handleInputChange = (name: string, value: string) => {
    const updatedPrimeEtGratification = {
      ...primeEtGratification,
      [name]: parseInt(value) || 0,
    }
    const totalPrimeEtGratification = Object.values(updatedPrimeEtGratification).reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    )
    dispatch(
      setBulletinDePaie({
        ...updatedPrimeEtGratification,
        primeEtGratification: updatedPrimeEtGratification,
        totalPrimeEtGratification: totalPrimeEtGratification,
      }),
    )
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }

  return (
    <div className="w-full text-sm flex flex-col gap-4 p-4 ">
      <CustomInputWithLabel
        type="number"
        min={0}
        required
        id="prime-assiduite"
        name="assiduite"
        label="Prime d’assiduité"
        value={primeEtGratification.assiduite}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        onFocus={handleFocus}
      />
      <CustomInputWithLabel
        type="number"
        min={0}
        required
        id="prime-excellence"
        name="excellence"
        label="Prime d'excellence"
        onFocus={handleFocus}
        value={primeEtGratification.excellence}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
    </div>
  )
}

const CardPrimes = () => {
  return <CustomSection title="Primes et gratification" body={<Body />} />
}

export default CardPrimes
