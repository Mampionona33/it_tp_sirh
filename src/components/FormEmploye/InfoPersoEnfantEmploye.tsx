import React, { useState } from 'react'
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
}

const FormEnfants: React.FC<IFormEnfantsProps> = ({ index }) => {
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

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const defaultGenre = index % 2 === 0 ? 'masculin' : 'feminin'

  return (
    <>
      <div>
        <label htmlFor={`nom_${index}`}>Nom</label>
        <input type="text" name={`nom_${index}`} id={`nom_${index}`} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor={`masculin_${index}`}>Masculin</label>
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

        <label htmlFor={`feminin_${index}`}>Féminin</label>
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

  return (
    <div>
      <div>
        <button className="bg-customRed-900 text-white flex items-center" onClick={addEnfant}>
          <PlusIcon width={20} height={20} /> Ajouter un enfant
        </button>
        {formData.enfants.map((enfant, index) => (
          <FormEnfants key={index} index={index} />
        ))}
      </div>
    </div>
  )
}

export default InfoPersoEnfantEmploye
