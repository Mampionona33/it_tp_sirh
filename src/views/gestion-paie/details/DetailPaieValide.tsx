import React, { useEffect } from 'react'
import CardSalaireBrut from '../valider-paie/ValiderCalculPaie/CardSalaireBrut'
import CardSalaireNet from '../valider-paie/ValiderCalculPaie/CardSalaireNet'
import CardSalaireNetAPayer from '../valider-paie/ValiderCalculPaie/CardSalaireNetAPayer'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { fetchDetailsHistoriquePaie } from '@src/redux/historiqueDePaie/historiqueDePaieAction'
import { useParams } from 'react-router-dom'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import ButtonLink from '@src/components/buttons/ButtonLink'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Page404 from '@src/views/pages/page404/Page404'

const DetailPaieValide = () => {
  const dispatch = useAppDispatch()
  const { id, idValidation, validationYear, validationMonth } = useParams()
  const { salarie, validation } = useAppSelector((store) => store.bulletinDePaie)

  useEffect(() => {
    const fetchDetailsBltnPaie = async () => {
      try {
        const resp = await dispatch(
          fetchDetailsHistoriquePaie({ id: id!, annee: validationYear!, mois: validationMonth! }),
        )
        if (resp.meta.requestStatus === 'fulfilled') {
          dispatch(setBulletinDePaie(resp.payload))
        }
      } catch (error) {
        throw error
      }
    }
    fetchDetailsBltnPaie()
  }, [idValidation, id, dispatch, validationMonth, validationYear])
  console.log(validation)
  // const moisDeValidation = format(new Date(String(validation.date)), 'MMMM yyyy', { locale: fr })

  if (!salarie) {
    return <Page404 />
  }

  return (
    <div className="w-full mb-3 mr-3 mt-3">
      <div className="flex gap-3 flex-wrap">
        <div className="pt-4 pl-4 pr-4 pb-2 w-full bg-white shadow-sm rounded-sm">
          <p className="text-customRed-900 capitalize border-b border-b-customRed-900">
            {/* Détails sur la paie: {moisDeValidation} */}
          </p>
          <div className="text-sm">
            <p className="mb-1">Nom : {salarie.nom}</p>
            <p className="mb-1">Prenom : {salarie.prenom}</p>
            <p className="mb-1">Matricule : {salarie.matricule}</p>
          </div>
        </div>
        <div className="grid w-full lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1">
          <CardSalaireBrut />
          <CardSalaireNet />
          <CardSalaireNetAPayer />
        </div>
        <div className="flex shadow-sm rounded-sm justify-end bg-white w-full p-4">
          <ButtonLink to="imprimer">Imprimer</ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default DetailPaieValide
