import React from 'react'
import CustomSection from '@src/components/CustomSection'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'

const Body: React.FC = () => {
  const dispatch = useAppDispatch()
  const { indemnites } = useAppSelector((store) => store.bulletinDePaie)

  const handleInputChange = (name: string, value: string) => {
    const parsedValue = parseFloat(value)
    const updatedIndemnites = {
      ...indemnites,
      [name]: isNaN(parsedValue) ? 0 : parsedValue,
    }

    const totalIndemnite: number = Object.values(updatedIndemnites).reduce(
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
      <InputWithFloatingLabel
        label="Indemnité"
        type="number"
        id="transport"
        name="transport"
        placeholder="Indemnité"
        step={'any'}
        onFocus={handleFocus}
        value={indemnites?.transport || undefined}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
      <InputWithFloatingLabel
        label="Autres"
        type="number"
        id="autresIndemnite"
        name="autresIndemnite"
        placeholder="Autres"
        step={'any'}
        onFocus={handleFocus}
        value={indemnites?.autresIndemnite || undefined}
        onChange={(event) => handleInputChange(event.target.name, event.target.value)}
      />
    </div>
  )
}

const CardIndemnites: React.FC = () => {
  return <CustomSection title="Indemnités" body={<Body />} />
}

export default CardIndemnites
