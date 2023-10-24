import React from 'react'
import Select from 'react-select'
import { employeesCategories } from 'src/db/db'

const FormInfoGalEmployee = () => {
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
            options={employeesCategories}
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
