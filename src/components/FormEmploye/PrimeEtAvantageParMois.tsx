import React, { useState } from 'react'
import ButtonWithIcon from '../ButtonWithIcon'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface PrimeEtAvantageItem {
  id: number
  nature: boolean
  libelle: string
  montant: number
}

const RowTablePrimeEtAvantage: React.FC<{ rowIndex: number }> = ({ rowIndex }) => {
  const [rowState, setRowState] = useState<PrimeEtAvantageItem>({
    id: rowIndex + 1,
    nature: false,
    libelle: '',
    montant: 0,
  })
  const setBackroundColor = () => {
    return rowIndex % 2 === 0 ? 'bg-white' : 'bg-customRed-25'
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setRowState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <tr className={`${setBackroundColor()} my-4 border-b`}>
      <td>
        <div className="flex items-center justify-center">
          <input type="checkbox" name="nature" id="nature" className="border" />
        </div>
      </td>
      <td>
        <div className="pr-2 py-2">
          <input
            type="text"
            name="libelle"
            id="libelle"
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
            id="montant"
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

  const addPrimeEtAvantage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const newPrimeEtAvantageItem: PrimeEtAvantageItem = {
      id: primeEtAvantage.length + 1,
      nature: false,
      libelle: '',
      montant: 0,
    }

    setPrimeEtAvantage([...primeEtAvantage, newPrimeEtAvantageItem])
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
              <RowTablePrimeEtAvantage key={item.id} rowIndex={index} />
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
