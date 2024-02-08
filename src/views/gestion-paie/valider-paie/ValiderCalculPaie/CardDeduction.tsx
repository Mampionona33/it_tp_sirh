import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import React, { useState } from 'react'

const Body = () => {
  const dispatch = useAppDispatch()
  const { deductions } = useAppSelector((store) => store.bulletinDePaie)
  const handleInputChange = (name: string, value: string) => {
    const updatedDeductions = {
      ...deductions,
      [name]: parseInt(value) || 0,
    }
    const totalDeduction = Object.values(updatedDeductions).reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    )
    dispatch(
      setBulletinDePaie({
        ...updatedDeductions,
        deductions: updatedDeductions,
        totalDeduction,
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
        id="absence"
        name="absence"
        label="Absence"
        value={deductions!.absence || 0}
        onFocus={handleFocus}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
      <CustomInputWithLabel
        type="number"
        min={0}
        required
        id="retard"
        name="retard"
        label="Retard"
        value={deductions!.retard || 0}
        onFocus={handleFocus}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
    </div>
  )
}

const CardDeduction = () => {
  return <CustomSection title="Déductions" body={<Body />} />
}

export default CardDeduction
