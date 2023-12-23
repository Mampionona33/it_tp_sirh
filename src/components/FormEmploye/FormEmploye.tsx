import React, { useRef } from 'react'
import MainHeader from './MainHeader'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat'
import employeService from '@src/services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { IEnfantEmploye } from '@src/interfaces/interfaceEmploye'

interface IFormatListEnfant {
  pattern: string
  value: any
  list: IEnfantEmploye[]
}

const formatListEnfant: (pattern: string, value: any, list: any[]) => any[] = (
  pattern,
  value,
  list,
) => {
  if (pattern.includes('_enfant_')) {
    const parts = pattern.split('_')
    const index = parseInt(parts[parts.length - 1], 10)
    const key = pattern.slice(0, pattern.indexOf('_enfant'))
    const formatedValue = key === 'id' ? parseFloat(value) : value
    let enfant = { [key]: formatedValue } as IEnfantEmploye

    // Ajouter l'enfant à la liste si l'index est valide
    if (index < list.length) {
      list[index] = { ...list[index], ...enfant }
    } else {
      // Ajouter l'enfant à la fin de la liste
      list.push(enfant)
    }
  }

  return list
}

const removeEnfantInputsFromData = (pattern, data): void => {
  if (pattern.includes('_enfant_')) {
    // Supprimer l'enfant de employeData
    delete data[pattern]
  }
}

const FormEmploye = () => {
  const navigate = useNavigate()
  const radioValuesRef = useRef<{ [name: string]: string }>({})

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    const formElements = (ev.target as HTMLFormElement).elements

    let employeData: { [key: string]: string | number | boolean | IEnfantEmploye[] } = {}
    const listEnfant = []

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

        employeData['actif'] = 1

        if (element.name.includes('_enfant_')) {
          employeData['enfant'] = formatListEnfant(element.name, element.value, listEnfant)
          removeEnfantInputsFromData(element.name, employeData)
        }
        if (element.type === 'radio' && (element as HTMLInputElement).checked) {
          console.log(element.name, element.value)
          employeData[radioValuesRef.current[element.name]] = element.value
        }
      }
    }

    try {
      console.log(employeData)
      // const createEmploye = await employeService.create(employeData)
      // if (createEmploye.status === 201) {
      //   navigate('/employees/list')
      // }
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
              {/* <PrimeEtAvantageParMois /> */}
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
