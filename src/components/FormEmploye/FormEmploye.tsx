import React from 'react'
import MainHeader from './MainHeader'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import PrimeEtAvantageParMois from './PrimeEtAvantageParMois'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat'

const FormEmploye = () => {
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    console.log(ev.target)
  }

  return (
    <>
      <div>
        <>
          <div className="bg-white flex flex-col py-11">
            <form action="" onSubmit={handleSubmit}>
              <MainHeader />
              <InfoPersoEmploye />
              <InfoPersoEnfantEmploye />
              <InfoPro />
              <InformationPaie />
              <PrimeEtAvantageParMois />
              <FormEmployeGroupButton />
            </form>
            <FormResiliationContrat />
          </div>
        </>
      </div>
    </>
  )
}

export default FormEmploye
