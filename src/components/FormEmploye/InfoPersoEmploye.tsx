import * as React from 'react'

function InfoPersoEmploye(props) {
  return (
    <>
      <div className="flex bg-customRed-25 mt-2">
        <div className="grid grid-cols-3 gap-4 p-3 w-full">
          <div className="flex flex-col mb-3">
            <label htmlFor="nom">Nom *</label>
            <input type="text" name="nom" id="nom" className="border border-customRed-50 focus:outline-customRed-100 h-[30px]"  />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="prenom">Prénom *</label>
            <input type="text" name="prenom" id="prenom" className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[30px]" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="adresse">Adresse *</label>
            <input type="text" name="adresse" id="adresse" className="border border-customRed-50 focus:outline-customRed-100 p-2 h-[30px]"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoPersoEmploye
