import { parseISO, isValid } from 'date-fns'
import { useParams } from 'react-router-dom'

const useDateValidationExist = (): boolean => {
  const { dateValidation } = useParams()
  return !dateValidation ? false : isValid(parseISO(dateValidation))
}

export default useDateValidationExist
