import tauxCnapsService from '@src/services/TauxCnapsService'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useGetTauxCnapsEmployeur = () => {
  const [tauxCnapsEmployeur, setTauxCnapsEmployeur] = useState(null)
  const [errors, setErrors] = useState(null)

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['tauxCnapsEmployeur'],
    queryFn: async () => {
      try {
        const response = await tauxCnapsService.getTauxEmployeur()
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
  return { tauxCnapsEmployeur, isLoading, refetch, isError, errors }
}

export default useGetTauxCnapsEmployeur
