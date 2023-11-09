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
          <div className="row g-3 m-2">
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
                    placeholder="0"
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
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </>
    )
  }

  return (
    <>
      <CustomSection title={title} body={<Body />} />
    </>
  )
}
