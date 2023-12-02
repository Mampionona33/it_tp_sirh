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
    enfant: 0,
    adresse: '',
    email: '',
    numCnaps: '',
    sexe: 'homme',
    cadre: 0,
    travDeNuit: 0,
    cat: '',
    salaireBase: 0,
    dateNaissance: null,
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
              Nom *
            </label>
            <input
              required
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
              Prénom *
            </label>
            <input
              required
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
              required
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
              Matricule *
            </label>
            <input
              required
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
              N° de sécurité sociale *
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
              adresse *
            </label>
            <input
              required
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
            <label className="form-label capitalize" htmlFor="salaireBase">
              salaire de base *
            </label>
            <input
              required
              className="form-control"
              type="number"
              name="salaireBase"
              id="salaireBase"
              min={0}
              value={parseInt(employee.salaireBase) || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-lg-6">
            <label className="form-label capitalize" htmlFor="enfant">
              {`Nombre d'enfant à charge`}
            </label>
            <input
              className="form-control"
              required
              type="number"
              name="enfant"
              id="enfant"
              min={0}
              value={parseInt(employee.enfant) || 0}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-lg-6">
            <label className="form-label capitalize" htmlFor="cin">
              cin *
            </label>
            <input
              required
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
              fonction *
            </label>
            <input
              required
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
            <label className="form-label capitalize" htmlFor="email">
              email
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="yN9kA@example.com"
              value={employee.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-lg-6">
            <label className="form-label" htmlFor="cat">
              Catégorie *
            </label>
            <Select
              {...props}
              required
              menuPlacement="auto"
              id="cat"
              name="cat"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
              options={employeesCategories}
              value={employeesCategories.find((cat) => cat.value === employee.cat) || ''}
              styles={customStyles}
            />
          </div>

          <div className="col-12 col-lg-6">
            <label className="form-label capitalize" htmlFor="telephone">
              télephone
            </label>
            <input
              className="form-control"
              type="text"
              name="telephone"
              id="tel"
              placeholder="06 00 00 00 00"
              value={employee.telephone || ''}
              onChange={handleChange}
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
                  value={1}
                  checked={employee.cadre === 1}
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
                  value={0}
                  checked={employee.cadre !== 1}
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

          <div className="col-12 col-lg-6">
            <fieldset className="form-group">
              <legend className="form-label text-base">Travail de nuit</legend>
              <div className="form-check">
                <input
                  className="form-check-input checked:bg-customRed-900 checked:border-customRed-900 focus:ring-[0.25rem] focus:ring-[#e7b7b4]"
                  type="radio"
                  name="travDeNuit"
                  id="travailDeNuitOui"
                  value={1}
                  checked={employee.travDeNuit === 1}
                  onChange={() => setEmployee({ ...employee, travDeNuit: 1 })}
                />
                <label className="form-check-label" htmlFor="travailDeNuitOui">
                  Oui
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input checked:bg-customRed-900 checked:border-customRed-900 focus:ring-[0.25rem] focus:ring-[#e7b7b4]"
                  type="radio"
                  name="travDeNuit"
                  id="travailDeNuitNon"
                  value={0}
                  checked={employee.travDeNuit === 0}
                  onChange={() => setEmployee({ ...employee, travDeNuit: 0 })}
                />
                <label className="form-check-label" htmlFor="travailDeNuitNon">
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
