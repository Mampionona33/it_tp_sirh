import CustomSection from '@src/components/CustomSection'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'

const Body = () => {
  const dispatch = useAppDispatch()
  const { avance } = useAppSelector((store) => store.bulletinDePaie)

  const handleInputChange = (name: string, value: string) => {
    const updatedAvance = {
      ...avance,
      [name]: parseFloat(value) || 0,
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
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="quinzaine"
        name="quinzaine"
        label="Avances quinzaine"
        placeholder="Avances quinzaine"
        value={(avance.quinzaine || '').toString()}
        onFocus={handleFocus}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="speciale"
        name="speciale"
        label="Avances spéciale"
        placeholder="Avances spéciale"
        value={(avance.speciale || '').toString()}
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
