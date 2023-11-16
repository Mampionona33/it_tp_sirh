import React, { useState, useCallback } from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch } from 'react-redux'
import { setPrimeEtAvantage } from 'src/redux/selectedEmploye/selectedEmployeReducer'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import { useSelector } from 'react-redux'
import { fetchAllMouvementSalaire } from 'src/redux/mouvementSalaire/mouvementSalaireAction'

export default function PrimeEtAvantage() {
  const title = 'Primes et avantages'
  const indemnite = useSelector((state) => state.bulletinDePaie.indemnite)
  const retenue = useSelector((state) => state.bulletinDePaie.retenue)
  const mouvementSalaire = useSelector((state) => state.mouvementSalaire.list)
  const dispatch = useDispatch()

  console.log(mouvementSalaire)

  const Body = () => {
    const [formValues, setFormValues] = useState({})

    const halfLength = Math.ceil(mouvementSalaire.length / 2)
    const firstHalf = mouvementSalaire.slice(0, halfLength)
    const secondHalf = mouvementSalaire.slice(halfLength)

    const handleSubmit = (e) => {
      e.preventDefault()
      // console.log(formValues)
      let primeEtAvantage = 0
      const updatedIndemnite = []
      const updatedRetenue = []

      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          const value = parseFloat(formValues[key])
          const field = mouvementSalaire.find((item) => item.id === key)

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
      // console.log(retenue)
      if (mount && mouvementSalaire.length > 0) {
        const initialIndmnite = mouvementSalaire.filter((field) => field.action === 'ajout')
        const initialRetenue = mouvementSalaire.filter((field) => field.action === 'deduction')

        if (indemnite.length === 0) {
          dispatch(setBulletinDePaie({ indemnite: [...indemnite, ...initialIndmnite] }))
        }
        if (retenue.length === 0) {
          dispatch(setBulletinDePaie({ retenue: [...retenue, ...initialRetenue] }))
        }
      }

      if (mount && mouvementSalaire.length === 0) {
        dispatch(fetchAllMouvementSalaire())
      }

      return () => {
        mount = false
      }
    }, [indemnite, retenue, dispatch, mouvementSalaire])

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
