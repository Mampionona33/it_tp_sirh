import React from 'react'
import CustomSection from '../CustomSection'

export default function ReductionChargeFamill() {
  const title = 'Réduction de la charge familiale.'

  const Body = () => {
    return (
      <>
        <form action="" className="border-0 flex flex-wrap px-4">
          <div className="my-3 w-full">
            <label htmlFor="reducChargeFamill" className="form-label">
              Réduction de la charge familiale
            </label>
            <input
              type="number"
              name="reducChargeFamill"
              id="reducChargeFamill"
              className="w-full form-control"
              placeholder="0 Ar"
            />
          </div>
          <div className="d-flex py-2 justify-end gap-1 w-full">
            <button type="reset" className="btn btn-secondary">
              Annuler
            </button>
            <button
              type="submit"
              className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200"
            >
              Valider
            </button>
          </div>
        </form>
      </>
    )
  }

  return (
    <div>
      <CustomSection title={title} body={<Body />} />
    </div>
  )
}
