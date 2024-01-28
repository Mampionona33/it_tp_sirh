import historiquePaieService from '@src/services/HistoriquePaieSerivce'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

const useFetchHistorique = (id: string, anneeSectionneNumber: number) => {
  const [historiques, setHistorique] = useState(null)
  const [errors, setErrors] = useState(null)

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['historiques', id, anneeSectionneNumber],
    queryFn: async () => {
      try {
        const historiques = await historiquePaieService.getAllByUserIDAndDate({
          id,
          annee: anneeSectionneNumber,
        })
        setHistorique(historiques.data)
        return historiques
      } catch (error) {
        // Gérer les erreurs si nécessaire
        setErrors(error)
        throw error
      }
    },
  })

  useEffect(() => {
    if (data) {
      setHistorique(data.data)
    }
  }, [data])

  return { historiques, isLoading, refetch, isError, errors }
}

export default useFetchHistorique
