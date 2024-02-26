import { IEmploye } from '@src/interfaces/interfaceEmploye'
import employeService from '@src/services/EmployeeService'
import { useQuery } from '@tanstack/react-query'
<<<<<<< HEAD
=======
import { useEffect, useState } from 'react'
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147

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
<<<<<<< HEAD
    enabled: !!id,
=======
    // enabled: !!id,
>>>>>>> 64f0ab4785ac05f9167f6e115a3046c1ffd49147
  })

  return { data, isLoading, refetch, isError, error, isSuccess }
}

export default useFetchSalarie
