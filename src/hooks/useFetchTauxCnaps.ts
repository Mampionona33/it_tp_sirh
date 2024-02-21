import tauxCnapsService from '@src/services/TauxCnapsService'
import { useQuery } from '@tanstack/react-query'

const useFetchTauxCnaps = () => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['cotisations'],
    queryFn: async () => {
      try {
        const response = await tauxCnapsService.getAll()
        return response.data
      } catch (error) {
        throw error
      }
    },
  })

  return { isLoading, refetch, isError, error, data }
}

export default useFetchTauxCnaps
