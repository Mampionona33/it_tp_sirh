import SelectFloatingLable from '@src/components/Inputs/SelectFloatingLable'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import React from 'react'

const PageIrsa = () => {
  const moisOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
    const date = new Date()
    date.setMonth(m)
    const mois = format(date, 'MMMM', { locale: fr })
    return { value: m, label: mois }
  })

  const currentYear = new Date().getFullYear()
  const anneOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
    value: currentYear - index,
    label: (currentYear - index).toString(),
  }))

  return (
    <div className="flex">
      <div className="flex flex-col shadow-sm bg-white rounded-sm">
        <h3 className="bg-customRed-900 text-white text-lg px-4 py-2 capitalize rounded-t-sm">
          Impôt sur les revenus salariaux et assimilés
        </h3>
        <div className="w-full flex px-4 pb-4 pt-2 justify-between gap-2">
          <div className="w-full">
            <SelectFloatingLable
              className="w-full capitalize"
              label="Mois"
              placeholder="Mois"
              options={moisOptions}
            />
          </div>
          <div className="w-full">
            <SelectFloatingLable
              className="w-full capitalize"
              label="Année"
              placeholder="Année"
              options={anneOptions}
            />
          </div>
          <div className="flex full items-end">
            <ButtonWithIcon label="Générer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageIrsa
