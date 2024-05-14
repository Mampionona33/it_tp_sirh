import newCotisationService from '@src/services/CotisationService'
import { useQuery } from '@tanstack/react-query'

const useFetchCotisations = () => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['cotisations'],
    queryFn: async () => {
      try {
        const response = await newCotisationService.getAll()
        return response.data
      } catch (error) {
        throw error
      }
    },
  })
  return { data, isLoading, refetch, isError, error }
}

export default useFetchCotisations
