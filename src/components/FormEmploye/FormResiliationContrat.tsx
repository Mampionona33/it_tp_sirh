import React from 'react'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import { UserMinusIcon } from '@heroicons/react/24/outline'
const FormResiliationContrat = () => {
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    console.log(ev.target)
  }

  return (
    <>
      <div className="my-4 p-3 bg-customRed-25 border-collapse border-1 border-customRed-930">
        <h1 className="text-lg text-customRed-930">Résiliation du contrat</h1>
        <p className="text-base text-customRed-930">
          {`Veuillez confirmer la résiliation en saisissant les informations suivantes : nom,
          matricule de l'employé, ainsi que le motif de la résiliation. Merci de noter que cette
          action est permanente et irréversible. Assurez-vous de suivre le format suivant: `}
          <span className="font-bold">nom matricule</span> .
        </p>
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="w-1/3">
            <label htmlFor="nom_matricule" className="visually-hidden">
              nom et matricule
            </label>
            <input
              type="text"
              name="nom_matricule"
              id="nom_matricule"
              placeholder="Nom matricule"
              required
              className="border p-2 h-[28px] w-full outline-customRed-930"
            />
          </div>
          <div>
            <label htmlFor="motif" className="visually-hidden">
              motif
            </label>
            <textarea
              className="border p-2  outline-customRed-930 w-full h-full"
              name="motif"
              placeholder="Motif de la resiliation du contrat"
              required
              id="motif"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <ButtonWithIcon
              type="submit"
              label="Résilier"
              icon={<UserMinusIcon width={20} height={20} />}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default FormResiliationContrat
