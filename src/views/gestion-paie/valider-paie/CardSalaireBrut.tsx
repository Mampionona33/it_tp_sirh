import CustomSection from '@src/components/CustomSection'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import formatAriaryMga from '@src/utils/formatAriaryMga'
import React from 'react'
interface IRowProps {
  cell1: string
  cell2: string | number
  cell3: string | number
  className?: string
}
const CardSalaireBrut = () => {
  const bulletinDePaie = useAppSelector((store) => store.bulletinDePaie)

  const Row = ({ cell1, cell2, cell3, className }: IRowProps) => {
    const rowClasses = `grid grid-cols-3 p-2 ${className || ''}`

    return (
      <div className={rowClasses}>
        <div className="flex">{cell1}</div>
        <div className="flex justify-center">{cell2.toString().padStart(2, '0')} H</div>
        <div className="flex justify-end">{formatAriaryMga(cell3)}</div>
      </div>
    )
  }

  const Body = () => {
    return (
      <div className="w-full text-sm">
        <div className="flex justify-between p-2 border-b border-b-customBlue-930">
          <div>Salaire de base</div>
          <div>{formatAriaryMga(bulletinDePaie.salaireDeBase)}</div>
        </div>
        <Row
          className="border-b border-b-customBlue-930"
          cell1="HSNI 130%"
          cell2={bulletinDePaie.hsni130}
          cell3={bulletinDePaie.valHsni130}
        />
        <Row
          className="border-b border-b-customBlue-930"
          cell1="HSNI 150%"
          cell2={bulletinDePaie.hsni150}
          cell3={bulletinDePaie.valHsni150}
        />{' '}
        <Row
          className="border-b border-b-customBlue-930"
          cell1="HSI 130%"
          cell2={bulletinDePaie.hsi130}
          cell3={bulletinDePaie.valHsi130}
        />{' '}
        <Row
          className="border-b border-b-customBlue-930"
          cell1="HSI 150%"
          cell2={bulletinDePaie.hsi150}
          cell3={bulletinDePaie.valHsi150}
        />{' '}
        <Row
          className="border-b border-b-customBlue-930"
          cell1="HS 30%"
          cell2={bulletinDePaie.totalHs30}
          cell3={bulletinDePaie.valHs30}
        />
        <Row
          className="border-b border-b-customBlue-930"
          cell1="HS 50%"
          cell2={bulletinDePaie.totalHs50}
          cell3={bulletinDePaie.valHs50}
        />{' '}
        <Row
          className="border-b border-b-customBlue-930"
          cell1="HFérié"
          cell2={bulletinDePaie.totalHFerie}
          cell3={bulletinDePaie.valHFerie}
        />
        <Row
          className="border-b border-b-customBlue-930"
          cell1="HDimanche"
          cell2={bulletinDePaie.totalHDim}
          cell3={bulletinDePaie.valHdim}
        />
        <div className="flex justify-between p-2 ">
          <div>Salaire de brut</div>
          <div className="text-customRed-900">{formatAriaryMga(bulletinDePaie.salaireBrut)}</div>
        </div>
      </div>
    )
  }

  return <CustomSection title="Salaire Brut" body={<Body />} />
}

export default CardSalaireBrut
