import React from 'react'
import MainHeader from './MainHeader'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { resetFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'

const FormEmploye = () => {
  const dispacth = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    try {
      const requestData = {
        ...formEmploye,
        salaire_de_base: parseFloat(String(formEmploye.salaire_de_base)),
      }
      console.log(requestData)
      // dispacth(resetFormEmploye())
      // const createEmploye = await employeService.create(employeData)
      // if (createEmploye.status === 201) {
      //   navigate('/employees/list')
      // }
    } catch (error) {
      throw error
    }
  }

  const handleReset = (ev: React.FormEvent) => {
    ev.preventDefault()
    dispacth(resetFormEmploye())
  }

  return (
    <>
      <div>
        <>
          <div className="bg-white flex flex-col py-11">
            <form action="" onSubmit={handleSubmit} onReset={handleReset}>
              <MainHeader />
              <InfoPersoEmploye />
              <InfoPersoEnfantEmploye />
              <InfoPro />
              <InformationPaie />
              {/* <PrimeEtAvantageParMois /> */}
              <FormEmployeGroupButton />
            </form>
            {formEmploye.id && <FormResiliationContrat />}
          </div>
        </>
      </div>
    </>
  )
}

export default FormEmploye
