import employeService from '@src/services/EmployeeService'
import { useQuery } from '@tanstack/react-query'

const useFetchListEmploye = () => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['list_employe'],
    queryFn: async () => {
      try {
        const response = await employeService.getAll()
        return response
      } catch (error) {
        throw error
      }
    },
  })

  return { data, isLoading, refetch, isError, error }
}

export default useFetchListEmploye
