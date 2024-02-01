import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const useFetchSalarie = (id?: string | number) => {
  const [salarie, setSalarie] = useState(null)
  const [errors, setErrors] = useState(null)

  //   const { data } = useQuery({queryKey:['salarie', id], queryFn: async () => {})
}

export default useFetchSalarie
