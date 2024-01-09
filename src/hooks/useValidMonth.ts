import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'

const useValidMonthFrMMMM = (month: string): boolean => {
  let monthIsValid = false
  const tempDate = new Date()

  for (let i = 0; i < 12; i++) {
    tempDate.setMonth(i)
    const tempDateMonthFr = format(tempDate, 'MMMM', { locale: fr })

    if (tempDateMonthFr === month) {
      monthIsValid = true
    }
  }
  return monthIsValid
}

export default useValidMonthFrMMMM
