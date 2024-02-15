import { IEmploye } from '@src/interfaces/interfaceEmploye'
import employeService from '@src/services/EmployeeService'
import { useQuery } from '@tanstack/react-query'

const useFetchSalarie = (id?: string | number) => {
  const { data, isLoading, refetch, isError, error, isSuccess } = useQuery({
    queryKey: ['salarie', id],
    queryFn: async () => {
      try {
        const salarie = await employeService.getById(String(id))
        return salarie.data as IEmploye
      } catch (error) {
        throw error
      }
    },
    enabled: !!id,
  })

  return { data, isLoading, refetch, isError, error, isSuccess }
}

export default useFetchSalarie
