import employeService from '@src/services/EmployeeService'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useFetchSalarie = (id?: string | number) => {
  const [salarie, setSalarie] = useState(null)
  const [errors, setErrors] = useState(null)

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['salarie', id],
    queryFn: async () => {
      try {
        const salarie = await employeService.getById(id)
        setSalarie(salarie.data)
        return salarie
      } catch (error) {
        setErrors(error)
        throw error
      }
    },
  })

  useEffect(() => {
    if (data) {
      setSalarie(data.data)
    }
  })
  return { salarie, isLoading, refetch, isError, errors }
}

export default useFetchSalarie
