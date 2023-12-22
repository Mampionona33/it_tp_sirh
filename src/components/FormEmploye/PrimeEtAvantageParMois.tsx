import React, { useState, MouseEvent, ChangeEvent } from 'react'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface PrimeEtAvantageItem {
  id: number
  nature: boolean
  libelle: string
  montant: number
}

interface RowTablePrimeEtAvantageProps {
  rowIndex: number
  onInputChange: (index: number, field: string, value: string | number | boolean) => void
  onRemove: (index: number) => void
}

const RowTablePrimeEtAvantage: React.FC<RowTablePrimeEtAvantageProps> = ({
  rowIndex,
  onInputChange,
  onRemove,
}) => {
  const [rowState, setRowState] = useState<PrimeEtAvantageItem>({
    id: rowIndex + 1,
    nature: false,
    libelle: '',
    montant: 0,
  })

  const setBackroundColor = () => {
    return rowIndex % 2 === 0 ? 'bg-white' : 'bg-customRed-25'
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    setRowState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))

    onInputChange(rowIndex, name, type === 'checkbox' ? checked : value)
  }

  const handleClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onRemove(rowIndex)
  }

  return (
    <tr className={`${setBackroundColor()} my-4 border-b`}>
      <td>
        <div className="flex items-center justify-center">
          <input type="checkbox" name="nature" id={`nature-${rowIndex}`} className="border" />
        </div>
      </td>
      <td>
        <div className="pr-2 py-2">
          <input
            type="text"
            name="libelle"
            id={`libelle-${rowIndex}`}
            required
            value={rowState.libelle}
            onChange={handleInputChange}
            className="w-full border border-customRed-50 text-current focus:outline-customRed-100 focus:rounded-none px-2"
          />
        </div>
      </td>
      <td>
        <div className="pr-2 py-2">
          <input
            type="number"
            min={0}
            name="montant"
            id={`montant-${rowIndex}`}
            required
            value={rowState.montant}
            onChange={handleInputChange}
            className="w-full border border-customRed-50 focus:outline-customRed-100 focus:rounded-none px-2"
          />
        </div>
      </td>
      <td className="text-center">
        <ButtonWithIcon
          type="button"
          icon={<TrashIcon width={20} height={20} />}
          onClick={handleClickDelete}
        />
      </td>
    </tr>
  )
}

const TablePrimeEtAvantage: React.FC = () => {
  const [primeEtAvantage, setPrimeEtAvantage] = useState<PrimeEtAvantageItem[]>([])

  const addPrimeEtAvantage = () => {
    const newPrimeEtAvantageItem: PrimeEtAvantageItem = {
      id: primeEtAvantage.length + 1,
      nature: false,
      libelle: '',
      montant: 0,
    }

    setPrimeEtAvantage([...primeEtAvantage, newPrimeEtAvantageItem])
  }

  const removePrimeEtAvantage = (index: number) => {
    const updatedPrimeEtAvantage = [...primeEtAvantage]
    updatedPrimeEtAvantage.splice(index, 1)
    setPrimeEtAvantage(updatedPrimeEtAvantage)
  }

  const handleInputChange = (index: number, field: string, value: string | number | boolean) => {
    const updatedPrimeEtAvantage = primeEtAvantage.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    )

    setPrimeEtAvantage(updatedPrimeEtAvantage)
  }

  return (
    <>
      <div className="ml-4 mb-4">
        <ButtonWithIcon
          type="button"
          label="Ajouter Prime et avantage (mois)"
          icon={<PlusIcon width={20} height={20} />}
          onClick={addPrimeEtAvantage}
        />
      </div>
      {primeEtAvantage.length === 0 ? (
        <div className="bg-customRed-25 my-4 p-3">
          {`Aucune prime ou avantage n'a encore été ajouté`}
        </div>
      ) : (
        <table className="table-auto w-full bg-customRed-200 py-3">
          <thead>
            <tr className="text-white py-2">
              <th className="text-center">Nature</th>
              <th>Libellé</th>
              <th>Montant</th>
              <th className="text-center">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {primeEtAvantage.map((item, index) => (
              <RowTablePrimeEtAvantage
                key={item.id}
                rowIndex={index}
                onInputChange={handleInputChange}
                onRemove={removePrimeEtAvantage}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

const PrimeEtAvantageParMois: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-y-3 mt-4">
        <div>
          <TablePrimeEtAvantage />
        </div>
      </div>
    </>
  )
}

export default PrimeEtAvantageParMois
