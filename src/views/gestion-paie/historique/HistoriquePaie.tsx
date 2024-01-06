import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import useEmployeeExists from '@src/hooks/useEmployeeExists'
import { fetchHistoriquesPaie } from '@src/redux/historiqueDePaie/historiqueDePaieAction'
import Page404 from '@src/views/pages/page404/Page404'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const HistoriquePaie = () => {
  const isEmloyExist = useEmployeeExists()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [history, setHistory] = useState([])
  const { loading: loadinHistoriquePaie } = useAppSelector((store) => store.historiquePaie)

  useEffect(() => {
    const fetchHistory = async () => {
      if (isEmloyExist && id) {
        try {
          const resp = await dispatch(fetchHistoriquesPaie({ id, annee: 2023 }))
          if (resp.meta.requestStatus === 'fulfilled') {
            console.log(resp.payload)
          }
        } catch (error) {
          throw error
        }
      }
    }
    fetchHistory()
  }, [id, isEmloyExist, dispatch])

  return (
    <div>
      {isEmloyExist ? (
        <div>
          <div>Historique</div>
        </div>
      ) : (
        <Page404 />
      )}
    </div>
  )
}

export default HistoriquePaie
