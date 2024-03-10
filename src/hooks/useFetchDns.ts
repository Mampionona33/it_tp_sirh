import { IPageDnsProps } from '@src/interfaces/interfacePageCnaps'
import dnsService from '@src/services/DnsService'
import { useQuery } from '@tanstack/react-query'

const useFetchDns = ({ annee, periode, fetchData }: IPageDnsProps) => {
  const { data, isLoading, refetch, isError, error, isSuccess, isFetching } = useQuery({
    queryKey: ['dns', annee, periode],
    queryFn: async () => {
      if (!annee || !periode) {
        return
      }
      try {
        const response = await dnsService.fetch({ annee: annee, periode: periode })
        return response?.data
      } catch (error) {
        throw error
      }
    },
    enabled: !!annee && !!periode && fetchData,
  })
  return {
    data,
    isLoading,
    refetch,
    isError,
    error,
    isSuccess,
    isFetching,
  }
}

export default useFetchDns
