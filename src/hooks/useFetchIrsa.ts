import { IPageIrsaProps } from '@src/interfaces/intefacePageIrsa'
import irsaService from '@src/services/IrsaService'
import { useQuery } from '@tanstack/react-query'

const useFetchIrsa = (formIrsaProps: IPageIrsaProps) => {
  const {
    data: irsaData,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ['irsa'],
    queryFn: async () => {
      if (!formIrsaProps.data.mois.value || !formIrsaProps.data.annee.value) return
      try {
        const response = await irsaService.getIrsaByMonthYear(
          formIrsaProps.data.mois.value,
          formIrsaProps.data.annee.value,
        )
        return response
      } catch (error) {
        throw error
      }
    },

    enabled:
      !!formIrsaProps.data.mois.value &&
      !!formIrsaProps.data.annee.value &&
      formIrsaProps.fetchData,
  })

  return { irsaData, isLoading, refetch, isError, error }
}

export default useFetchIrsa
