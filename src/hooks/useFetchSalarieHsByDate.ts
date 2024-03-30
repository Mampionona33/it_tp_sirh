import { IGetSalarieHsByDateProps } from '@src/interfaces/interfaceGetSalarieHsByDate'
import heureService from '@src/services/HeureService'
import { useQuery } from '@tanstack/react-query'

const useFetchSalarieHsByDate = (data: IGetSalarieHsByDateProps) => {
  // Ajoutez 'data' comme paramètre
  const {
    data: salarieHs,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ['salarieHsByDate'],
    queryFn: async () => {
      try {
        const response = await heureService.getSalarieHsByDate(data)
        return response.data
      } catch (error) {
        throw error
      }
    },
    enabled: !!data.annee && !!data.mois && !!data.matricule,
  })
  return { isLoading, refetch, isError, error, salarieHs }
}

export default useFetchSalarieHsByDate
