import { useEffect, useState } from 'react'
import modeDePayementService from '@src/services/ModeDePayementService'
import { useQuery } from '@tanstack/react-query'

const useFetchListModeDePayement = () => {
  const [listModeDePayement, setListModeDePayement] = useState(null)
  const [errors, setErrors] = useState(null)

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['listModeDePayement'],
    queryFn: async () => {
      try {
        const response = await modeDePayementService.getAll()
        setListModeDePayement(response.data)
        return response
      } catch (error) {
        setErrors(error)
        throw error
      }
    },
  })

  useEffect(() => {
    if (data) {
      setListModeDePayement(data.data)
    }
  }, [data])

  return { listModeDePayement, isLoading, refetch, isError, errors }
}

export default useFetchListModeDePayement
