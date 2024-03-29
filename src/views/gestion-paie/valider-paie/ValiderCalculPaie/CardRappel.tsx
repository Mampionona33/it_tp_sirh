import React from 'react'
import CustomSection from '@src/components/CustomSection'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const Body = () => {
  const dispatch = useAppDispatch()
  const { rappel } = useAppSelector((store) => store.bulletinDePaie)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setBulletinDePaie({ rappel: parseInt(event.target.value) || 0 } as IBulletinDePaieProps),
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
        id="rappel"
        name="rappel"
        label="Rappel"
        value={rappel || 0}
        onFocus={handleFocus}
        onChange={handleInputChange}
      />
    </div>
  )
}

const CardRappel = () => {
  return <CustomSection title="Rappel" body={<Body />} />
}

export default CardRappel
