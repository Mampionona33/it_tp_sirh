import parametreService from '@src/services/ParametreService'
import { useQuery } from '@tanstack/react-query'

const useFetchParametre = () => {
  const { data, isLoading, refetch, isError, error, isSuccess, isFetching } = useQuery({
    queryKey: ['parametre'],
    queryFn: async () => {
      try {
        const parametre = await parametreService.getAll()
        return parametre
      } catch (error) {
        throw error
      }
    },
  })
  return { data, isLoading, refetch, isError, error, isSuccess, isFetching }
}

export default useFetchParametre
