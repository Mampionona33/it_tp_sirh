import { useEffect, useState } from 'react'
import modeDePayementService from '@src/services/ModeDePayementService'
import { useQuery } from '@tanstack/react-query'

const useFetchModeDePayement = (value: string) => {
  const [modeDePayement, setModeDePayement] = useState(null)
  const [errors, setErrors] = useState(null)

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['modeDePayement'],
    queryFn: async () => {
      try {
        const response = await modeDePayementService.getOneByVal(value)
        setModeDePayement(response.data)
        return response
      } catch (error) {
        setErrors(error)
        throw error
      }
    },
  })

  useEffect(() => {
    if (data) {
      setModeDePayement(data.data)
    }
  }, [data])

  return { modeDePayement, isLoading, refetch, isError, errors }
}

export default useFetchModeDePayement
