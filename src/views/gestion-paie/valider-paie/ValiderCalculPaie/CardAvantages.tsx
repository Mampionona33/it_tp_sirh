import React, { useState } from 'react'
import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'

const Body = () => {
  const dispatch = useAppDispatch()
  const { avantages } = useAppSelector((store) => store.bulletinDePaie)

  const handleInputChange = (name: string, value: string) => {
    const updatedAvantages = {
      ...avantages,
      [name]: parseFloat(value) || 0,
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
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="vehicule"
        name="vehicule"
        label="Véhicules"
        placeholder="Véhicules"
        value={(avantages && avantages.vehicule) || undefined}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        onFocus={handleFocus}
      />
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="logement"
        name="logement"
        label="Logement"
        placeholder="Logement"
        value={(avantages && avantages.logement) || undefined}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        onFocus={handleFocus}
      />
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="domestique"
        name="domestique"
        label="Domestique"
        placeholder="Domestique"
        value={(avantages && avantages.domestique) || undefined}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        onFocus={handleFocus}
      />
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="autresAvantages"
        name="autresAvantages"
        label="Autres"
        placeholder="Autres"
        value={(avantages && avantages.autresAvantages) || undefined}
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
