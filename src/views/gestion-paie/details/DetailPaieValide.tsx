import React, { useEffect } from 'react'
import CardSalaireBrut from '../valider-paie/ValiderCalculPaie/CardSalaireBrut'
import CardSalaireNet from '../valider-paie/ValiderCalculPaie/CardSalaireNet'
import CardSalaireNetAPayer from '../valider-paie/ValiderCalculPaie/CardSalaireNetAPayer'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { fetchDetailsHistoriquePaie } from '@src/redux/historiqueDePaie/historiqueDePaieAction'
import { useParams } from 'react-router-dom'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import ButtonLink from '@src/components/buttons/ButtonLink'

const DetailPaieValide = () => {
  const dispatch = useAppDispatch()
  const { id, idValidation } = useParams()

  useEffect(() => {
    const fetchDetailsBltnPaie = async () => {
      try {
        const resp = await dispatch(fetchDetailsHistoriquePaie({ id, idValidation }))
        if (resp.meta.requestStatus === 'fulfilled') {
          dispatch(setBulletinDePaie(resp.payload))
        }
      } catch (error) {
        throw error
      }
    }
    fetchDetailsBltnPaie()
  }, [idValidation, id, dispatch])

  return (
    <div className="w-full mb-3 mr-3 mt-3">
      <div className="flex gap-3 flex-wrap">
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
