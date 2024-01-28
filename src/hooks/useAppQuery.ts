import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

type CallbackFunction = () => Promise<any>

const useAppQuery = (callback: CallbackFunction) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  const { refetch, isError, error } = useQuery({
    queryKey: ['genericQuery'],
    queryFn: async () => {
      try {
        const response = await callback()
        setData(response.data)
        setIsLoading(false)
        return response
      } catch (error) {
        setErrors(error)
        setIsLoading(false)
        throw error
      }
    },
  })

  useEffect(() => {
    if (isError) {
      setErrors(error)
      setIsLoading(false)
    }
  }, [isError, error])

  return { data, isLoading, refetch, isError, errors }
}

export default useAppQuery
