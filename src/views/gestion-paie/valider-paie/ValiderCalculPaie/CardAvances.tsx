import CustomSection from '@src/components/CustomSection'
import React from 'react'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const Body = () => {
  const dispatch = useAppDispatch()
  const { avance } = useAppSelector((store) => store.bulletinDePaie)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setBulletinDePaie({ avance: parseInt(event.target.value) || 0 } as IBulletinDePaieProps),
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
        id="avance"
        name="avance"
        label="Avances"
        value={avance}
        onFocus={handleFocus}
        onChange={handleInputChange}
      />
    </div>
  )
}

const CardAvances = () => {
  return <CustomSection title="Avances" body={<Body />} />
}

export default CardAvances
