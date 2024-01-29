import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllCotisations } from 'src/redux/cotisations/cotisationsActions'

const useFetchCotisations = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let mount = true

    if (mount && dispatch) {
      // dispatch(fetchAllCotisations())
    }

    return () => {
      mount = false
    }
  }, [dispatch])
}

export default useFetchCotisations
