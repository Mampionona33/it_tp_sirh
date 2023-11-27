import React from 'react'
import declarationDocxGenerator from './declarationDocxGenerator'
import { useSelector } from 'react-redux'

const DeclarationCnaps = () => {
  const employeur_nom = useSelector((state) => state.bulletinDePaie.employeur.nom)
  const employeur_addresse = useSelector((state) => state.bulletinDePaie.employeur.adresse)
  const employeur_cp_ville = useSelector((state) => state.bulletinDePaie.employeur.CP_et_Ville)
  const data = [
    {
      employeur: {
        nom: employeur_nom,
        adresse: employeur_addresse,
        cp_ville: employeur_cp_ville,
      },
    },
  ]

  const handleClickBtnDnc = () => {
    declarationDocxGenerator(data)
  }

  return (
    <>
      <div className="flex">Declaration cnaps</div>
      <button type="button" onClick={handleClickBtnDnc}>
        génerer déclaration cnaps
      </button>
    </>
  )
}

export default DeclarationCnaps
