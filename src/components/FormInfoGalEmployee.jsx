import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { employeesCategories, employees } from 'src/db/db'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'

const FormInfoGalEmployee = (props) => {
  const [employee, setEmployee] = useState({
    id: null,
    matricule: null,
    cin: '',
    nom: '',
    prenom: '',
    post: '',
    telephone: '',
    manager: '',
    email: '',
    sexe: 'homme',
    cat: '',
    dateEmbauche: '1990-01-01',
  })

  useEffect(() => {
    let mount = true
    if (props.id && employees) {
      const emp = employees.find((empl) => empl.id === props.id)
      console.log(emp)
      if (emp && mount) {
        setEmployee({
          ...emp,
          nom: emp.name.nom ? emp.name.nom : '',
          prenom: emp.name.prenom ? emp.name.prenom : '',
          dateEmbauche: emp.dateEmbauche ? format(parseISO(emp.dateEmbauche), 'yyyy-MM-dd') : '',
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
      borderColor: state.isFocused ? '#da200d' : '',
      boxShadow: state.isFocused ? '0 0 0 0.25rem #e7b7b4' : null,
      borderRadius: 0,
    }),
    container: (provided) => ({
      ...provided,
      width: '100%',
    }),
    menu: (provided, state) => ({
      ...provided,
      width: '100%',
    }),
  }

  const handleSelectChange = (selectedOption) => {
    setEmployee({ ...employee, cat: selectedOption.value })
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setEmployee({ ...employee, [name]: value })
  }

  return (
    <>
      <div className="columns-lg">
        <form action="" className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              value={employee.name ? employee.nom : ''}
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
              value={employee.name ? employee.prenom : ''}
              onChange={handleChange}
            />
          </div>
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
              value={employee.dateEmbauche}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="relative mb-3 col-span-2 lg:col-span-1">
              <div className="form-group mb-3 clear-left fixed">
                <label className="h6" htmlFor="cat">
                  Catégorie
                </label>
                <Select
                  {...props}
                  menuPlacement="auto"
                  onChange={handleSelectChange}
                  options={employeesCategories}
                  value={employeesCategories.find((cat) => cat.value === employee.cat)}
                  styles={customStyles}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
          <fieldset className="mb-3 col-span-2 lg:col-span-1">
            <legend className="h6">Sexe</legend>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sexe"
                id="sexeHomme"
                value="homme"
                checked={employee.sexe === 'homme'}
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
                checked={employee.sexe === 'femme'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sexeFemme">
                Femme
              </label>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  )
}

FormInfoGalEmployee.propTypes = {
  id: PropTypes.number.isRequired,
}

export default FormInfoGalEmployee
