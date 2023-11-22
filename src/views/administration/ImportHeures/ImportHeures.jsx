import React from 'react'
import CustomSection from 'src/components/CustomSection'
import ImportHS from './ImportHS'

const ImportHeures = () => {
  const title = 'Liste des Heures Supplémentaires '

  const Body = () => {
    const handleReset = (ev) => {
      ev.preventDefault()
    }

    const handleSubmit = (ev) => {
      ev.preventDefault()
    }

    return (
      <div className="flex">
        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="custom-file m-3">
            <input type="file" className="custom-file-input" id="customFile" accept=".csv" />
            <label className="custom-file-label hidden " htmlFor="customFile">
              Choisir un fichier
            </label>
          </div>
          <hr />
          <div className="d-flex flex-wrap gap-2 justify-end pb-2 m-3">
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
        </form>
      </div>
    )
  }

  return (
    <>
      <div>
        <CustomSection title={title} body={<ImportHS />} />
      </div>
    </>
  )
}

export default ImportHeures
