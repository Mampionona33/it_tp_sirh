import CustomSection from '@src/components/CustomSection'
import React from 'react'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const Body = () => {
  const dispatch = useAppDispatch()
  const { avance } = useAppSelector((store) => store.bulletinDePaie)

  const handleInputChange = (name: string, value: string) => {
    const updatedAvance = {
      ...avance,
      [name]: parseInt(value) || 0,
    }

    dispatch(
      setBulletinDePaie({
        avance: updatedAvance,
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
        id="quinzaine"
        name="quinzaine"
        label="Avances quinzaine"
        value={avance.quinzaine}
        onFocus={handleFocus}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
      <CustomInputWithLabel
        type="number"
        min={0}
        required
        id="speciale"
        name="speciale"
        label="Avances spéciale"
        value={avance.speciale}
        onFocus={handleFocus}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
    </div>
  )
}

const CardAvances = () => {
  return <CustomSection title="Avances" body={<Body />} />
}

export default CardAvances
