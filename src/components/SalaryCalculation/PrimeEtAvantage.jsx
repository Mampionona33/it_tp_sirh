import React, { useState, useCallback } from 'react'
import CustomSection from 'src/components/CustomSection'
import { useDispatch } from 'react-redux'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import { useSelector } from 'react-redux'
import mergeArraysByReferenceValue from 'src/utils/mergeArraysByReferenceValue'
import { addNotification } from 'src/redux/notificationStack/notificationStackReducer'
import formatAriaryMga from 'src/utils/formatAriaryMga'

export default function PrimeEtAvantage() {
  const title = 'Primes et avantages'
  const ajoutSalaire = useSelector((state) => state.bulletinDePaie.ajoutSalaire)
  const retenuSalaire = useSelector((state) => state.bulletinDePaie.retenuSalaire)
  const mouvementSalaire = useSelector((state) => state.mouvementSalaire.list)
  const dispatch = useDispatch()
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const Body = () => {
    const [formValues, setFormValues] = useState({})

    const halfLength = mouvementSalaire && Math.ceil(mouvementSalaire.length / 2)
    const firstHalf = mouvementSalaire && mouvementSalaire.slice(0, halfLength)
    const secondHalf = mouvementSalaire && mouvementSalaire.slice(halfLength)

    const handleSubmit = (e) => {
      e.preventDefault()

      let primeEtAvantage = 0
      let deduction = 0
      const updatedAjoutSalaire = []
      const updatedRetenue = []

      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          const value = parseFloat(formValues[key])
          // Use the current key directly in the loop
          const field =
            mouvementSalaire.length > 0 &&
            mouvementSalaire.find((item) => item.id === parseInt(key))

          if (field) {
            if (field.action === 'ajout') {
              updatedAjoutSalaire.push({ label: field.label, montant: value })
              primeEtAvantage += value
            } else if (field.action === 'deduction') {
              updatedRetenue.push({ label: field.label, montant: value })
              deduction += value
            }
          }
        }
      }

      const ajoutSalaireUp = mergeArraysByReferenceValue(ajoutSalaire, updatedAjoutSalaire, 'label')
      const retenuSalaireUp = mergeArraysByReferenceValue(retenuSalaire, updatedRetenue, 'label')

      dispatch(setBulletinDePaie({ totalPrimeEtAvantage: primeEtAvantage }))
      dispatch(setBulletinDePaie({ totalDeduction: deduction }))
      if (primeEtAvantage > 0) {
        dispatch(
          addNotification({
            title: 'Primes et avantages',
            message: `Ajout de la somme de  ${formatAriaryMga(
              primeEtAvantage,
            )} dans le calcul du salaire brut.`,
          }),
        )
      }
      deduction > 0 &&
        dispatch(
          addNotification({
            title: 'Retenues',
            message: `La somme de ${formatAriaryMga(deduction)} Ar a été déduite du salaire brut.`,
          }),
        )
      dispatch(setBulletinDePaie({ ajoutSalaire: ajoutSalaireUp }))
      dispatch(setBulletinDePaie({ retenuSalaire: retenuSalaireUp }))
      // setIsFormSubmitted(true)
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

    const handleReset = () => {
      dispatch(setBulletinDePaie({ totalPrimeEtAvantage: null }))
      dispatch(setBulletinDePaie({ totalDeduction: null }))
      setIsFormSubmitted(false)
    }

    React.useEffect(() => {
      let mount = true
      // console.log(retenue)
      if (mount && mouvementSalaire.length > 0) {
        const initialIndmnite = mouvementSalaire.filter((field) => field.action === 'ajout')
        const initialRetenue = mouvementSalaire.filter((field) => field.action === 'deduction')

        if (ajoutSalaire.length === 0) {
          dispatch(setBulletinDePaie({ ajoutSalaire: [...initialIndmnite] }))
        }
        if (retenuSalaire.length === 0) {
          dispatch(setBulletinDePaie({ retenuSalaire: [...initialRetenue] }))
        }
      }

      return () => {
        mount = false
      }
    }, [])

    return (
      <>
        <form action="" className="w-full" onSubmit={handleSubmit} method="post">
          <div className="row g-3 mx-4 my-2">
            <div className="col-12 col-lg-6">
              {firstHalf &&
                firstHalf.map((item, index) => (
                  <div key={item.id} className="mb-1">
                    <label className="form-label" htmlFor={item.id}>
                      {item.label}
                    </label>
                    <input
                      className="form-control disabled"
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
              {secondHalf &&
                secondHalf.map((item, index) => (
                  <div key={item.id} className="mb-1">
                    <label className="form-label" htmlFor={item.id}>
                      {item.label}
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      name={item.id}
                      data-action={item.action}
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
                <button type="reset" className="btn btn-secondary" onClick={handleReset}>
                  Corriger
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

  return <>{mouvementSalaire && <CustomSection title={title} body={<Body />} />}</>
}
