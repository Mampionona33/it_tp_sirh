import React from 'react'
import CustomSection from '@src/components/CustomSection'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'

const Body = () => {
  const dispatch = useAppDispatch()
  const { deductions } = useAppSelector((store) => store.bulletinDePaie)
  const handleInputChange = (name: string, value: string) => {
    const updatedDeductions = {
      ...deductions,
      [name]: parseFloat(value) || 0,
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
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="absence"
        name="absence"
        label="Absence"
        placeholder="Absence"
        step={'any'}
        value={deductions!.absence || undefined}
        onFocus={handleFocus}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
      <InputWithFloatingLabel
        type="number"
        min={0}
        id="retard"
        name="retard"
        label="Retard"
        placeholder="Retard"
        step={'any'}
        value={deductions!.retard || undefined}
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
