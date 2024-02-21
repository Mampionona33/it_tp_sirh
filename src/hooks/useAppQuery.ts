import { useQuery } from '@tanstack/react-query'

type CallbackFunction = () => Promise<any>

const useAppQuery = (callback: CallbackFunction) => {
  const { data, refetch, isError, error, isLoading } = useQuery({
    queryKey: ['genericQuery'],
    queryFn: async () => {
      try {
        const response = await callback()

        return response.data
      } catch (error) {
        throw error
      }
    },
  })

  return { data, isLoading, refetch, isError, error }
}

export default useAppQuery
