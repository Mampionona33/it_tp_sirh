import React, { useCallback } from 'react'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import { useDispatch, useSelector } from 'react-redux'

const useDispatchBulletinDePaie = (modification) => {
  const dispatch = useDispatch()
  const currentState = useSelector((state) => state.bulletinDePaie)
  const newState = { ...currentState, ...modification }
  return useCallback(() => dispatch(setBulletinDePaie(newState)))
}

export default useDispatchBulletinDePaie
