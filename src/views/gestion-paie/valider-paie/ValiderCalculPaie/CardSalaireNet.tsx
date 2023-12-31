import CustomSection from '@src/components/CustomSection'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import formatAriaryMga from '@src/utils/formatAriaryMga'
import React from 'react'
import CardRow from './CardRow'

const CardSalaireNet = () => {
  const bulletinDePaie = useAppSelector((store) => store.bulletinDePaie)
  const Body = () => {
    return (
      <>
        <div className="w-full text-sm">
          <div className="flex justify-between p-2 border-b border-b-customBlue-930">
            <div>Salaire brut</div>
            <div>{formatAriaryMga(bulletinDePaie.salaireBrut)}</div>
          </div>
          <CardRow cell1="cnaps" cell3={bulletinDePaie.cnaps} />
        </div>
      </>
    )
  }

  return <CustomSection title="Salaire Net" body={<Body />} />
}

export default CardSalaireNet
