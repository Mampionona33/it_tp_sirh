import React, { useState } from 'react'
import ButtonWithIcon, { ButtonWithIconVariant } from '../../buttons/ButtonWithIcon'
import { UserMinusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { Alert } from '@material-tailwind/react'
import employeService from '@src/services/EmployeeService'
import { format } from 'date-fns'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { setModalOpen } from '@src/redux/modal/modalReducer'
import AppModal from '../../Modal/AppModal'
import ModalValidResiliation from './ModalValidResiliation'
import FormAlertError from './FormAlertError'

const FormResiliationContrat = () => {
  const formEmploye = useAppSelector((store) => store.formEmploye)
  const dispatch = useAppDispatch()
  const [appModalError, setAppModalError] = useState(false)
  const [formData, setFormData] = useState({
    nom_matricule: '',
    motif: '',
  })

  const isNomMatriculeValid = (): boolean => {
    return formData.nom_matricule.trim() === formEmploye.nom + ' ' + formEmploye.matricule
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (isNomMatriculeValid()) {
      console.log('Formulaire soumis avec succès', formData)
      dispatch(setModalOpen())
    } else {
      setAppModalError(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <FormAlertError appModalError={appModalError} setAppModalError={setAppModalError} />
      <AppModal>
        <ModalValidResiliation motif={formData.motif} />
      </AppModal>
      <div className="my-4 p-3 bg-customRed-25 border-collapse border-1 border-customRed-930">
        <h1 className="text-lg text-customRed-930">Résiliation du contrat</h1>
        <p className="text-base text-customRed-930">
          {`Veuillez confirmer la résiliation en saisissant les informations suivantes : nom,
          matricule de l'employé, ainsi que le motif de la résiliation. Merci de noter que cette
          actif:EnumBoolean.NON,on est permanente et irréversible. Assurez-vous de suivre le format suivant: `}
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
              value={formData.nom_matricule}
              onChange={handleChange}
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
              value={formData.motif}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <ButtonWithIcon
              type="submit"
              label="Résilier"
              name="submit-resiliation"
              icon={<UserMinusIcon width={20} height={20} />}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default FormResiliationContrat
