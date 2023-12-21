import React from 'react'
import MainHeader from './MainHeader'
import InfoPersoEmploye from './InfoPersoEmploye'
import InfoPersoEnfantEmploye from './InfoPersoEnfantEmploye'
import InfoPro from './InfoPro'
import InformationPaie from './InformationPaie'
import PrimeEtAvantageParMois from './PrimeEtAvantageParMois'
import FormEmployeGroupButton from './FormEmployeGroupButton'
import FormResiliationContrat from './FormResiliationContrat'

const FormEmploye = () => {
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()

    const target = ev.target as typeof ev.target & {
      nom: { value: string }
      prenom: { value: string }
      adresse: { value: string }
      lieu_naissance: { value: string }
      date_naissance: { value: Date }
      cin: { value: string }
      genre: { value: string }
      titre_poste: { value: string }
      matricule: { value: string }
      cat: { value: string }
      departement: { value: string }
      date_embauche: { value: Date }
      lieu_travail: { value: string }
      cadre: { value: string }
      travail_de_nuit: { value: string }
      salaire_de_base: { value: number }
      rib: { value: string }
      mode_payement_salaire: { value: string }
      num_cnaps: { value: string }
      num_osie: { value: string }
    }

    const nom = target.nom.value
    const prenom = target.prenom.value
    const adresse = target.adresse.value
    const date_naissance = target.date_naissance.value
    const lieu_naissance = target.lieu_naissance.value
    const cin = target.cin.value
    const genre = target.genre.value
    const titre_poste = target.titre_poste.value
    const matricule = target.matricule.value
    const cat = target.cat.value
    const departement = target.departement.value
    const date_embauche = target.date_embauche.value
    const lieu_travail = target.lieu_travail.value
    const travail_de_nuit = target.travail_de_nuit.value
    const salaire_de_base = target.salaire_de_base.value
    const rib = target.rib.value
    const mode_payement_salaire = target.mode_payement_salaire.value
    const num_cnaps = target.num_cnaps.value
    const num_osie = target.num_osie.value
    const cadre = target.cadre.value

    console.log(
      nom,
      prenom,
      adresse,
      lieu_naissance,
      date_naissance,
      cin,
      genre,
      titre_poste,
      matricule,
      cat,
      departement,
      date_embauche,
      lieu_travail,
      cadre,
      travail_de_nuit,
      salaire_de_base,
      rib,
      mode_payement_salaire,
      num_cnaps,
      num_osie,
    )
  }

  return (
    <>
      <div>
        <>
          <div className="bg-white flex flex-col py-11">
            <form action="" onSubmit={handleSubmit}>
              <MainHeader />
              <InfoPersoEmploye />
              <InfoPersoEnfantEmploye />
              <InfoPro />
              <InformationPaie />
              <PrimeEtAvantageParMois />
              <FormEmployeGroupButton />
            </form>
            <FormResiliationContrat />
          </div>
        </>
      </div>
    </>
  )
}

export default FormEmploye
