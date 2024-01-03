import CustomSection from '@src/components/CustomSection'
import React, { useEffect } from 'react'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import CalculPaie from '@src/utils/CalculPaie'

const Body = () => {
  const dispatch = useAppDispatch()
  const { indemnites, salaireNetAPayer, totalIndemnite, salaireDeBase } = useAppSelector(
    (store) => store.bulletinDePaie,
  )

  const handleInputChange = (name: string, value: string) => {
    const updatedIndemnites = {
      ...indemnites,
      [name]: parseInt(value) || 0,
    }

    const totalIndemnite = Object.values(updatedIndemnites).reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    )

    let updatedSalaireNetAPayer

    if (value === '') {
      // Réinitialiser les valeurs ou effectuer d'autres actions si nécessaire
      // Cela peut être ajusté en fonction de vos besoins
      const calculPaie = new CalculPaie(salaireDeBase)
      const totalSalaireNetAPayer = calculPaie.getSalaireNetAPayer()
      updatedSalaireNetAPayer = totalSalaireNetAPayer
    } else {
      updatedSalaireNetAPayer = totalIndemnite + (salaireNetAPayer || 0)
    }

    dispatch(
      setBulletinDePaie({
        ...indemnites,
        indemnites: updatedIndemnites,
        totalIndemnite,
        salaireNetAPayer: updatedSalaireNetAPayer,
      }),
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
        label="Transport"
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
