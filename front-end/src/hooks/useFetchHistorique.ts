import historiquePaieService from '@src/services/HistoriquePaieSerivce'
import { useQuery } from '@tanstack/react-query'

const useFetchHistorique = (id: string, anneeSectionneNumber: number) => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['historiques', id, anneeSectionneNumber],
    queryFn: async () => {
      try {
        const historiques = await historiquePaieService.getAllByUserIDAndDate({
          id,
          annee: anneeSectionneNumber,
        })
        return historiques.data
      } catch (error) {
        // Gérer les erreurs si nécessaire
        throw error
      }
    },
  })

  return { data, isLoading, refetch, isError, error }
}

export default useFetchHistorique
