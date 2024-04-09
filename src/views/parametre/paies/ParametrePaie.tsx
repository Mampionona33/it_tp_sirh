import React from 'react'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'

const ParametrePaie = () => {
  return (
    <div className="classeCard">
      <h1 className="classeCardTitle">Parametres Paie</h1>
      <form action="" className="classeCardBody">
        <div className="flex gap-3">
          <InputWithFloatingLabel
            label="Plafond SME"
            name="plafondSme"
            id="plafondSme"
            placeholder="Plafond SME"
            type="number"
          />
          <InputWithFloatingLabel
            label="Reduction de charge par enfant"
            name="reductionChargeParEnfant"
            id="reductionChargeParEnfant"
            placeholder="Reduction de charge par enfant"
            type="number"
          />
        </div>
      </form>
    </div>
  )
}

export default ParametrePaie
