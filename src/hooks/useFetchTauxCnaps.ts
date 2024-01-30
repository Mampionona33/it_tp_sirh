import tauxCnapsService from '@src/services/TauxCnapsService'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useFetchTauxCnaps = () => {
  const [data, setTauxCnapsEmployeur] = useState(null)
  const [errors, setErrors] = useState(null)

  const {
    data: cotisations,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ['cotisations'],
    queryFn: async () => {
      try {
        const response = await tauxCnapsService.getAll()
        setTauxCnapsEmployeur(response.data)
        return response
      } catch (error) {
        setErrors(error)
        throw error
      }
    },
  })

  useEffect(() => {
    if (data) {
      setTauxCnapsEmployeur(data.data)
    }
  }, [data])
  return { data, isLoading, refetch, isError, errors, cotisations }
}

export default useFetchTauxCnaps
