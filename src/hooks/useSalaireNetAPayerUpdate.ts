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
        calculPaie.setSalaireNet(salaireNet)

        // Execute all provided setter functions
        calculPaieSetters.forEach((setter) => setter())

        const updatedSalaireNetAPayer = calculPaie.getSalaireNetAPayer()
        setUpdatedSalaireNetAPayer(updatedSalaireNetAPayer)
      }
    }

    updateSalaireNetAPayer()
  }, [salaireNet, calculPaieSetters])

  return { salaireNetAPayer: updatedSalaireNetAPayer }
}

export default useSalaireNetAPayerUpdate
