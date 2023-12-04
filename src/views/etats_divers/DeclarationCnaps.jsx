import React, { useState } from 'react'
import CustomSection from '../../components/CustomSection'
import Select from 'react-select'
import { selectCustomStyles } from 'src/scss/selectCustomStyles'
import DnsGenerator from './DnsGenerator'

const DeclarationCnaps = () => {
  const Body = () => {
    const [periode, setPeriode] = useState('t1')
    const [annee, setAnnee] = useState(new Date().getFullYear())

    const periodesOptions = [
      { value: 't1', label: 'Trimestre 1' },
      { value: 't2', label: 'Trimestre 2' },
      { value: 't3', label: 'Trimestre 3' },
    ]

    // Générer la liste d'années de 1900 à l'année actuelle
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
      value: currentYear - index,
      label: (currentYear - index).toString(),
    }))

    const handleInputChange = (selectedOption, actionMeta) => {
      if (actionMeta.name === 'periode') {
        setPeriode(selectedOption.value)
      } else if (actionMeta.name === 'annee') {
        setAnnee(selectedOption.value)
      }
    }

    const handleSubmit = async (ev) => {
      ev.preventDefault()
    }

    return (
      <>
        <form className="w-full flex flex-col gap-2 p-4" onSubmit={handleSubmit}>
          <div className="w-full flex flex-row gap-2 justify-between flex-wrap items-end">
            <div>
              <label className="form-label" htmlFor="periode">
                Période
              </label>
              <Select
                className="basic-multi-select"
                name="periode"
                options={periodesOptions}
                onChange={(selectedOption, actionMeta) =>
                  handleInputChange(selectedOption, actionMeta)
                }
                value={periodesOptions.find((option) => option.value === periode)}
                styles={selectCustomStyles}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="annee">
                Année
              </label>
              <Select
                className="basic-multi-select"
                name="annee"
                options={years}
                onChange={(selectedOption, actionMeta) =>
                  handleInputChange(selectedOption, actionMeta)
                }
                value={years.find((option) => option.value === annee)}
                styles={selectCustomStyles}
              />
            </div>
            <div className="flex">
              <DnsGenerator />
            </div>
          </div>
        </form>
      </>
    )
  }

  return (
    <>
      <CustomSection body={<Body />} title="Déclaration nominative de salaires" />
    </>
  )
}

export default DeclarationCnaps
