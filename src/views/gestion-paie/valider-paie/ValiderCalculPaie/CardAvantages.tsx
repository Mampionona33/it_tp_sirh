import React, { useState } from 'react'
import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const Body = () => {
  const dispatch = useAppDispatch()
  const { avantages } = useAppSelector((store) => store.bulletinDePaie)

  const handleInputChange = (name: string, value: string) => {
    const updatedAvantages = {
      ...avantages,
      [name]: parseInt(value) || 0,
    }
    const totalAvantages = Object.values(updatedAvantages).reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    )
    dispatch(
      setBulletinDePaie({
        ...updatedAvantages,
        avantages: updatedAvantages,
        totalAvantages,
      } as IBulletinDePaieProps),
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
        id="vehicule"
        name="vehicule"
        label="Véhicules"
        value={avantages.vehicule}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        onFocus={handleFocus}
      />
      <CustomInputWithLabel
        type="number"
        min={0}
        required
        id="logement"
        name="logement"
        label="Logement"
        value={avantages.logement}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        onFocus={handleFocus}
      />
      <CustomInputWithLabel
        type="number"
        min={0}
        required
        id="domestique"
        name="domestique"
        label="Domestique"
        value={avantages.domestique}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        onFocus={handleFocus}
      />
      <CustomInputWithLabel
        type="number"
        min={0}
        required
        id="autresAvantages"
        name="autresAvantages"
        label="Autres"
        value={avantages.autresAvantages}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        onFocus={handleFocus}
      />
    </div>
  )
}

const CardAvantages = () => {
  return <CustomSection title="Avantages" body={<Body />} />
}

export default CardAvantages
