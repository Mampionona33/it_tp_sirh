import { HsProps } from '@src/interfaces/interfaceHs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const useUploadHs = () => {
  const queryClient = useQueryClient()

  const { mutate, error, isError, isIdle, isPending, isPaused, isSuccess, data, mutateAsync } =
    useMutation({
      mutationFn: async (props: HsProps[]) => {
        try {
          return await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/importheuressupplementaires`,
            { props },
          )
        } catch (error) {
          throw error
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['importHs'] })
      },
    })

  return { mutate, error, isError, isIdle, isPending, isPaused, isSuccess, data, mutateAsync }
}

export default useUploadHs
