import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import useEmployeeExists from '@src/hooks/useEmployeeExists'
import { fetchHistoriquesPaie } from '@src/redux/historiqueDePaie/historiqueDePaieAction'
import Page404 from '@src/views/pages/page404/Page404'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SelectAnnee from './SelectAnnee'
import { setHistoriqueDePaie } from '@src/redux/historiqueDePaie/historiqueDePaieReducer'

const HistoriquePaie = () => {
  const isEmloyExist = useEmployeeExists()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [history, setHistory] = useState([])
  const { loading: loadinHistoriquePaie, anneeSectionne } = useAppSelector(
    (store) => store.historiquePaie,
  )

  useEffect(() => {
    const fetchHistory = async () => {
      if (isEmloyExist && id) {
        try {
          const resp = await dispatch(
            fetchHistoriquesPaie({ id, annee: new Date(anneeSectionne).getFullYear() }),
          )
          if (resp.meta.requestStatus === 'fulfilled') {
            console.log(resp.payload)
          }
        } catch (error) {
          throw error
        }
      }
    }
    fetchHistory()
  }, [id, isEmloyExist, dispatch, anneeSectionne])

  const handleDateChange = (date: Date) => {
    dispatch(setHistoriqueDePaie({ anneeSectionne: date }))
  }

  return (
    <div>
      {isEmloyExist ? (
        <div>
          <SelectAnnee selectedDate={new Date(anneeSectionne)} onDateChange={handleDateChange} />
          <div>Historique</div>
        </div>
      ) : (
        <Page404 />
      )}
    </div>
  )
}

export default HistoriquePaie
