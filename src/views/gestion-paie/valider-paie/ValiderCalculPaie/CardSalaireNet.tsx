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
          <div className="flex justify-between px-4 py-2 border-b border-b-customBlue-100">
            <div>Salaire brut</div>
            <div>{formatAriaryMga(bulletinDePaie.salaireBrut)}</div>
          </div>
          <CardRow
            className="border-b border-b-customBlue-100"
            cell1="cnaps"
            cell3={bulletinDePaie.cnaps}
          />
          <CardRow
            className="border-b border-b-customBlue-100"
            cell1="osie"
            cell3={bulletinDePaie.osie}
          />
          <CardRow
            className="border-b border-b-customBlue-100"
            cell3={bulletinDePaie.salaireBrut + bulletinDePaie.cnaps + bulletinDePaie.osie}
          />
          <CardRow
            className="border-b border-b-customBlue-100"
            cell1="HSNI 130"
            cell3={bulletinDePaie.valHsni130}
          />
          <CardRow
            className="border-b border-b-customBlue-100"
            cell1="HSNI 150"
            cell3={bulletinDePaie.valHsni150}
          />
          <CardRow
            className="border-b border-b-customBlue-100"
            cell1="Base Irsa"
            cell3={bulletinDePaie.baseIrsa}
          />
          <CardRow
            className="border-b border-b-customBlue-100"
            cell1="Base Irsa arrondi"
            cell3={bulletinDePaie.baseIrsaArrondi}
          />
          <CardRow
            className="border-b border-b-customBlue-100"
            cell1="IRSA  - PAR TRANCHE"
            cell3={bulletinDePaie.irsaAPayer}
          />
          <CardRow
            cell1="Salaire net"
            cell3={bulletinDePaie.salaireNet}
            cell3ClassName="text-customRed-900 "
            className="border-b border-b-customBlue-100"
          />
        </div>
      </>
    )
  }

  return <CustomSection title="Salaire Net" body={<Body />} />
}

export default CardSalaireNet
