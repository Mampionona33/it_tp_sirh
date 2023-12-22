import React from 'react'
import MainHeader from './MainHeader'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import PrimeEtAvantageParMois from './PrimeEtAvantageParMois'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat'
import { IEmploye } from '@src/interfaces/interfaceEmploye'
import employeService from '@src/services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const FormEmploye = () => {
  const navigate = useNavigate()
  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    const formElements = (ev.target as HTMLFormElement).elements
    const employeData: { [key: string]: string | number | boolean } = {}

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

      if (element.name !== undefined && element.name !== '') {
        if (
          element.name === 'salaire_de_base' ||
          element.name === 'cadre' ||
          element.name === 'travail_de_nuit'
        ) {
          employeData[element.name] = parseFloat(element.value)
        } else {
          employeData[element.name] = element.value
        }
      }
    }

    console.log(employeData)
    try {
      const createEmploye = await employeService.create(employeData)
      if (createEmploye.status === 201) {
        navigate('/employees/list')
      }
    } catch (error) {
      throw error
    }
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
