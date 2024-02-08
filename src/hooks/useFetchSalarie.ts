import employeService from '@src/services/EmployeeService'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useFetchSalarie = (id?: string | number) => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['salarie', id],
    queryFn: async () => {
      try {
        const salarie = await employeService.getById(String(id))
        return salarie.data
      } catch (error) {
        throw error
      }
    },
  })

  return { data, isLoading, refetch, isError, error }
}

export default useFetchSalarie
