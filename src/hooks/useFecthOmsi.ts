import { IFormPageOmsi } from '@src/interfaces/interfaceFormPageOmsi'
import omsiService from '@src/services/omsiService'
import { useQuery } from '@tanstack/react-query'

const useFetchOmsi = ({ annee, periode }: IFormPageOmsi) => {
  const {
    data: omsiData,
    isLoading,
    refetch,
    isError,
    error,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ['omsi', annee, periode],
    queryFn: async () => {
      if (!annee || !periode) {
        return
      }
      try {
        const response = await omsiService.getOmsiByPeriodeYear(periode.value, annee.value)
        return response
      } catch (error) {
        throw error
      }
    },
    enabled: !!annee && !!periode,
  })
  return {
    omsiData,
    isLoading,
    refetch,
    isError,
    error,
    isSuccess,
    isFetching,
  }
}

export default useFetchOmsi
