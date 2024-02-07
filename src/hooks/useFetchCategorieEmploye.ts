import categorieEmployeService from '@src/services/CategorieEmployeService'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useFetchCategorieEmploye = () => {
  const [data, setData] = useState(null)

  const {
    data: categoriesEmployes,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ['categories_employes'],
    queryFn: async () => {
      try {
        const response = await categorieEmployeService.getAll()
        setData(response.data)
        return response
      } catch (error) {
        throw error
      }
    },
  })
  useEffect(() => {
    if (data) {
      setData(data.data)
    }
  }, [data])
  return { data, isLoading, refetch, isError, error, categoriesEmployes }
}

export default useFetchCategorieEmploye
