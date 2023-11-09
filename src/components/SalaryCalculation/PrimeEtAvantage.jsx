import React from 'react'
import CustomSection from 'src/components/CustomSection'

export default function PrimeEtAvantage() {
  const title = 'Primes et avantages'

  const Body = () => {
    const fields = [
      { id: 'primeAssuidite', label: "Prime d'assuicidité" },
      { id: 'primeExcellence', label: "Prime d'excellence" },
      { id: 'absenceRetard', label: 'Absence / Retard à déduire' },
      { id: 'indemniteTransport', label: 'Indemnité de transport' },
      { id: 'avantageNature', label: 'Avantages en nature (Logement)' },
      { id: 'avantageVehicule', label: 'Avantages en nature (Véhicule)' },
      { id: 'autresIndemnite', label: 'Autres indemnités' },
      { id: 'autresAvantage', label: 'Autres avantages' },
      { id: 'rappel', label: 'Rappel' },
    ]

    const halfLength = Math.ceil(fields.length / 2)
    const firstHalf = fields.slice(0, halfLength)
    const secondHalf = fields.slice(halfLength)

    return (
      <>
        <form action="" method="post">
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
                    min="0"
                    name={item.id}
                    id={item.id}
                    placeholder="0 Ar"
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
                    min="0 Ar"
                    name={item.id}
                    id={item.id}
                    placeholder="0"
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
