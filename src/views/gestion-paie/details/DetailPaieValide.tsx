import React, { useEffect } from 'react'
import CardSalaireBrut from '../valider-paie/ValiderCalculPaie/CardSalaireBrut'
import CardSalaireNet from '../valider-paie/ValiderCalculPaie/CardSalaireNet'
import CardSalaireNetAPayer from '../valider-paie/ValiderCalculPaie/CardSalaireNetAPayer'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { fetchDetailsHistoriquePaie } from '@src/redux/historiqueDePaie/historiqueDePaieAction'
import { useParams } from 'react-router-dom'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'

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
    <div>
      <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1">
        <CardSalaireBrut />
        <CardSalaireNet />
        <CardSalaireNetAPayer />
      </div>
    </div>
  )
}

export default DetailPaieValide
