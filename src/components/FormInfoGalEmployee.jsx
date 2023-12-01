import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { employeesCategories } from 'src/db/db'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import PropTypes from 'prop-types'

const FormInfoGalEmployee = (props) => {
  const [employee, setEmployee] = useState({
    id: null,
    matricule: '',
    cin: '',
    nom: '',
    prenom: '',
    poste: '',
    telephone: '',
    manager: '',
    adresse: '',
    email: '',
    numCnaps: '',
    sexe: 'homme',
    cadre: false,
    cat: '',
    dateEmbauche: null,
  })
  const loadList = useSelector((state) => state.employeesList.loading)
  const salarie = useSelector((state) => state.bulletinDePaie.salarie)

  useEffect(() => {
    let mount = true
    if (mount && JSON.stringify(salarie) !== '{}') {
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

  const ModalInputText = ({ label, name, id, placeholder, value, onChange }) => {
    return (
      <div className="col-12 col-lg-6">
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
        <input
          className="form-control"
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
        />
      </div>
    )
  }

  ModalInputText.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  return (
    <>
      {loadList === 'loading' ? <Loading /> : null}
      <div className="container">
        <div className="row g-3">
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
              value={employee.nom || ''}
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
              value={employee.prenom || ''}
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
                format(
                  new Date(employee.dateEmbauche ? employee.dateEmbauche : Date.now()),
                  'yyyy-MM-dd',
                ) || ''
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
              value={employee.matricule || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <label className="form-label capitalize" htmlFor="numCnaps">
              N° de sécurité sociale
            </label>
            <input
              className="form-control"
              type="text"
              name="numCnaps"
              id="numCnaps"
              placeholder="A01200"
              value={employee.numCnaps || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <label className="form-label capitalize" htmlFor="adresse">
              adresse
            </label>
            <input
              className="form-control"
              type="text"
              name="adresse"
              id="adresse"
              placeholder="Toamasina"
              value={employee.adresse || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <label className="form-label capitalize" htmlFor="cin">
              cin
            </label>
            <input
              className="form-control"
              type="text"
              name="cin"
              id="cin"
              placeholder="000.000.000.000"
              value={employee.cin || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-lg-6">
            <label className="form-label capitalize" htmlFor="poste">
              fonction
            </label>
            <input
              className="form-control"
              type="text"
              name="poste"
              id="poste"
              placeholder="Directeur"
              value={employee.poste || ''}
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
              value={employeesCategories.find((cat) => cat.value === employee.cat) || ''}
              styles={customStyles}
            />
          </div>
          <div className="col-12 col-lg-6">
            <fieldset className="form-group">
              <legend className="form-label text-base">Genre</legend>

              <div className="form-check">
                <input
                  className="form-check-input checked:bg-customRed-900 checked:border-customRed-900 focus:ring-[0.25rem] focus:ring-[#e7b7b4]"
                  type="radio"
                  name="sexe"
                  id="homme"
                  value={'homme'}
                  checked={employee.sexe.toLowerCase() === 'homme'}
                  onChange={(ev) =>
                    setEmployee((cu) => ({
                      ...cu,
                      sexe: ev.target.value,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="homme">
                  Homme
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input checked:bg-customRed-900 checked:border-customRed-900 focus:ring-[0.25rem] focus:ring-[#e7b7b4]"
                  type="radio"
                  name="sexe"
                  id="femme"
                  value={'femme'}
                  checked={employee.sexe.toLowerCase() === 'femme'}
                  onChange={(ev) =>
                    setEmployee((cu) => ({
                      ...cu,
                      sexe: ev.target.value,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="femme">
                  Femme
                </label>
              </div>
            </fieldset>
          </div>

          <div className="col-12 col-lg-6">
            <fieldset className="form-group">
              <legend className="form-label text-base">Est un cadre</legend>

              <div className="form-check">
                <input
                  className="form-check-input checked:bg-customRed-900 checked:border-customRed-900 focus:ring-[0.25rem] focus:ring-[#e7b7b4]"
                  type="radio"
                  name="cadre"
                  id="cadreOui"
                  value={true}
                  checked={employee.cadre === true}
                  onChange={(ev) =>
                    setEmployee((cu) => ({
                      ...cu,
                      cadre: ev.target.checked,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="cadreOui">
                  Oui
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input checked:bg-customRed-900 checked:border-customRed-900 focus:ring-[0.25rem] focus:ring-[#e7b7b4]"
                  type="radio"
                  name="cadre"
                  id="cadreNon"
                  value={false}
                  checked={employee.cadre !== true}
                  onChange={(ev) =>
                    setEmployee((cu) => ({
                      ...cu,
                      cadre: !ev.target.checked,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="cadreNon">
                  Non
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormInfoGalEmployee
