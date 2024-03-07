import { IPageIrsaProps, IPageIrsaState } from '@src/interfaces/intefacePageIrsa'
import irsaService from '@src/services/IrsaService'
import { useQuery } from '@tanstack/react-query'

const useFetchIrsa = (formIrsaProps: IPageIrsaProps) => {
  const {
    data: irsaData,
    isLoading,
    refetch,
    isError,
    error,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ['irsa', formIrsaProps.data?.mois?.value, formIrsaProps.data?.annee?.value],
    queryFn: async () => {
      if (
        formIrsaProps.data?.mois?.value === undefined ||
        formIrsaProps.data?.annee?.value === undefined
      ) {
        return
      }
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
      !!formIrsaProps.data?.annee?.value &&
      !!formIrsaProps.data?.mois?.value &&
      formIrsaProps.fetchData,
  })

  return { irsaData, isLoading, refetch, isError, error, isSuccess, isFetching }
}

export default useFetchIrsa
