import React, { useEffect, useState } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import InputWithLabel, { IInputWithLabelProps } from './InputWithLable'

interface IFormEnfant {
  nom: string
  prenom: string
  date_naissance: string
  adresse: string
  lieu_naissance: string
  cin: string
  genre: string
}

interface IFormEnfantsProps {
  index: number
  handleClose: () => void
}

const FormEnfants: React.FC<IFormEnfantsProps> = ({ index, handleClose }) => {
  const [formData, setFormData] = useState<IFormEnfant>({
    nom: '',
    prenom: '',
    date_naissance: '',
    adresse: '',
    lieu_naissance: '',
    cin: '',
    genre: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    console.log('Input changed:', name, value)

    setFormData((prevData) => ({
      ...prevData,
      [`${name}_${index}`]: value,
    }))
  }

  useEffect(() => {
    if (index) {
      const defaultGenre = index % 2 === 0 ? 'masculin' : 'feminin'
    }
  }, [index])

  return (
    <>
      <div className="relative grid grid-cols-3 gap-x-4 gap-y-2 px-8 py-3 w-full">
        <button
          onClick={handleClose}
          className="hover:bg-customRed-930 p-1 absolute right-1 top-1 bg-customRed-900 text-white"
        >
          <XMarkIcon width={20} height={20} />
        </button>

        <div className="flex flex-col">
          <label htmlFor={`nom_${index}`}>Nom *</label>
          <input
            type="text"
            name={`nom_${index}`}
            id={`nom_${index}`}
            value={formData[`nom_${index}`]}
            onChange={handleInputChange}
            required
            className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor={`prenom_${index}`}>Prénom *</label>
          <input
            type="text"
            name={`prenom_${index}`}
            id={`prenom_${index}`}
            value={formData[`prenom_${index}`]}
            onChange={handleInputChange}
            required
            className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor={`date_naissance_${index}`}>Date de naissance *</label>
          <input
            type="date"
            name={`date_naissance_${index}`}
            id={`date_naissance_${index}`}
            value={formData[`date_naissance_${index}`]}
            onChange={handleInputChange}
            required
            className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor={`lieu_naissance_${index}`}>Lieu de naissance *</label>
          <input
            type="text"
            name={`lieu_naissance_${index}`}
            id={`lieu_naissance_${index}`}
            value={formData[`lieu_naissance_${index}`]}
            onChange={handleInputChange}
            required
            className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[28px]"
          />
        </div>

        <div className="flex shadow-inner p-2">
          <fieldset>
            <legend className="text-base">Genre</legend>
            <div className="grid grid-cols-2">
              <div className="text-center">
                <input
                  type="radio"
                  name={`genre_${index}`}
                  id={`masculin_${index}`}
                  value="masculin"
                  checked={formData.genre === 'masculin' || formData.genre === ''}
                  onChange={(event) =>
                    setFormData((prevData) => ({ ...prevData, genre: event.target.value }))
                  }
                />
              </div>
              <label htmlFor={`masculin_${index}`}>Masculin</label>
            </div>

            <div className="grid grid-cols-2">
              <div className="text-center">
                <input
                  type="radio"
                  name={`genre_${index}`}
                  id={`feminin_${index}`}
                  value="feminin"
                  checked={formData.genre === 'feminin'}
                  onChange={(event) =>
                    setFormData((prevData) => ({ ...prevData, genre: event.target.value }))
                  }
                />
              </div>
              <label htmlFor={`feminin_${index}`}>Féminin</label>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  )
}

const InfoPersoEnfantEmploye: React.FC = () => {
  const [nombreEnfant, setNombreEnfant] = useState(0)
  const [formData, setFormData] = useState({
    enfants: Array.from({ length: nombreEnfant }, () => ({
      nom: '',
      prenom: '',
      date_naissance: '',
      lieu_naissance: '',
      genre_enfant: '',
    })),
  })

  const addEnfant = () => {
    setNombreEnfant((prevNombreEnfant) => prevNombreEnfant + 1)
    setFormData((prevData) => ({
      ...prevData,
      enfants: [
        ...prevData.enfants,
        { nom: '', prenom: '', date_naissance: '', lieu_naissance: '', genre_enfant: '' },
      ],
    }))
  }
  const handleCloseEnfant = (index: number) => {
    setFormData((prevData) => {
      console.log(index)
      console.log(prevData)

      const updatedEnfants = [...prevData.enfants]
      updatedEnfants.splice(index, 1)

      return {
        ...prevData,
        enfants: updatedEnfants,
      }
    })
  }

  return (
    <>
      <div className="flex mt-4 flex-col">
        <div className="pl-5">
          <button className="group " onClick={addEnfant}>
            <span className="py-2 px-2.5 group-hover:shadow-lg group-hover:bg-customRed-930  justify-between uppercase bg-customRed-900 text-white flex items-center">
              <PlusIcon width={20} height={20} />
              <span>Ajouter un enfant</span>
            </span>
          </button>
        </div>
        {nombreEnfant > 0 && (
          <>
            {formData.enfants.map((enfant, index) => (
              <div key={index} className="flex bg-customRed-25 gap-y-2 mt-2 shadow-md">
                <FormEnfants
                  key={index}
                  index={index}
                  handleClose={() => handleCloseEnfant(index)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default InfoPersoEnfantEmploye
