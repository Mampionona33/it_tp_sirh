import modeDePayementService from '@src/services/ModeDePayementService'
import { useQuery } from '@tanstack/react-query'

const useFetchModeDePayement = (value: string) => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['modeDePayement'],
    queryFn: async () => {
      try {
        const response = await modeDePayementService.getOneByVal(value)
        return response.data
      } catch (error) {
        throw error
      }
    },
  })

  return { data, isLoading, refetch, isError, error }
}

export default useFetchModeDePayement
