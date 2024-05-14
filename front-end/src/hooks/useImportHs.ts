import { HsProps } from '@src/interfaces/interfaceHs'
import heureService from '@src/services/HeureService'
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
    mutationKey: ['importHs'],
    mutationFn: async (data: HsProps[]) => {
      // Change parameter name to match the data being sent
      try {
        const response = await heureService.uploadHsData(data)
        return response
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
