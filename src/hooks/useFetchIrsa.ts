import { IPageIrsaProps } from '@src/interfaces/intefacePageIrsa'
import irsaService from '@src/services/IrsaService'
import { useQuery } from '@tanstack/react-query'

const useFetchIrsa = () => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['irsa'],
    queryFn: async () => {
      try {
        const response = await irsaService.getIrsaByMonthYear(data.mois, data.annee)
        return response
      } catch (error) {
        throw error
      }
    },
  })

  return { data, isLoading, refetch, isError, error }
}
