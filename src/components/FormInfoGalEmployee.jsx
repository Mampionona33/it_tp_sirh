import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { employeesCategories, employees } from 'src/db/db'
import PropTypes from 'prop-types'

const FormInfoGalEmployee = (props) => {
  const [selectedCat, setSelectedCat] = useState(null)
  const [employee, setEmployee] = useState({})
  const [formState, setFormState] = useState({
    nom: '',
    prenom: '',
    sexe: 'homme', // Valeur par défaut
    dateEmbauche: '',
    salaireBase: '',
  })

  useEffect(() => {
    let mount = true
    if (props.id && employees) {
      const emp = employees.find((empl) => empl.id === props.id)
      console.log(emp)
      if (emp && mount) {
        setEmployee(emp)
        setFormState({
          nom: emp.name ? emp.name.nom : '',
          prenom: emp.name ? emp.name.prenom : '',
          sexe: emp.sexe,
          dateEmbauche: emp.dateEmbauche ? emp.dateEmbauche : '',
          salaireBase: emp.salaireBase ? emp.salaireBase : '',
        })
      }
    }
    return () => {
      mount = false
    }
  }, [props.id])

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(50, 31, 219, 0.25)' : null,
    }),
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setFormState({ ...formState, [name]: value })
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
            value={formState.nom}
            onChange={handleChange}
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
            value={formState.prenom}
            onChange={handleChange}
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
              checked={formState.sexe === 'homme'}
              onChange={handleChange}
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
              checked={formState.sexe === 'femme'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="sexeFemme">
              Femme
            </label>
          </div>
        </fieldset>
        <div className="form-group mb-3">
          <label className="h6" htmlFor="dateEmbauche">
            {`Date d'embauche`}
          </label>
          <input
            className="form-control rounded-0"
            type="date"
            name="dateEmbauche"
            id="dateEmbauche"
            placeholder="Date d'embauche"
            value={formState.dateEmbauche}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label className="h6" htmlFor="cat">
            Catégorie
          </label>
          <Select options={employeesCategories} value={selectedCat} styles={customStyles} />
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
            value={formState.salaireBase}
            onChange={handleChange}
          />
        </div>
      </form>
    </>
  )
}

FormInfoGalEmployee.propTypes = {
  id: PropTypes.number,
}

export default FormInfoGalEmployee
