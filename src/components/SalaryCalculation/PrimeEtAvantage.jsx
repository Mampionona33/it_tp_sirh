import React, { useState, useCallback } from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch } from 'react-redux'
import { setPrimeEtAvantage } from 'src/redux/selectedEmploye/selectedEmployeReducer'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import { useSelector } from 'react-redux'

export default function PrimeEtAvantage() {
  const title = 'Primes et avantages'
  const indemnite = useSelector((state) => state.bulletinDePaie.indemnite)
  const retenue = useSelector((state) => state.bulletinDePaie.retenue)
  const dispatch = useDispatch()

  const Body = () => {
    const fields = [
      { id: 'primeAssuidite', label: "Prime d'assuicidité", action: 'indemnite', base: 0 },
      { id: 'primeExcellence', label: "Prime d'excellence", action: 'indemnite', base: 0 },
      { id: 'absenceRetard', label: 'Absence / Retard à déduire', action: 'retenue', base: 0 },
      { id: 'indemniteTransport', label: 'Indemnité de transport', action: 'indemnite', base: 0 },
      {
        id: 'avantageNature',
        label: 'Avantages en nature (Logement)',
        action: 'indemnite',
        base: 0,
      },
      {
        id: 'avantageVehicule',
        label: 'Avantages en nature (Véhicule)',
        action: 'indemnite',
        base: 0,
      },
      { id: 'autresIndemnite', label: 'Autres indemnités', action: 'indemnite', base: 0 },
      { id: 'autresAvantage', label: 'Autres avantages', action: 'indemnite', base: 0 },
      { id: 'rappel', label: 'Rappel', action: 'indemnite', base: 0 },
    ]

    const [formValues, setFormValues] = useState({})

    const halfLength = Math.ceil(fields.length / 2)
    const firstHalf = fields.slice(0, halfLength)
    const secondHalf = fields.slice(halfLength)

    const handleSubmit = (e) => {
      e.preventDefault()
      // console.log(formValues)
      let primeEtAvantage = 0
      const updatedIndemnite = []
      const updatedRetenue = []

      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          const value = parseFloat(formValues[key])
          const field = fields.find((item) => item.id === key)

          if (field) {
            // Vérifier si l'action est 'indemnite' ou 'retenue'

            if (field.action === 'indemnite') {
              updatedIndemnite.push({ label: field.label, base: value, taux: field.taux })
              primeEtAvantage += value
            } else if (field.action === 'retenue') {
              updatedRetenue.push({ label: field.label, base: value, taux: field.taux })
              primeEtAvantage -= value
            }
          }
        }
      }
      dispatch(setBulletinDePaie({ indemnite: [...indemnite, ...updatedIndemnite] }))
      dispatch(setBulletinDePaie({ retenue: [...retenue, ...updatedRetenue] }))
      dispatch(setPrimeEtAvantage(primeEtAvantage))

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

    React.useEffect(() => {
      let mount = true
      console.log(retenue)
      if (mount && fields.length > 0) {
        const initialIndmnite = fields.filter((field) => field.action === 'indemnite')
        const initialRetenue = fields.filter((field) => field.action === 'retenue')

        if (indemnite.length === 0) {
          dispatch(setBulletinDePaie({ indemnite: [...indemnite, ...initialIndmnite] }))
        }
        if (retenue.length === 0) {
          dispatch(setBulletinDePaie({ retenue: [...retenue, ...initialRetenue] }))
        }
      }

      return () => {
        mount = false
      }
    }, [fields, indemnite, retenue])

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
