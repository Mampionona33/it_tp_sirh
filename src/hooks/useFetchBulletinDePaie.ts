import historiquePaieService from '@src/services/HistoriquePaieSerivce'
import { useQuery } from '@tanstack/react-query'

export interface useFetchBulletinDePaieProps {
  id: string
  annee: number
  mois:
    | 'janvier'
    | 'février'
    | 'mars'
    | 'avril'
    | 'mai'
    | 'juin'
    | 'juillet'
    | 'aôut'
    | 'septembre'
    | 'octobre'
    | 'novembre'
    | 'décembre'
}

const useFetchBulletinDePaie = (params: useFetchBulletinDePaieProps) => {
  const { id, annee, mois } = params

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ['bulletinDePaie', id, annee, mois],
    queryFn: async () => {
      try {
        const response = await historiquePaieService.getOnByUserIdAndBltinPaieId({
          id,
          annee,
          mois,
        })
        // setBulletinDePaie(response.data)
        return response.data
      } catch (error) {
        throw error
      }
    },
  })

  return {
    data,
    isLoading,
    refetch,
    isError,
    error,
  }
}

export default useFetchBulletinDePaie
