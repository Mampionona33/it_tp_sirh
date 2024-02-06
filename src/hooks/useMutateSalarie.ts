import { useMutateSalarieProps } from '@src/interfaces/interfaceUseMutateSalarie'
import employeService from '@src/services/EmployeeService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useMutateSalarie = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, error, isError, isIdle, isPending, isPaused, isSuccess } = useMutation({
    mutationFn: async (props: useMutateSalarieProps) => {
      if (props.id) {
        return await employeService.update(String(props.id), props.data)
      }
      return await employeService.create(props.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salarie'] })
    },
  })
  return { mutateAsync, error, isError, isIdle, isPending, isPaused, isSuccess }
}

export default useMutateSalarie
