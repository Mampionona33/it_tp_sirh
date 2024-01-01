import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import calculPaie from '@src/utils/CalculPaie'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'

interface UseSalaireNetAPayerUpdateParams {
  value: number
  calculPaieSetter: (value: number | string) => void
}

const useSalaireNetAPayerUpdate = ({
  value,
  calculPaieSetter,
}: UseSalaireNetAPayerUpdateParams) => {
  const { salaireNet, salaireNetAPayer } = useAppSelector((store) => store.bulletinDePaie)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const updateSalaireNetAPayer = () => {
      if (salaireNet) {
        calculPaie.setSalaireNet(salaireNet)
        calculPaieSetter(value)
        const updatedSalaireNetAPayer = calculPaie.getSalaireNetAPayer()

        if (salaireNetAPayer !== updatedSalaireNetAPayer) {
          dispatch(setBulletinDePaie({ salaireNetAPayer: updatedSalaireNetAPayer }))
        }
      }
    }

    updateSalaireNetAPayer()
  }, [dispatch, salaireNet, salaireNetAPayer, calculPaieSetter, value])

  return { salaireNetAPayer }
}

export default useSalaireNetAPayerUpdate
