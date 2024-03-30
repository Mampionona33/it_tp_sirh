import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'

const useValidMonthFrMMMM = (month: string): boolean => {
  let monthIsValid = false
  const tempDate = new Date()

  for (let i = 0; i < 12; i++) {
    tempDate.setMonth(i)
    tempDate.setDate(1) // Réinitialisez le jour à 1
    // console.log('i', i, ' tempDate.getMonth()', tempDate.getMonth(), tempDate)

    const tempDateMonthFr = format(tempDate, 'MMMM', { locale: fr })

    // console.log('month', month, ' tempDateMonthFr ', tempDateMonthFr)

    if (tempDateMonthFr === month) {
      monthIsValid = true
    }
  }
  return monthIsValid
}

export default useValidMonthFrMMMM
