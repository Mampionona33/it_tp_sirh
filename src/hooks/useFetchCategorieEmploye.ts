import categorieEmployeService from '@src/services/CategorieEmployeService'
import { useQuery } from '@tanstack/react-query'

const useFetchCategorieEmploye = () => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['categories_employes'],
    queryFn: async () => {
      try {
        const response = await categorieEmployeService.getAll()
        return response
      } catch (error) {
        throw error
      }
    },
  })

  return { data, isLoading, refetch, isError, error }
}

export default useFetchCategorieEmploye
