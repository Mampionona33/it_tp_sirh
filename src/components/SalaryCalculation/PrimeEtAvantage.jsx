import React, { useState, useCallback } from 'react'
import CustomSection from 'src/components/CustomSection'

export default function PrimeEtAvantage() {
  const title = 'Primes et avantages'

  const Body = () => {
    const fields = [
      { id: 'primeAssuidite', label: "Prime d'assuicidité", action: 'addition' },
      { id: 'primeExcellence', label: "Prime d'excellence", action: 'addition' },
      { id: 'absenceRetard', label: 'Absence / Retard à déduire', action: 'deduction' },
      { id: 'indemniteTransport', label: 'Indemnité de transport', action: 'addition' },
      { id: 'avantageNature', label: 'Avantages en nature (Logement)', action: 'addition' },
      { id: 'avantageVehicule', label: 'Avantages en nature (Véhicule)', action: 'addition' },
      { id: 'autresIndemnite', label: 'Autres indemnités', action: 'addition' },
      { id: 'autresAvantage', label: 'Autres avantages', action: 'addition' },
      { id: 'rappel', label: 'Rappel', action: 'addition' },
    ]

    const [formValues, setFormValues] = useState({})

    const halfLength = Math.ceil(fields.length / 2)
    const firstHalf = fields.slice(0, halfLength)
    const secondHalf = fields.slice(halfLength)

    const handleSubmit = (e) => {
      e.preventDefault()
      // console.log(formValues)
      let primeEtAvantage = 0
      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          const value = parseFloat(formValues[key])
          const field = fields.find((item) => item.id === key)

          if (field) {
            // Vérifier si l'action est 'addition' ou 'deduction'
            if (field.action === 'addition') {
              primeEtAvantage += value
            } else if (field.action === 'deduction') {
              primeEtAvantage -= value
            }
          }
        }
      }

      console.log('Prime et Avantage:', primeEtAvantage)
    }

    const handleInputChange = useCallback(
      (e) => {
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          [e.target.name]: e.target.value,
        }))
      },
      [setFormValues],
    )

    return (
      <>
        <form action="" onSubmit={handleSubmit} method="post">
          <div className="row g-3 mx-4 my-2">
            <div className="col-12 col-lg-6">
              {firstHalf.map((item, index) => (
                <div key={item.id} className="mb-3">
                  <label className="form-label" htmlFor={item.id}>
                    {item.label}
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    data-action={item.action}
                    min="0"
                    name={item.id}
                    id={item.id}
                    value={formValues[item.id] || ''}
                    placeholder="0 Ar"
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
            <div className="col-12 col-lg-6">
              {secondHalf.map((item, index) => (
                <div key={item.id} className="mb-3">
                  <label className="form-label" htmlFor={item.id}>
                    {item.label}
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    name={item.id}
                    id={item.id}
                    value={formValues[item.id] || ''}
                    placeholder="0 Ar"
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
            <hr />
            <div className="col-12">
              <div className="d-flex flex-wrap gap-2 justify-end pb-2">
                <button type="reset" className="btn btn-secondary">
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    )
  }

  return (
    <>
      <CustomSection fullWidth title={title} body={<Body />} />
    </>
  )
}
