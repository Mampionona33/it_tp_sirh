import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { employeesCategories, employees } from 'src/db/db'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'
import EmployeeService from 'src/services/EmployeeService'
import { useSelector } from 'react-redux'

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
  const employeesList = useSelector((state) => state.employeesList.list)

  useEffect(() => {
    let mount = true
    if (mount && props.id && employeesList.length > 0) {
      // EmployeeService.getById(props.id)
      //   .then((response) => {
      //     const emp = response.data

      //     // console.log(emp)
      //     if (emp && mount) {
      //       setEmployee({
      //         ...emp,
      //         nom: emp.name.nom ? emp.name.nom : '',
      //         prenom: emp.name.prenom ? emp.name.prenom : '',
      //         dateEmbauche: emp.dateEmbauche
      //           ? format(parseISO(emp.dateEmbauche), 'yyyy-MM-dd')
      //           : '',
      //       })
      //     }
      //   })
      //   .catch((error) => console.error(error))
      const emp = employeesList.filter((employee) => employee.id == props.id)
      console.log(emp)
      if (emp.length > 0) {
        setEmployee(emp[0])
      }
      return () => {
        mount = false
      }
    }
  }, [props.id, employeesList])

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
              value={employee.dateEmbauche}
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
                  checked={employee.sexe === 'Homme'}
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
                  checked={employee.sexe === 'Femme'}
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

FormInfoGalEmployee.propTypes = {
  id: PropTypes.string.isRequired,
}

export default FormInfoGalEmployee
