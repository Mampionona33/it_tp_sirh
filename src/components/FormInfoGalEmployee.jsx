import React from 'react'
import Select from 'react-select'

const FormInfoGalEmployee = () => {
  const cat = [
    { value: 'M1', label: 'M1' },
    { value: 'M2', label: 'M2' },
    { value: '1A', label: '1A' },
    { value: '1B', label: '1B' },
    { value: 'OS1', label: 'OS1' },
    { value: 'OS2', label: 'OS2' },
    { value: 'OS3', label: 'OS3' },
    { value: 'OP1', label: 'OP1' },
    { value: '2A', label: '2A' },
    { value: '2B', label: '2B' },
    { value: '3A', label: '3A' },
    { value: '3B', label: '3B' },
    { value: 'A1', label: 'A1' },
    { value: 'A2', label: 'A2' },
    { value: 'A3', label: 'A3' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'B3', label: 'B3' },
    { value: 'B4', label: 'B4' },
    { value: 'C1', label: 'C1' },
    { value: 'C2', label: 'C2' },
    { value: 'C3', label: 'C3' },
    { value: 'D1', label: 'D1' },
    { value: 'D2', label: 'D2' },
    { value: 'D3', label: 'D3' },
  ]
  const [selectedCat, setSelectedCat] = React.useState(null)
  const handleCatChange = (selectedOption) => {
    setSelectedCat(selectedOption)
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#80bdff' : '#ced4da', // Couleur de la bordure en fonction de l'état (focus ou non-focus)
      boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(50, 31, 219, 0.25);' : null, // Ajoute une ombre au focus
    }),
  }

  return (
    <>
      <form action="" className="bg-slate-100 p-2">
        <div className="form-group mb-3">
          <label className="h6" htmlFor="nom">
            Nom
          </label>
          <input
            className="form-control rounded-0"
            placeholder="Nom"
            type="text"
            name="nom"
            id="nom"
          />
        </div>
        <div className="form-group mb-3">
          <label className="h6" htmlFor="prenom">
            Prénom
          </label>
          <input
            className="form-control rounded-0"
            type="text"
            name="prenom"
            id="prenom"
            placeholder="Prénom"
          />
        </div>
        <fieldset className="mb-3">
          <legend className="h6">Sexe</legend>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sexe"
              id="sexeHomme"
              value="homme"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="sexeHomme">
              Homme
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sexe"
              id="sexeFemme"
              value="femme"
            />
            <label className="form-check-label" htmlFor="sexeFemme">
              Femme
            </label>
          </div>
        </fieldset>
        <div className="form-group mb-3">
          <label className="h6" htmlFor="prenom">
            Date d&apos;embauche
          </label>
          <input
            className="form-control rounded-0"
            type="date"
            name="dateEmbauche"
            id="dateEmbauche"
            placeholder="Date d'embauche"
          />
        </div>
        <div className="form-group mb-3">
          <label className="h6" htmlFor="cat">
            Catégorie
          </label>
          <Select
            props
            options={cat}
            value={selectedCat}
            onChange={handleCatChange}
            styles={customStyles}
          />
          {/* <select id="cat" className="form-control" autoComplete="on">
            {cat.map((item, key) => (
              <>
                <option key={key} value={item}>
                  {item}
                </option>
              </>
            ))}
          </select> */}
        </div>
        <div className="form-group mb-3">
          <label className="h6" htmlFor="salaireBase">
            Salaire de base
          </label>
          <input
            className="form-control rounded-0"
            type="number"
            min="0"
            name="salaireBase"
            id="salaireBase"
            placeholder="Salaire de base"
          />
        </div>
      </form>
    </>
  )
}

export default FormInfoGalEmployee
