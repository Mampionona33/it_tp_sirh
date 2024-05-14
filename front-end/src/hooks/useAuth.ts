import { ILoginProps } from '@src/redux/user/logginInterface'
import AuthService from '@src/services/AuthService'
import { useQuery } from '@tanstack/react-query'

export interface IuseAuthProps extends ILoginProps {
  fetchData: boolean
}

const useAuth = ({ email, password, fetchData }: IuseAuthProps) => {
  const { data, isLoading, refetch, isError, error, isSuccess, isFetching } = useQuery({
    queryKey: ['login', email, password],
    queryFn: async () => {
      if (!email || !password) {
        return
      }
      try {
        const authService = new AuthService()
        const response = await authService.login({ email, password })
        return response.data
      } catch (error) {
        throw error
      }
    },
    enabled: !!email && !!password && fetchData,
    refetchOnMount: false, // Désactivez le rechargement automatique lors du montage initial
    refetchOnReconnect: false, // Désactivez le rechargement automatique en cas de reconnexion
    refetchOnWindowFocus: false,
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

export default useAuth
