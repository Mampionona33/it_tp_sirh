import React from 'react'
import CustomSection from '@src/components/CustomSection'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'

const Body = () => {
  const dispatch = useAppDispatch()
  const { primeEtGratification } = useAppSelector((store) => store.bulletinDePaie)

  const handleInputChange = (name: string, value: string) => {
    const updatedPrimeEtGratification = {
      ...primeEtGratification,
      [name]: parseFloat(value) || 0,
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
      } as IBulletinDePaieProps),
    )
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }

  return (
    <div className="w-full text-sm flex flex-col gap-4 p-4 ">
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="prime-assiduite"
        name="assiduite"
        label="Prime d’assiduité"
        placeholder="Prime d’assiduité"
        value={primeEtGratification!.assiduite || ''}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        onFocus={handleFocus}
      />
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="prime-excellence"
        name="excellence"
        label="Prime d'excellence"
        placeholder="Prime d'excellence"
        onFocus={handleFocus}
        value={primeEtGratification!.excellence || ''}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
    </div>
  )
}

const CardPrimes = () => {
  return <CustomSection title="Primes et gratification" body={<Body />} />
}

export default CardPrimes
