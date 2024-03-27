import { HsProps } from '@src/interfaces/interfaceHs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const useUploadHs = () => {
  const queryClient = useQueryClient()

  const {
    mutate,
    status,
    error,
    isError,
    isIdle,
    isPending,
    isPaused,
    isSuccess,
    data,
    mutateAsync,
  } = useMutation({
    mutationFn: async (data: HsProps[]) => {
      // Change parameter name to match the data being sent
      try {
        return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/importheures/ajout`, {
          heuressup: data,
        })
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['importHs'] })
    },
  })

  return {
    mutate,
    status,
    error,
    isError,
    isIdle,
    isPending,
    isPaused,
    isSuccess,
    data,
    mutateAsync,
  }
}

export default useUploadHs
