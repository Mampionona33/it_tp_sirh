import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { employeesCategories } from 'src/db/db'
import { format, parseISO } from 'date-fns'
import { useSelector } from 'react-redux'
import Loading from './Loading'

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
  const loadList = useSelector((state) => state.employeesList.loading)
  const salarie = useSelector((state) => state.bulletinDePaie.salarie)

  useEffect(() => {
    let mount = true
    if (mount && salarie) {
      setEmployee(salarie)
    }
    return () => {
      mount = false
    }
  }, [salarie])

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
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#da200d' : 'inherit',
      ':hover': {
        backgroundColor: '#e7b7b4',
      },
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
      {loadList === 'loading' ? <Loading /> : null}
      <div className="container">
        <form className="row g-3">
          <div className="col-12 col-lg-6">
            <label className="form-label" htmlFor="nom">
              Nom
            </label>
            <input
              className="form-control"
              type="text"
              name="nom"
              id="nom"
              placeholder="Nom"
              value={employee.nom ? employee.nom : ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <label className="form-label" htmlFor="prenom">
              Prénom
            </label>
            <input
              className="form-control"
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Prénom"
              value={employee.prenom ? employee.prenom : ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <label className="form-label" htmlFor="dateEmbauche">
              {`Date d'embauche`}
            </label>
            <input
              className="form-control"
              type="date"
              name="dateEmbauche"
              id="dateEmbauche"
              placeholder="Date d'embauche"
              value={
                employee.dateEmbauche ? format(new Date(employee.dateEmbauche), 'yyyy-MM-dd') : ''
              }
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <label className="form-label" htmlFor="matricule">
              Matricule
            </label>
            <input
              className="form-control"
              type="text"
              name="matricule"
              id="matricule"
              placeholder="A01200"
              value={employee.matricule ? employee.matricule : ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <label className="form-label" htmlFor="matricule">
              Poste
            </label>
            <input
              className="form-control"
              type="text"
              name="post"
              id="poste"
              placeholder="Directeur"
              value={employee.poste ? employee.poste : ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <label className="form-label" htmlFor="cat">
              Catégorie
            </label>
            <Select
              {...props}
              menuPlacement="auto"
              onChange={handleSelectChange}
              options={employeesCategories}
              value={employeesCategories.find((cat) => cat.value === employee.cat)}
              styles={customStyles}
            />
          </div>
          <div className="col-12 col-lg-6">
            <fieldset className="form-group">
              <legend className="form-label text-base">Sexe</legend>
              <div className="form-check">
                <input
                  className="form-check-input checked:bg-customRed-900 checked:border-customRed-900 focus:ring-[0.25rem] focus:ring-[#e7b7b4]"
                  type="radio"
                  name="sexe"
                  id="sexeHomme"
                  value="homme"
                  checked={employee.sexe.match(/homme/gi)}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="sexeHomme">
                  Homme
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input checked:bg-customRed-900 checked:border-customRed-900 focus:ring-[0.25rem] focus:ring-[#e7b7b4]"
                  type="radio"
                  name="sexe"
                  id="sexeFemme"
                  value="femme"
                  checked={employee.sexe.match(/femme/gi)}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="sexeFemme">
                  Femme
                </label>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormInfoGalEmployee
