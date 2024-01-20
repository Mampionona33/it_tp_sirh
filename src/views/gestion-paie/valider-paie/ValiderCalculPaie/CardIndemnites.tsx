import React from 'react'
import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const Body = () => {
  const dispatch = useAppDispatch()
  const { indemnites } = useAppSelector((store) => store.bulletinDePaie)

  const handleInputChange = (name: string, value: string) => {
    const updatedIndemnites = {
      ...indemnites,
      [name]: parseInt(value) || 0,
    }

    const totalIndemnite = Object.values(updatedIndemnites).reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    )

    dispatch(
      setBulletinDePaie({
        ...indemnites,
        indemnites: updatedIndemnites,
        totalIndemnite,
      } as IBulletinDePaieProps),
    )
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }

  return (
    <div className="w-full text-sm flex flex-col gap-4 p-4">
      <CustomInputWithLabel
        type="number"
        min={0}
        required
        id="transport"
        name="transport"
        label="Indemnités"
        value={indemnites.transport}
        onFocus={handleFocus}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
      <CustomInputWithLabel
        type="number"
        min={0}
        required
        id="autresIndemnite"
        name="autresIndemnite"
        label="Autres"
        onFocus={handleFocus}
        value={indemnites.autresIndemnite}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
    </div>
  )
}

const CardIndemnites = () => {
  return <CustomSection title="Indemnités" body={<Body />} />
}

export default CardIndemnites
