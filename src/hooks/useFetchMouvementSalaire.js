import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllMouvementSalaire } from 'src/redux/mouvementSalaire/mouvementSalaireAction'

const useFetchMouvementSalaire = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let mount = true
    if (mount && dispatch) {
      dispatch(fetchAllMouvementSalaire())
    }
    return () => {
      mount = false
    }
  }, [dispatch])
}

export default useFetchMouvementSalaire
