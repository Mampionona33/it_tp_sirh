import { useEffect, useState } from 'react'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import calculPaie from '@src/utils/CalculPaie'

interface UseSalaireNetAPayerUpdateParams {
  calculPaieSetters: (() => void)[]
}

const useSalaireNetAPayerUpdate = ({ calculPaieSetters }: UseSalaireNetAPayerUpdateParams) => {
  const { salaireNet } = useAppSelector((store) => store.bulletinDePaie)

  const [updatedSalaireNetAPayer, setUpdatedSalaireNetAPayer] = useState<number | null>(0)

  useEffect(() => {
    const updateSalaireNetAPayer = () => {
      if (salaireNet) {
        // calculPaie.setSalaireNet(salaireNet)

        // Execute all provided setter functions
        if (calculPaieSetters) {
          calculPaieSetters.forEach((setter) => setter())

          // Check if the value needs an update before setting the state
          // // const updatedValue = calculPaie.getSalaireNetAPayer()
          // if (updatedValue !== updatedSalaireNetAPayer) {
          //   setUpdatedSalaireNetAPayer(updatedValue)
          // }
        }
      }
    }

    updateSalaireNetAPayer()
  }, [salaireNet, calculPaieSetters, updatedSalaireNetAPayer])

  return { salaireNetAPayer: updatedSalaireNetAPayer }
}

export default useSalaireNetAPayerUpdate
