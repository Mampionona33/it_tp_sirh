import CustomSection from '@src/components/CustomSection'
import React, { useState } from 'react'
import CustomInputWithLabel from '@src/components/Inputs/CustomInputWithLabel'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'

const CardIndemnites = () => {
  const Body = () => {
    const { indemnites } = useAppSelector((store) => store.bulletinDePaie)
    const dispatch = useAppDispatch()
    const [state, setState] = useState({
      transport: indemnites.transport || 0,
      autresIndemnite: indemnites.autresIndemnite || 0,
    })

    const handleInputChange = (name: string, value: string) => {
      const updatedIndemnites = {
        ...indemnites,
        [name]: parseInt(value) || 0,
      }

      const totalIndemnites = Object.values(updatedIndemnites).reduce(
        (acc, currentValue) => acc + currentValue,
        0,
      )

      setState({
        ...state,
        [name]: parseInt(value) || 0,
      })

      dispatch(
        setBulletinDePaie({
          ...indemnites,
          indemnites: updatedIndemnites,
          totalIndemnites: totalIndemnites,
        }),
      )
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
          value={state.transport}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />
        <CustomInputWithLabel
          type="number"
          min={0}
          required
          id="autresIndemnite"
          name="autresIndemnite"
          label="Autres"
          value={state.autresIndemnite}
          onChange={(event) => handleInputChange(event.target.name, event.target.value)}
        />
      </div>
    )
  }

  return <CustomSection title="Indemnités" body={<Body />} />
}

export default CardIndemnites
