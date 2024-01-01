import CustomSection from '@src/components/CustomSection'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import formatAriaryMga from '@src/utils/formatAriaryMga'
import React from 'react'
import CardRow from './CardRow'

const CardSalaireBrut = () => {
  const bulletinDePaie = useAppSelector((store) => store.bulletinDePaie)
  const formatCell2 = (value: number) => {
    return value.toFixed(2).toString().padStart(2, '0') + ' H'
  }

  const Body = () => {
    return (
      <div className="w-full text-sm">
        <div className="flex justify-between px-4 py-2 border-b border-b-customBlue-100">
          <div>Salaire de base</div>
          <div>{formatAriaryMga(bulletinDePaie.salaireDeBase)}</div>
        </div>
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="HSNI 130%"
          cell2={formatCell2(bulletinDePaie.hsni130)}
          cell3={bulletinDePaie.valHsni130}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="HSNI 150%"
          cell2={formatCell2(bulletinDePaie.hsni150)}
          cell3={bulletinDePaie.valHsni150}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="HSI 130%"
          cell2={formatCell2(bulletinDePaie.hsi130)}
          cell3={bulletinDePaie.valHsi130}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="HSI 150%"
          cell2={formatCell2(bulletinDePaie.hsi150)}
          cell3={bulletinDePaie.valHsi150}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="HS 30%"
          cell2={formatCell2(bulletinDePaie.totalHs30)}
          cell3={bulletinDePaie.valHs30}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="HS 50%"
          cell2={formatCell2(bulletinDePaie.totalHs50)}
          cell3={bulletinDePaie.valHs50}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="HFérié"
          cell2={formatCell2(bulletinDePaie.totalHFerie)}
          cell3={bulletinDePaie.valHFerie}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="HDimanche"
          cell2={formatCell2(bulletinDePaie.totalHDim)}
          cell3={bulletinDePaie.valHdim}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="Rappel"
          cell3={bulletinDePaie.valHdim}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="Primes Et Gratification"
          cell3={bulletinDePaie.valHdim}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="Absence/Retard à Déduire"
          cell3={bulletinDePaie.valHdim}
        />
        <div className="flex justify-between px-4 py-2 ">
          <div>Salaire brut</div>
          <div className="text-customRed-900">{formatAriaryMga(bulletinDePaie.salaireBrut)}</div>
        </div>
      </div>
    )
  }

  return <CustomSection title="Salaire Brut" body={<Body />} />
}

export default CardSalaireBrut
