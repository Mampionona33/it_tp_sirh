import { useEffect, useState } from 'react'
import modeDePayementService from '@src/services/ModeDePayementService'
import { useQuery } from '@tanstack/react-query'

const useFetchListModeDePayement = () => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['listModeDePayement'],
    queryFn: async () => {
      try {
        const response = await modeDePayementService.getAll()
        return response.data
      } catch (error) {
        throw error
      }
    },
  })

  return { data, isLoading, refetch, isError, error }
}

export default useFetchListModeDePayement
